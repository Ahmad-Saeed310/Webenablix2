import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight, Search, Loader2, CheckCircle, XCircle, AlertTriangle,
  Smartphone, Shield, Zap, Globe, Eye, ChevronDown, ChevronUp, Sparkles,
  MonitorCheck, Filter, RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

// ── Projected-score simulation ─────────────────────────────────────────────
const buildProjectedResult = (result) => {
  const acc  = Math.min(100, Math.round(result.accessibility_score + (100 - result.accessibility_score) * 0.88));
  const seo  = Math.min(100, Math.round(result.seo_score           + (100 - result.seo_score)           * 0.82));
  const perf = Math.min(100, Math.round(result.performance_score   + (100 - result.performance_score)   * 0.75));
  const mob  = Math.min(100, Math.round(result.mobile_score        + (100 - result.mobile_score)        * 0.90));
  const sec  = Math.min(100, Math.round(result.security_score      + (100 - result.security_score)      * 1.00));
  const overall = Math.round(acc * 0.30 + seo * 0.25 + perf * 0.20 + mob * 0.15 + sec * 0.10);
  return {
    ...result,
    accessibility_score: acc,
    seo_score:           seo,
    performance_score:   perf,
    mobile_score:        mob,
    security_score:      sec,
    overall_score:       overall,
    critical_issues:     0,
    warnings:            0,
    total_issues:        0,
    accessibility_issues: [],
    seo_issues:           [],
    lawsuit_risk:        'low',
    wcag_level:          acc >= 95 ? 'AAA' : 'AA',
    top_recommendations: [
      'All critical accessibility issues fixed (images, form labels, ARIA)',
      'Meta descriptions and title tags optimised for every page',
      'Structured data (Schema.org) added for rich search snippets',
      'Core Web Vitals (LCP, CLS) brought within Google "Good" thresholds',
      'HTTPS, HSTS, and Content Security Policy fully configured',
    ],
    mobile_friendliness: {
      ...result.mobile_friendliness,
      is_mobile_friendly:      true,
      viewport_configured:     true,
      text_readable:           true,
      tap_targets_sized:       true,
      content_wider_than_screen: false,
    },
    security: {
      has_https:      true,
      has_hsts:       true,
      has_csp:        true,
      mixed_content:  false,
      security_score: sec,
    },
  };
};

// Delta badge shown in Webenablix view
const DeltaBadge = ({ current, projected }) => {
  const delta = projected - current;
  if (delta <= 0) return null;
  return (
    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 rounded-full px-1.5 py-0.5 leading-none">
      +{delta}
    </span>
  );
};

// Score Badge Component
const ScoreBadge = ({ score, label, delta }) => {
  let colorClasses = 'bg-red-100 text-red-600 ring-red-500';
  if (score >= 80) colorClasses = 'bg-emerald-100 text-emerald-600 ring-emerald-500';
  else if (score >= 60) colorClasses = 'bg-yellow-100 text-yellow-600 ring-yellow-500';

  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ring-4 ${colorClasses}`}>
        <span className="font-bold text-xl">{score}</span>
      </div>
      <span className="text-xs text-gray-500 mt-2 text-center">{label}</span>
      {delta != null && delta > 0 && (
        <DeltaBadge current={score - delta} projected={score} />
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  let classes = 'bg-red-100 text-red-700';
  let label = status;
  
  if (status === 'good' || status === 'low') {
    classes = 'bg-emerald-100 text-emerald-700';
    label = status === 'low' ? 'Low Risk' : 'Good';
  } else if (status === 'needs-improvement' || status === 'medium') {
    classes = 'bg-yellow-100 text-yellow-700';
    label = status === 'medium' ? 'Medium Risk' : 'Needs Work';
  } else if (status === 'high') {
    label = 'High Risk';
  } else if (status === 'poor') {
    label = 'Poor';
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
};

// Core Web Vitals Display
const CoreWebVitalsSection = ({ vitals }) => (
  <div className="grid md:grid-cols-3 gap-4">
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">LCP (Largest Contentful Paint)</span>
        <StatusBadge status={vitals.lcp_status} />
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {vitals.lcp}<span className="text-sm font-normal text-gray-500">s</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">Target: &lt; 2.5s</p>
    </div>
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">FID (First Input Delay)</span>
        <StatusBadge status={vitals.fid_status} />
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {vitals.fid}<span className="text-sm font-normal text-gray-500">ms</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">Target: &lt; 100ms</p>
    </div>
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">CLS (Cumulative Layout Shift)</span>
        <StatusBadge status={vitals.cls_status} />
      </div>
      <div className="text-2xl font-bold text-gray-800">{vitals.cls}</div>
      <p className="text-xs text-gray-500 mt-1">Target: &lt; 0.1</p>
    </div>
  </div>
);

// Mobile Friendliness Section
const MobileSection = ({ mobile }) => {
  const CheckItem = ({ passed, label }) => (
    <div className="flex items-center gap-2">
      {passed ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
      <span className={passed ? 'text-gray-700' : 'text-red-700'}>{label}</span>
    </div>
  );
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${mobile.is_mobile_friendly ? 'bg-emerald-100' : 'bg-red-100'}`}>
          <Smartphone className={`w-6 h-6 ${mobile.is_mobile_friendly ? 'text-emerald-600' : 'text-red-600'}`} />
        </div>
        <div>
          <p className={`font-semibold ${mobile.is_mobile_friendly ? 'text-emerald-700' : 'text-red-700'}`}>
            {mobile.is_mobile_friendly ? 'Mobile Friendly' : 'Not Mobile Friendly'}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <CheckItem passed={mobile.viewport_configured} label="Viewport meta tag configured" />
        <CheckItem passed={mobile.text_readable} label="Text readable without zooming" />
        <CheckItem passed={mobile.tap_targets_sized} label="Tap targets properly sized" />
        <CheckItem passed={!mobile.content_wider_than_screen} label="Content fits viewport width" />
      </div>
    </div>
  );
};

// Security Section
const SecuritySection = ({ security }) => {
  const CheckItem = ({ passed, label, desc }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      {passed ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
      <div>
        <p className={`font-medium ${passed ? 'text-gray-700' : 'text-red-700'}`}>{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-3">
      <CheckItem passed={security.has_https} label="HTTPS Enabled" desc="Secure connection with SSL/TLS" />
      <CheckItem passed={security.has_hsts} label="HSTS Header" desc="HTTP Strict Transport Security" />
      <CheckItem passed={security.has_csp} label="Content Security Policy" desc="CSP headers configured" />
      <CheckItem passed={!security.mixed_content} label="No Mixed Content" desc="All resources over HTTPS" />
    </div>
  );
};

// Structured Data Section  
const StructuredDataSection = ({ data }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${data.has_schema ? 'bg-emerald-100' : 'bg-yellow-100'}`}>
        <Globe className={`w-6 h-6 ${data.has_schema ? 'text-emerald-600' : 'text-yellow-600'}`} />
      </div>
      <div>
        <p className={`font-semibold ${data.has_schema ? 'text-emerald-700' : 'text-yellow-700'}`}>
          {data.has_schema ? 'Schema.org Markup Found' : 'No Structured Data'}
        </p>
      </div>
    </div>
    {data.has_schema && data.schema_types && (
      <div className="flex flex-wrap gap-2">
        {data.schema_types.slice(0, 5).map((type, i) => (
          <span key={`schema-type-${i}-${type}`} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{type}</span>
        ))}
      </div>
    )}
  </div>
);

// Issue Display Component
const IssueDisplay = ({ issue, idx }) => {
  let bgClass = 'bg-blue-50 border-blue-200';
  let Icon = Eye;
  let iconColor = 'text-blue-500';
  
  if (issue.type === 'error') {
    bgClass = 'bg-red-50 border-red-200';
    Icon = XCircle;
    iconColor = 'text-red-500';
  } else if (issue.type === 'warning') {
    bgClass = 'bg-yellow-50 border-yellow-200';
    Icon = AlertTriangle;
    iconColor = 'text-yellow-500';
  }
  
  let impactClass = 'bg-gray-200 text-gray-700';
  if (issue.impact === 'critical') impactClass = 'bg-red-200 text-red-700';
  else if (issue.impact === 'serious') impactClass = 'bg-orange-200 text-orange-700';
  else if (issue.impact === 'moderate') impactClass = 'bg-yellow-200 text-yellow-700';
  
  return (
    <div className={`p-3 rounded-lg border ${bgClass} text-left`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-4 h-4 ${iconColor} mt-0.5`} />
        <div className="flex-1">
          <p className="font-medium text-gray-800 text-sm">{issue.message}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">Code: {issue.code}</span>
            {issue.count !== undefined && (
              <span className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">Count: {issue.count}</span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded ${impactClass}`}>{issue.impact}</span>
          </div>
          {issue.recommendation && (
            <p className="text-xs text-gray-600 mt-2 italic">💡 {issue.recommendation}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Collapsible Section
const Section = ({ title, icon: Icon, children, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen || false);
  
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#2563EB]" />
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

// Full Audit Results
const FullAuditResults = ({ result, originalResult, view, onToggle }) => {
  const accIssues = result.accessibility_issues || [];
  const seoIssues = result.seo_issues || [];
  const recs = result.top_recommendations || [];
  const isWebenablix = view === 'webenablix';

  const overallDelta  = isWebenablix ? result.overall_score       - originalResult.overall_score       : 0;
  const accDelta      = isWebenablix ? result.accessibility_score  - originalResult.accessibility_score  : 0;
  const seoDelta      = isWebenablix ? result.seo_score            - originalResult.seo_score            : 0;
  const perfDelta     = isWebenablix ? result.performance_score    - originalResult.performance_score    : 0;
  const mobDelta      = isWebenablix ? result.mobile_score         - originalResult.mobile_score         : 0;
  const secDelta      = isWebenablix ? result.security_score       - originalResult.security_score       : 0;

  return (
    <div className="mt-12 max-w-5xl mx-auto">

      {/* ── View Toggle ──────────────────────────────────────── */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-1 gap-1">
          <button
            onClick={() => onToggle('current')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              !isWebenablix
                ? 'bg-white text-[#2563EB] shadow'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Current State
          </button>
          <button
            onClick={() => onToggle('webenablix')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              isWebenablix
                ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/40'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            With Webenablix
          </button>
        </div>
      </div>

      {/* Webenablix info bar */}
      {isWebenablix && (
        <div className="flex items-center gap-2 justify-center mb-4 text-emerald-300 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Projected scores after Webenablix remediates all detected issues</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className={`p-6 text-white ${isWebenablix ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6]'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm opacity-80">{isWebenablix ? 'Projected Report — With Webenablix' : 'Comprehensive Audit Report'}</p>
              <p className="text-lg font-semibold truncate max-w-md">{result.url}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold">{result.overall_score}</p>
                {overallDelta > 0 && (
                  <p className="text-xs font-bold bg-white/20 rounded-full px-2 py-0.5 mt-1">
                    +{overallDelta} pts vs current
                  </p>
                )}
                <p className="text-xs opacity-80">Overall Score</p>
              </div>
              <div className="h-12 w-px bg-white/30" />
              <div>
                <StatusBadge status={result.lawsuit_risk} />
                <p className="text-xs opacity-80 mt-1">WCAG {result.wcag_level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Score Cards */}
        <div className="p-6 border-b">
          <div className="flex flex-wrap justify-center gap-6">
            <ScoreBadge score={result.accessibility_score} label="Accessibility" delta={accDelta} />
            <ScoreBadge score={result.seo_score}           label="SEO"           delta={seoDelta} />
            <ScoreBadge score={result.performance_score}   label="Performance"   delta={perfDelta} />
            <ScoreBadge score={result.mobile_score}        label="Mobile"        delta={mobDelta} />
            <ScoreBadge score={result.security_score}      label="Security"      delta={secDelta} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 border-b">
          <div className="p-4 text-center border-r">
            {isWebenablix ? (
              <>
                <p className="text-3xl font-bold text-emerald-500 flex items-center justify-center gap-1">
                  0 <CheckCircle className="w-6 h-6" />
                </p>
                <p className="text-xs text-gray-400 line-through">{originalResult.critical_issues} critical</p>
              </>
            ) : (
              <p className="text-3xl font-bold text-red-500">{result.critical_issues}</p>
            )}
            <p className="text-sm text-gray-500">Critical Issues</p>
          </div>
          <div className="p-4 text-center border-r">
            {isWebenablix ? (
              <>
                <p className="text-3xl font-bold text-emerald-500 flex items-center justify-center gap-1">
                  0 <CheckCircle className="w-6 h-6" />
                </p>
                <p className="text-xs text-gray-400 line-through">{originalResult.warnings} warnings</p>
              </>
            ) : (
              <p className="text-3xl font-bold text-yellow-500">{result.warnings}</p>
            )}
            <p className="text-sm text-gray-500">Warnings</p>
          </div>
          <div className="p-4 text-center">
            {isWebenablix ? (
              <>
                <p className="text-3xl font-bold text-emerald-500 flex items-center justify-center gap-1">
                  0 <CheckCircle className="w-6 h-6" />
                </p>
                <p className="text-xs text-gray-400 line-through">{originalResult.total_issues} total</p>
              </>
            ) : (
              <p className="text-3xl font-bold text-gray-700">{result.total_issues}</p>
            )}
            <p className="text-sm text-gray-500">Total Issues</p>
          </div>
        </div>

        {/* Recommendations */}
        {recs.length > 0 && (
          <div className={`p-6 border-b ${isWebenablix ? 'bg-emerald-50' : 'bg-blue-50'}`}>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              {isWebenablix ? <Sparkles className="w-5 h-5 text-emerald-600" /> : <Zap className="w-5 h-5 text-[#2563EB]" />}
              {isWebenablix ? 'What Webenablix Fixes For You' : 'Top Recommendations'}
            </h3>
            <div className="space-y-2">
              {recs.slice(0, 5).map((rec, i) => (
                <div key={`rec-${i}`} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 text-white ${isWebenablix ? 'bg-emerald-500' : 'bg-[#2563EB]'}`}>
                    {isWebenablix ? '✓' : i + 1}
                  </span>
                  {rec}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Sections */}
        <div className="p-6 space-y-4">
          <Section title="Core Web Vitals (Google)" icon={Zap} defaultOpen={true}>
            <CoreWebVitalsSection vitals={result.core_web_vitals} />
          </Section>

          <Section title={`Accessibility Issues (${accIssues.length})`} icon={Eye}>
            <div className="space-y-3">
              {accIssues.length === 0 && (
                <p className="text-emerald-600 text-center py-4 font-medium">
                  {isWebenablix ? '✓ All accessibility issues resolved by Webenablix' : 'No accessibility issues found!'}
                </p>
              )}
              {accIssues.slice(0, 8).map((issue, i) => (
                <IssueDisplay key={`acc-${i}`} issue={issue} idx={i} />
              ))}
              {accIssues.length > 8 && <p className="text-sm text-gray-500 text-center">+ {accIssues.length - 8} more issues</p>}
            </div>
          </Section>

          <Section title={`SEO Issues (${seoIssues.length})`} icon={Globe}>
            <div className="space-y-3">
              {seoIssues.length === 0 && (
                <p className="text-emerald-600 text-center py-4 font-medium">
                  {isWebenablix ? '✓ All SEO issues resolved by Webenablix' : 'No SEO issues found!'}
                </p>
              )}
              {seoIssues.slice(0, 6).map((issue, i) => (
                <IssueDisplay key={`seo-${i}`} issue={issue} idx={i} />
              ))}
              {seoIssues.length > 6 && <p className="text-sm text-gray-500 text-center">+ {seoIssues.length - 6} more issues</p>}
            </div>
          </Section>

          <Section title="Mobile Friendliness" icon={Smartphone}>
            <MobileSection mobile={result.mobile_friendliness} />
          </Section>

          <Section title="Structured Data (Schema.org)" icon={Globe}>
            <StructuredDataSection data={result.structured_data} />
          </Section>

          <Section title="Security Analysis" icon={Shield}>
            <SecuritySection security={result.security} />
          </Section>
        </div>
      </div>

      {/* DOM deep-dive — only shown in current state view (real scan data) */}
      {!isWebenablix && originalResult.dom_analysis && (
        <PageDOMAnalysis
          domAnalysis={originalResult.dom_analysis}
          security={originalResult.security}
        />
      )}

      {/* Live page inspector — annotated real page view */}
      {!isWebenablix && (
        <LivePageInspector url={originalResult.url} />
      )}
    </div>
  );
};

// ── Page DOM Analysis Section ──────────────────────────────────────────────

const StatusIcon = ({ ok, warn }) => {
  if (ok)   return <CheckCircle  className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
  if (warn) return <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />;
  return <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />;
};

const TagChip = ({ tag, status, children }) => {
  const colors = {
    good:    'bg-emerald-50 border-emerald-300 text-emerald-800',
    warn:    'bg-yellow-50 border-yellow-300 text-yellow-800',
    error:   'bg-red-50 border-red-300 text-red-800',
    neutral: 'bg-gray-50 border-gray-300 text-gray-700',
  };
  const dotColors = { good: 'bg-emerald-500', warn: 'bg-yellow-500', error: 'bg-red-500', neutral: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono font-semibold ${colors[status] || colors.neutral}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[status] || dotColors.neutral}`} />
      &lt;{tag}&gt;
      {children && <span className="font-sans font-normal ml-1 truncate max-w-[160px]">{children}</span>}
    </span>
  );
};

const DetailRow = ({ icon, label, status, detail, sub }) => {
  const borderColor = status === 'good' ? 'border-emerald-200' : status === 'warn' ? 'border-yellow-200' : status === 'error' ? 'border-red-200' : 'border-gray-200';
  const bg = status === 'good' ? 'bg-emerald-50/40' : status === 'warn' ? 'bg-yellow-50/40' : status === 'error' ? 'bg-red-50/30' : 'bg-gray-50/60';
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${borderColor} ${bg}`}>
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gray-800">{label}</span>
          {detail && <span className="text-xs text-gray-500 flex-shrink-0">{detail}</span>}
        </div>
        {sub && <p className="text-xs text-gray-600 mt-0.5 break-words">{sub}</p>}
      </div>
    </div>
  );
};

const HeadingGroup = ({ tag, data }) => {
  const isH1 = tag === 'h1';
  const ideal = isH1 ? data.count === 1 : true;
  const status = isH1 ? (data.count === 0 ? 'error' : data.count === 1 ? 'good' : 'warn') : (data.count > 0 ? 'good' : 'neutral');
  return (
    <div>
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg border-l-4 ${
        status === 'good' ? 'border-emerald-500 bg-emerald-50' :
        status === 'error' ? 'border-red-500 bg-red-50' :
        status === 'warn' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-gray-50'
      }`}>
        <StatusIcon ok={status === 'good'} warn={status === 'warn'} />
        <span className="text-xs font-bold font-mono text-gray-700 uppercase">&lt;{tag}&gt;</span>
        <span className="text-xs text-gray-500">{data.count} found{isH1 ? ' — ideal: exactly 1' : ''}</span>
      </div>
      {data.items.length > 0 && (
        <div className="border border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-100">
          {data.items.slice(0, 5).map((text, i) => (
            <div key={i} className="flex items-start gap-2 px-3 py-1.5">
              <span className="text-[10px] text-gray-400 mt-0.5 flex-shrink-0 font-mono">#{i + 1}</span>
              <span className="text-xs text-gray-700 break-words">{text || <em className="text-gray-400">empty</em>}</span>
            </div>
          ))}
          {data.items.length > 5 && (
            <div className="px-3 py-1.5 text-xs text-gray-400">+{data.items.length - 5} more…</div>
          )}
        </div>
      )}
    </div>
  );
};

const PageDOMAnalysis = ({ domAnalysis, security }) => {
  const d = domAnalysis;
  if (!d) return null;

  const titleOk  = !!(d.page_title && d.page_title_length >= 10 && d.page_title_length <= 70);
  const titleWarn = !!(d.page_title && (d.page_title_length < 10 || d.page_title_length > 70));
  const descOk   = !!(d.meta_description && d.meta_description_length >= 50 && d.meta_description_length <= 160);
  const descWarn = !!(d.meta_description && (d.meta_description_length < 50 || d.meta_description_length > 160));

  const imgTotal = d.images?.total || 0;
  const imgBad   = d.images?.items?.filter(i => !i.hasAlt).length || 0;
  const imgGood  = imgTotal - imgBad;

  const linkTotal = d.links?.total || 0;
  const linkBad   = d.links?.empty_count || 0;
  const linkGood  = linkTotal - linkBad;

  const btnTotal = d.buttons?.total || 0;
  const btnBad   = d.buttons?.empty_count || 0;
  const btnGood  = btnTotal - btnBad;

  const inpTotal = d.inputs?.total || 0;
  const inpBad   = d.inputs?.unlabeled_count || 0;
  const inpGood  = inpTotal - inpBad;

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-4 text-center justify-center">
        <div className="h-px flex-1 bg-white/20" />
        <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Page Element Deep Analysis</span>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-slate-900/60 rounded px-3 py-1 text-xs text-slate-300 font-mono truncate">
            {d.canonical || (security?.has_https ? 'https://' : 'http://') + '…'}
          </div>
          <div className="flex items-center gap-1.5">
            {security?.has_https
              ? <><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs text-emerald-400">Secure</span></>
              : <><XCircle className="w-3.5 h-3.5 text-red-400" /><span className="text-xs text-red-400">Not Secure</span></>}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

          {/* ── LEFT: Written Detail ── */}
          <div className="p-5 overflow-y-auto max-h-[900px] space-y-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Detailed Analysis</h3>

            {/* Page Title */}
            <DetailRow
              icon={<StatusIcon ok={titleOk} warn={titleWarn} />}
              label="Page Title"
              status={titleOk ? 'good' : titleWarn ? 'warn' : 'error'}
              detail={d.page_title ? `${d.page_title_length} chars` : 'Missing'}
              sub={d.page_title
                ? `"${d.page_title}" — ideal 50–60 chars for SEO`
                : 'A descriptive title is required (WCAG 2.4.2 + SEO critical)'}
            />

            {/* Meta Description */}
            <DetailRow
              icon={<StatusIcon ok={descOk} warn={descWarn} />}
              label="Meta Description"
              status={descOk ? 'good' : descWarn ? 'warn' : 'error'}
              detail={d.meta_description ? `${d.meta_description_length} chars` : 'Missing'}
              sub={d.meta_description
                ? `"${d.meta_description.substring(0, 120)}${d.meta_description_length > 120 ? '…' : ''}" — ideal 150–160 chars`
                : 'Missing meta description hurts click-through rate and SEO ranking'}
            />

            {/* HTML lang */}
            <DetailRow
              icon={<StatusIcon ok={!!d.html_lang} />}
              label="Language Attribute"
              status={d.html_lang ? 'good' : 'error'}
              detail={d.html_lang ? d.html_lang : 'Missing'}
              sub={d.html_lang
                ? `lang="${d.html_lang}" — screen readers use this to select the correct voice`
                : '<html lang="en"> is required by WCAG 3.1.1 for accessibility'}
            />

            {/* Viewport */}
            <DetailRow
              icon={<StatusIcon ok={!!d.viewport} />}
              label="Viewport Meta Tag"
              status={d.viewport ? 'good' : 'error'}
              detail={d.viewport ? '✓ Present' : 'Missing'}
              sub={d.viewport
                ? `content="${d.viewport}"`
                : 'Without viewport meta, the page will not render correctly on mobile devices'}
            />

            {/* Canonical */}
            <DetailRow
              icon={<StatusIcon ok={!!d.canonical} warn={false} />}
              label="Canonical Tag"
              status={d.canonical ? 'good' : 'warn'}
              detail={d.canonical ? '✓ Present' : 'Missing'}
              sub={d.canonical
                ? `href="${d.canonical.substring(0, 80)}"`
                : 'Canonical tag prevents duplicate-content penalties from search engines'}
            />

            {/* Favicon */}
            <DetailRow
              icon={<StatusIcon ok={!!d.favicon} warn={false} />}
              label="Favicon"
              status={d.favicon ? 'good' : 'warn'}
              detail={d.favicon ? '✓ Found' : 'Not found'}
              sub={d.favicon ? d.favicon.substring(0, 80) : 'Add a favicon for brand recognition in browser tabs and bookmarks'}
            />

            {/* Open Graph */}
            <DetailRow
              icon={<StatusIcon
                ok={!!(d.og_title && d.og_description && d.og_image)}
                warn={!!(d.og_title || d.og_description)}
              />}
              label="Open Graph Tags"
              status={d.og_title && d.og_description && d.og_image ? 'good' : d.og_title ? 'warn' : 'error'}
              detail={[d.og_title && 'og:title', d.og_description && 'og:desc', d.og_image && 'og:image'].filter(Boolean).join(', ') || 'None found'}
              sub={d.og_title
                ? `Partial — ${!d.og_image ? 'og:image missing (improves social share preview)' : 'All major OG tags present'}`
                : 'No Open Graph tags — social shares won\'t show rich previews on Facebook/LinkedIn/Twitter'}
            />

            {/* Twitter Card */}
            <DetailRow
              icon={<StatusIcon ok={!!d.twitter_card} warn={false} />}
              label="Twitter / X Card"
              status={d.twitter_card ? 'good' : 'warn'}
              detail={d.twitter_card || 'Missing'}
              sub={d.twitter_card ? `twitter:card="${d.twitter_card}"` : 'Add twitter:card meta tag for rich Twitter/X share cards'}
            />

            {/* Robots */}
            <DetailRow
              icon={<StatusIcon ok={true} warn={false} />}
              label="Robots Meta"
              status="neutral"
              detail={d.robots || 'Not set (default: index, follow)'}
              sub={d.robots ? `content="${d.robots}"` : 'No robots meta tag — search engines default to index and follow all links'}
            />

            {/* HTTPS */}
            <DetailRow
              icon={<StatusIcon ok={security?.has_https} />}
              label="HTTPS / SSL"
              status={security?.has_https ? 'good' : 'error'}
              detail={security?.has_https ? '✓ Enabled' : '✗ HTTP only'}
              sub={security?.has_https
                ? 'Secure connection active — browsers display padlock icon'
                : 'Site served over plain HTTP — data is unencrypted and browsers show "Not Secure" warning'}
            />

            {/* CSP */}
            <DetailRow
              icon={<StatusIcon ok={security?.has_csp} warn={false} />}
              label="Content Security Policy"
              status={security?.has_csp ? 'good' : 'warn'}
              detail={security?.has_csp ? '✓ Header present' : 'Header missing'}
              sub={security?.has_csp
                ? 'CSP header is configured — reduces XSS attack surface'
                : 'Missing CSP header makes the site more vulnerable to cross-site scripting (XSS) attacks'}
            />

            {/* HSTS */}
            <DetailRow
              icon={<StatusIcon ok={security?.has_hsts} warn={false} />}
              label="HSTS Header"
              status={security?.has_hsts ? 'good' : 'warn'}
              detail={security?.has_hsts ? '✓ Present' : 'Missing'}
              sub={security?.has_hsts
                ? 'Strict-Transport-Security header enforces HTTPS connections'
                : 'HSTS header missing — browsers not forced to always use HTTPS'}
            />

            {/* Skip Link */}
            <DetailRow
              icon={<StatusIcon ok={d.has_skip_link} />}
              label="Skip Navigation Link"
              status={d.has_skip_link ? 'good' : 'error'}
              detail={d.has_skip_link ? '✓ Found' : 'Missing'}
              sub={d.has_skip_link
                ? 'Skip-to-content anchor link found — keyboard users can skip repeated navigation'
                : 'No skip link found — keyboard users must tab through all nav items on every page (WCAG 2.4.1)'}
            />

            {/* Duplicate IDs */}
            <DetailRow
              icon={<StatusIcon ok={d.duplicate_ids.length === 0} />}
              label="Duplicate ID Attributes"
              status={d.duplicate_ids.length === 0 ? 'good' : 'error'}
              detail={d.duplicate_ids.length === 0 ? '✓ None' : `${d.duplicate_ids.length} duplicates`}
              sub={d.duplicate_ids.length > 0
                ? `Duplicate IDs: ${d.duplicate_ids.slice(0, 4).map(id => `#${id}`).join(', ')} — breaks ARIA and JS selectors (WCAG 4.1.1)`
                : 'All element IDs are unique on the page'}
            />

            {/* Images */}
            <DetailRow
              icon={<StatusIcon ok={imgBad === 0 && imgTotal > 0} warn={imgBad > 0 && imgBad < imgTotal} />}
              label={`Images (${imgTotal} total)`}
              status={imgTotal === 0 ? 'neutral' : imgBad > 0 ? 'error' : 'good'}
              detail={imgTotal === 0 ? 'None found' : `${imgGood} ✓ / ${imgBad} ✗`}
              sub={imgTotal === 0
                ? 'No images found on this page'
                : imgBad > 0
                  ? `${imgBad} image${imgBad > 1 ? 's are' : ' is'} missing the alt attribute — screen readers cannot describe them (WCAG 1.1.1)`
                  : `All ${imgTotal} images have alt text — great accessibility practice`}
            />

            {/* Links */}
            <DetailRow
              icon={<StatusIcon ok={linkBad === 0} warn={false} />}
              label={`Links (${linkTotal} total)`}
              status={linkBad > 0 ? 'error' : 'good'}
              detail={`${linkGood} ✓ / ${linkBad} ✗`}
              sub={linkBad > 0
                ? `${linkBad} link${linkBad > 1 ? 's have' : ' has'} no discernible text — screen readers announce them as "link" with no destination (WCAG 2.4.4)`
                : `All ${linkTotal} links have accessible text`}
            />

            {/* Buttons */}
            {btnTotal > 0 && (
              <DetailRow
                icon={<StatusIcon ok={btnBad === 0} warn={false} />}
                label={`Buttons (${btnTotal} total)`}
                status={btnBad > 0 ? 'error' : 'good'}
                detail={`${btnGood} ✓ / ${btnBad} ✗`}
                sub={btnBad > 0
                  ? `${btnBad} button${btnBad > 1 ? 's have' : ' has'} no label — assistive technology cannot communicate their purpose (WCAG 4.1.2)`
                  : `All ${btnTotal} buttons have accessible labels`}
              />
            )}

            {/* Form Inputs */}
            {inpTotal > 0 && (
              <DetailRow
                icon={<StatusIcon ok={inpBad === 0} warn={false} />}
                label={`Form Inputs (${inpTotal} total)`}
                status={inpBad > 0 ? 'error' : 'good'}
                detail={`${inpGood} ✓ / ${inpBad} ✗`}
                sub={inpBad > 0
                  ? `${inpBad} input${inpBad > 1 ? 's are' : ' is'} missing a label — users and screen readers cannot identify the field's purpose (WCAG 1.3.1)`
                  : `All ${inpTotal} form inputs have properly associated labels`}
              />
            )}
          </div>

          {/* ── RIGHT: Visual Document Outline ── */}
          <div className="p-5 bg-slate-50 overflow-y-auto max-h-[900px]">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Visual Page Outline</h3>

            {/* <head> block */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">&lt;head&gt;</span>
              </div>
              <div className="ml-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <TagChip tag="title" status={titleOk ? 'good' : titleWarn ? 'warn' : 'error'}>
                    {d.page_title ? `"${d.page_title.substring(0, 40)}${d.page_title_length > 40 ? '…' : ''}"` : 'MISSING'}
                  </TagChip>
                  <span className="text-[10px] text-gray-400">{d.page_title ? `${d.page_title_length}ch` : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TagChip tag="meta description" status={descOk ? 'good' : descWarn ? 'warn' : 'error'}>
                    {d.meta_description ? `${d.meta_description_length}ch` : 'MISSING'}
                  </TagChip>
                </div>
                <div className="flex items-center gap-2">
                  <TagChip tag={`html lang`} status={d.html_lang ? 'good' : 'error'}>
                    {d.html_lang ? `"${d.html_lang}"` : 'MISSING'}
                  </TagChip>
                </div>
                <div className="flex items-center gap-2">
                  <TagChip tag="meta viewport" status={d.viewport ? 'good' : 'error'}>
                    {d.viewport ? 'present' : 'MISSING'}
                  </TagChip>
                </div>
                <div className="flex items-center gap-2">
                  <TagChip tag="link canonical" status={d.canonical ? 'good' : 'warn'}>
                    {d.canonical ? 'present' : 'missing'}
                  </TagChip>
                </div>
                <div className="flex items-center gap-2">
                  <TagChip tag="og:title" status={d.og_title ? 'good' : 'warn'}>{d.og_title ? 'present' : 'missing'}</TagChip>
                  <TagChip tag="og:image" status={d.og_image ? 'good' : 'warn'}>{d.og_image ? 'present' : 'missing'}</TagChip>
                </div>
                <div className="flex items-center gap-2">
                  <TagChip tag="twitter:card" status={d.twitter_card ? 'good' : 'warn'}>{d.twitter_card || 'missing'}</TagChip>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 my-3" />

            {/* <body> block */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded">&lt;body&gt;</span>
              </div>
              <div className="ml-4 space-y-4">

                {/* Headings */}
                {['h1','h2','h3','h4','h5','h6'].map(tag => {
                  const hd = d.headings?.[tag];
                  if (!hd) return null;
                  const isH1 = tag === 'h1';
                  const status = isH1
                    ? (hd.count === 0 ? 'error' : hd.count === 1 ? 'good' : 'warn')
                    : hd.count > 0 ? 'good' : 'neutral';
                  if (!isH1 && hd.count === 0) return null;
                  const fontSizes = { h1: 'text-base font-bold', h2: 'text-sm font-bold', h3: 'text-sm font-semibold', h4: 'text-xs font-semibold', h5: 'text-xs', h6: 'text-xs' };
                  return (
                    <div key={tag}>
                      {hd.items.slice(0, 3).map((text, i) => (
                        <div key={i} className={`flex items-start gap-2 mb-1 ${i > 0 ? 'ml-4' : ''}`}>
                          <TagChip tag={tag} status={status} />
                          <span className={`${fontSizes[tag]} text-gray-700 break-words flex-1`}>
                            {text || <em className="text-gray-400">empty</em>}
                          </span>
                        </div>
                      ))}
                      {hd.count > 3 && (
                        <p className="text-[10px] text-gray-400 ml-6">+{hd.count - 3} more &lt;{tag}&gt; tags</p>
                      )}
                      {isH1 && hd.count === 0 && (
                        <div className="flex items-center gap-2">
                          <TagChip tag="h1" status="error">MISSING</TagChip>
                          <span className="text-xs text-red-600">Required — use exactly one H1 per page</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Divider */}
                <div className="border-t border-dashed border-gray-200" />

                {/* Images — visual gallery with status overlays */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-gray-500">&lt;img&gt; × {imgTotal}</span>
                    {imgBad > 0 && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 rounded-full font-semibold">{imgBad} missing alt</span>}
                    {d.images?.items?.filter(im => im.isEmpty).length > 0 && (
                      <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 rounded-full font-semibold">
                        {d.images.items.filter(im => im.isEmpty).length} empty alt
                      </span>
                    )}
                    {imgGood > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full font-semibold">{imgGood} with alt</span>}
                  </div>

                  {imgTotal === 0 && <p className="text-xs text-gray-400 italic">No images found on page</p>}

                  <div className="grid grid-cols-2 gap-2">
                    {d.images?.items?.slice(0, 12).map((img, i) => {
                      const isMissingAlt = !img.hasAlt;
                      const isEmptyAlt   = img.hasAlt && img.isEmpty;
                      const isGood       = img.hasAlt && !img.isEmpty;
                      const borderColor  = isMissingAlt ? 'border-red-400' : isEmptyAlt ? 'border-yellow-400' : 'border-emerald-400';
                      const badgeBg      = isMissingAlt ? 'bg-red-500'     : isEmptyAlt ? 'bg-yellow-500'     : 'bg-emerald-500';
                      const badgeLabel   = isMissingAlt ? '✗ No alt'       : isEmptyAlt ? '~ Empty alt'       : '✓ Has alt';
                      const BadgeIcon    = isMissingAlt ? XCircle           : isEmptyAlt ? AlertTriangle       : CheckCircle;
                      const bottomBg     = isMissingAlt ? 'bg-red-50'      : isEmptyAlt ? 'bg-yellow-50'      : 'bg-emerald-50';

                      return (
                        <div key={i} className={`relative rounded-lg border-2 overflow-hidden bg-gray-100 ${borderColor}`}>

                          {/* Real image from the scanned site */}
                          {img.src && !img.src.startsWith('data:') ? (
                            <img
                              src={img.src}
                              alt={img.alt || ''}
                              className="w-full h-28 object-cover block"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={e => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}

                          {/* Fallback when img fails to load or is a data-URI with no preview */}
                          <div
                            className="w-full h-28 bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center flex-col gap-1 text-gray-400"
                            style={{ display: img.src && !img.src.startsWith('data:') ? 'none' : 'flex' }}
                          >
                            <Eye className="w-7 h-7 opacity-25" />
                            <span className="text-[10px] text-center px-2">
                              {img.src ? 'Image blocked by CORS' : 'No src attribute'}
                            </span>
                          </div>

                          {/* Status badge — top-right */}
                          <div className={`absolute top-1.5 right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-white text-[9px] font-bold shadow ${badgeBg}`}>
                            <BadgeIcon className="w-2.5 h-2.5" />
                            {badgeLabel}
                          </div>

                          {/* Index badge — top-left */}
                          <div className="absolute top-1.5 left-1.5 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded-full font-mono">
                            #{img.index}
                          </div>

                          {/* Info bar at bottom */}
                          <div className={`px-2 py-1.5 text-[10px] leading-tight ${bottomBg}`}>
                            {isMissingAlt && (
                              <p className="text-red-700 font-semibold">alt attribute missing (WCAG 1.1.1)</p>
                            )}
                            {isEmptyAlt && (
                              <p className="text-yellow-700 font-semibold">alt="" — if decorative add role="presentation"</p>
                            )}
                            {isGood && (
                              <p className="text-emerald-700 break-words" title={img.alt}>
                                alt="{img.alt?.substring(0, 50)}{img.alt?.length > 50 ? '…' : ''}"
                              </p>
                            )}
                            {(img.width || img.height || img.loading) && (
                              <p className="text-gray-400 mt-0.5">
                                {img.width ? `w=${img.width} ` : ''}{img.height ? `h=${img.height}` : ''}{img.loading ? ` · loading=${img.loading}` : ''}
                              </p>
                            )}
                            <p className="text-gray-300 truncate mt-0.5 font-mono" title={img.src}>
                              {img.src ? img.src.split('/').slice(-1)[0]?.substring(0, 35) || img.src.substring(0, 35) : '—'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {imgTotal > 12 && (
                    <p className="text-[10px] text-gray-400 mt-2 text-center">
                      Showing 12 of {imgTotal} images · {imgTotal - 12} more not shown
                    </p>
                  )}
                </div>

                {/* Links */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-gray-500">&lt;a&gt; × {linkTotal}</span>
                    {linkBad > 0 && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 rounded-full">{linkBad} empty text</span>}
                    {linkGood > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full">{linkGood} with text</span>}
                  </div>
                  <div className="space-y-1">
                    {d.links?.items?.slice(0, 6).map((lnk, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <TagChip tag="a" status={lnk.hasText ? 'good' : 'error'} />
                        <span className="text-[10px] text-gray-600 break-all flex-1">
                          {lnk.hasText
                            ? <span className="text-emerald-700">"{lnk.text?.substring(0, 50)}"</span>
                            : <span className="text-red-600 font-semibold">no link text — inaccessible to screen readers</span>
                          }
                        </span>
                      </div>
                    ))}
                    {linkTotal > 6 && <p className="text-[10px] text-gray-400 ml-6">+{linkTotal - 6} more links</p>}
                  </div>
                </div>

                {/* Buttons */}
                {btnTotal > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-gray-500">&lt;button&gt; × {btnTotal}</span>
                      {btnBad > 0 && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 rounded-full">{btnBad} no label</span>}
                      {btnGood > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full">{btnGood} labeled</span>}
                    </div>
                    <div className="space-y-1">
                      {d.buttons?.items?.slice(0, 5).map((btn, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <TagChip tag="button" status={btn.hasText ? 'good' : 'error'} />
                          <span className="text-[10px] text-gray-600 break-words flex-1">
                            {btn.hasText
                              ? <span className="text-emerald-700">"{btn.text.substring(0, 50)}"</span>
                              : <span className="text-red-600 font-semibold">no accessible label (WCAG 4.1.2)</span>
                            }
                          </span>
                        </div>
                      ))}
                      {btnTotal > 5 && <p className="text-[10px] text-gray-400 ml-6">+{btnTotal - 5} more buttons</p>}
                    </div>
                  </div>
                )}

                {/* Form Inputs */}
                {inpTotal > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-gray-500">&lt;input&gt; × {inpTotal}</span>
                      {inpBad > 0 && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 rounded-full">{inpBad} unlabeled</span>}
                      {inpGood > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded-full">{inpGood} labeled</span>}
                    </div>
                    <div className="space-y-1">
                      {d.inputs?.items?.slice(0, 5).map((inp, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <TagChip tag={`input type="${inp.type}"`} status={inp.hasLabel ? 'good' : 'error'} />
                          <span className="text-[10px] text-gray-600 flex-1">
                            {inp.hasLabel
                              ? <span className="text-emerald-700">✓ has accessible label</span>
                              : <span className="text-red-600 font-semibold">no label — form field inaccessible (WCAG 1.3.1)</span>
                            }
                          </span>
                        </div>
                      ))}
                      {inpTotal > 5 && <p className="text-[10px] text-gray-400 ml-6">+{inpTotal - 5} more inputs</p>}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Footer legend */}
        <div className="px-6 py-3 bg-gray-50 border-t flex flex-wrap gap-x-6 gap-y-1">
          {[['good','bg-emerald-500','Pass / Good'],['warn','bg-yellow-500','Warning / Improvable'],['error','bg-red-500','Error / Fail'],['neutral','bg-gray-400','Informational']].map(([s,c,l]) => (
            <div key={s} className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <span className={`w-2 h-2 rounded-full ${c}`} />{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Live Page Inspector ──────────────────────────────────────────────────
const ANNOTATION_COLORS = {
  error: { border: '#ef4444', bg: 'rgba(239,68,68,0.12)', badge: '#ef4444', text: '#fff' },
  warn:  { border: '#f59e0b', bg: 'rgba(245,158,11,0.12)', badge: '#f59e0b', text: '#fff' },
  good:  { border: '#10b981', bg: 'rgba(16,185,129,0.10)', badge: '#10b981', text: '#fff' },
  info:  { border: '#3b82f6', bg: 'rgba(59,130,246,0.10)', badge: '#3b82f6', text: '#fff' },
};

const LivePageInspector = ({ url }) => {
  const [phase, setPhase]           = useState('idle');   // idle|loading|ready|blocked|error
  const [annotations, setAnnotations] = useState([]);
  const [pageH, setPageH]           = useState(5000);
  const [ctrW, setCtrW]             = useState(900);
  const [filter, setFilter]         = useState('all');
  const [hovered, setHovered]       = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const ctrRef   = useRef(null);
  const iframeRef = useRef(null);
  const timerRef = useRef(null);

  const proxyUrl = `${BACKEND_URL}/api/preview?url=${encodeURIComponent(url)}`;
  const scale    = ctrW / 1280;

  // Measure container width
  useEffect(() => {
    if (phase === 'idle') return;
    const measure = () => { if (ctrRef.current) setCtrW(ctrRef.current.offsetWidth - 2); };
    measure();
    const ro = new ResizeObserver(measure);
    if (ctrRef.current) ro.observe(ctrRef.current);
    return () => ro.disconnect();
  }, [phase]);

  // Listen for annotations from iframe
  useEffect(() => {
    if (phase === 'idle') return;
    const handler = (e) => {
      if (e.data?.type !== 'webenablix-annotations') return;
      clearTimeout(timerRef.current);
      setAnnotations(e.data.annotations || []);
      setPageH(e.data.pageHeight || 5000);
      setPhase('ready');
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [phase]);

  const startInspect = () => {
    setPhase('loading');
    setAnnotations([]);
    setIframeLoaded(false);
  };

  const onIframeLoad = () => {
    setIframeLoaded(true);
    // Timeout: if no annotations arrive in 10s, mark as blocked
    timerRef.current = setTimeout(() => {
      setPhase(p => p === 'loading' ? 'blocked' : p);
    }, 10000);
  };

  // Filtered annotation list
  const filtered = filter === 'all'
    ? annotations
    : annotations.filter(a => a.status === filter);

  const counts = {
    error: annotations.filter(a => a.status === 'error').length,
    warn:  annotations.filter(a => a.status === 'warn').length,
    good:  annotations.filter(a => a.status === 'good').length,
    info:  annotations.filter(a => a.status === 'info').length,
  };

  if (phase === 'idle') {
    return (
      <div className="mt-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="h-px flex-1 bg-white/20" />
          <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Live Page Inspector</span>
          <div className="h-px flex-1 bg-white/20" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <MonitorCheck className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Inspect Actual Page with Annotations</h3>
          <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
            Load the real website inside an inspector and see every accessibility error, warning, and good practice
            marked directly on the actual page elements — headings, images, links, buttons, and form inputs.
          </p>
          <button
            onClick={startInspect}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full font-semibold transition-colors"
          >
            <MonitorCheck className="w-5 h-5" />
            Inspect Live Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-4 justify-center">
        <div className="h-px flex-1 bg-white/20" />
        <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Live Page Inspector</span>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-slate-900/60 rounded px-3 py-1.5 text-xs text-slate-300 font-mono truncate">{url}</div>
          <button
            onClick={startInspect}
            title="Reload inspector"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          {phase === 'ready' && (
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              {annotations.length} annotations
            </span>
          )}
        </div>

        {/* Filter bar */}
        {phase === 'ready' && (
          <div className="px-4 py-2 bg-gray-50 border-b flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            {[['all','All',null],['error','Errors','bg-red-500'],['warn','Warnings','bg-yellow-500'],['good','Good','bg-emerald-500'],['info','Info','bg-blue-500']].map(([val, lbl, dot]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === val ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />}
                {lbl}
                {val !== 'all' && counts[val] > 0 && <span className="opacity-70">({counts[val]})</span>}
                {val === 'all' && <span className="opacity-70">({annotations.length})</span>}
              </button>
            ))}
          </div>
        )}

        <div className="flex" style={{ minHeight: 500 }}>

          {/* ── Left: Scaled iframe + overlay ── */}
          <div ref={ctrRef} className="flex-1 overflow-y-auto bg-gray-100 relative" style={{ maxHeight: 680 }}>

            {/* Loading / blocked / error states */}
            {phase === 'loading' && !iframeLoaded && (
              <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50 gap-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-600 font-medium">Loading page…</p>
                <p className="text-xs text-gray-400">{url}</p>
              </div>
            )}
            {phase === 'loading' && iframeLoaded && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50 gap-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-600 font-medium">Scanning page elements…</p>
              </div>
            )}
            {phase === 'blocked' && (
              <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center z-50 gap-3 p-8">
                <XCircle className="w-10 h-10 text-red-400" />
                <p className="text-base font-semibold text-gray-700">Page blocked iframe embedding</p>
                <p className="text-sm text-gray-500 text-center max-w-sm">
                  This site uses security policies that prevent it from loading inside an iframe.
                  The element data in the Deep Analysis section above is still accurate.
                </p>
              </div>
            )}

            {/* page-inner: natural 1280px width scaled down */}
            {phase !== 'idle' && (
              <div
                style={{
                  position: 'relative',
                  width: 1280,
                  height: pageH,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                {/* Real iframe */}
                <iframe
                  ref={iframeRef}
                  src={proxyUrl}
                  title="Live page preview"
                  onLoad={onIframeLoad}
                  sandbox="allow-scripts allow-forms allow-same-origin"
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 1280, height: pageH,
                    border: 'none',
                  }}
                />

                {/* Annotation overlay (pointer-events none so iframe is still scrollable) */}
                <div
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 1280, height: pageH,
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  {filtered.map(ann => {
                    const c   = ANNOTATION_COLORS[ann.status] || ANNOTATION_COLORS.info;
                    const isH = hovered === ann.id;
                    // Only annotate elements with visible area
                    if (ann.width < 2 || ann.height < 2) return null;
                    return (
                      <div
                        key={ann.id}
                        style={{
                          position: 'absolute',
                          top:    ann.top,
                          left:   ann.left,
                          width:  ann.width,
                          height: ann.height,
                          border: `2px solid ${c.border}`,
                          backgroundColor: c.bg,
                          pointerEvents: 'auto',
                          cursor: 'pointer',
                          zIndex: isH ? 30 : 20,
                          transition: 'z-index 0s',
                        }}
                        onMouseEnter={() => setHovered(ann.id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {/* Label chip */}
                        <span
                          style={{
                            position: 'absolute',
                            top: -1,
                            left: -1,
                            backgroundColor: c.badge,
                            color: '#fff',
                            fontSize: 9,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: '0 0 4px 0',
                            whiteSpace: 'nowrap',
                            lineHeight: '14px',
                            zIndex: 2,
                          }}
                        >
                          {ann.label}
                        </span>

                        {/* Hover tooltip */}
                        {isH && (
                          <div
                            style={{
                              position: 'absolute',
                              top:  ann.height + 4,
                              left: 0,
                              minWidth: 220,
                              maxWidth: 320,
                              backgroundColor: '#1e293b',
                              color: '#e2e8f0',
                              fontSize: 11,
                              padding: '8px 10px',
                              borderRadius: 6,
                              zIndex: 100,
                              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                              pointerEvents: 'none',
                              lineHeight: 1.5,
                            }}
                          >
                            <div style={{ fontFamily: 'monospace', fontWeight: 700, marginBottom: 4, color: c.badge }}>{ann.label} · {ann.status.toUpperCase()}</div>
                            <div style={{ marginBottom: ann.issue ? 4 : 0, wordBreak: 'break-word' }}>{ann.detail}</div>
                            {ann.issue && <div style={{ color: '#fca5a5', fontSize: 10 }}>{ann.issue}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Annotation list ── */}
          {phase === 'ready' && (
            <div className="w-72 flex-shrink-0 border-l border-gray-200 bg-slate-50 overflow-y-auto" style={{ maxHeight: 680 }}>
              <div className="p-3 border-b bg-white">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Annotations</p>
                <div className="flex gap-3 mt-2 text-[11px]">
                  <span className="text-red-600 font-semibold">{counts.error} errors</span>
                  <span className="text-yellow-600 font-semibold">{counts.warn} warnings</span>
                  <span className="text-emerald-600 font-semibold">{counts.good} good</span>
                  <span className="text-blue-600 font-semibold">{counts.info} info</span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {filtered.length === 0 && (
                  <p className="text-xs text-gray-400 italic p-4 text-center">No annotations match this filter</p>
                )}
                {filtered.map(ann => {
                  const c = ANNOTATION_COLORS[ann.status] || ANNOTATION_COLORS.info;
                  return (
                    <div
                      key={ann.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        hovered === ann.id ? 'bg-blue-50' : 'hover:bg-gray-100'
                      }`}
                      onMouseEnter={() => setHovered(ann.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white flex-shrink-0"
                          style={{ backgroundColor: c.badge }}
                        >
                          {ann.label}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: c.badge }}>
                          {ann.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-700 break-words leading-tight">{ann.detail}</p>
                      {ann.issue && (
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{ann.issue}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="p-3 border-t bg-white mt-auto">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5">Legend</p>
                {[['error','bg-red-500','Error — must fix'],['warn','bg-yellow-500','Warning — should fix'],['good','bg-emerald-500','Good practice'],['info','bg-blue-500','Informational']].map(([s,c,l]) => (
                  <div key={s} className="flex items-center gap-1.5 text-[10px] text-gray-500 mb-1">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c}`} />{l}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Audit Section
const AuditSection = ({ externalUrl }) => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('current');

  // Reset to "Current State" whenever a new audit result arrives
  useEffect(() => {
    setActiveView('current');
  }, [auditResult]);

  // When Hero section submits a URL, prefill and auto-run
  useEffect(() => {
    if (!externalUrl) return;
    setWebsiteUrl(externalUrl);
    // Small delay so state is committed before we call handleAudit via the ref trick
    setTriggerExternal(true);
  }, [externalUrl]);

  const [triggerExternal, setTriggerExternal] = useState(false);

  const displayResult = auditResult && activeView === 'webenablix'
    ? buildProjectedResult(auditResult)
    : auditResult;

  // Fire audit when external trigger is set
  useEffect(() => {
    if (triggerExternal && websiteUrl) {
      setTriggerExternal(false);
      handleAudit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerExternal, websiteUrl]);

  const handleAudit = async () => {
    if (!websiteUrl.trim()) {
      setError('Please enter a website URL');
      return;
    }
    let normalizedUrl = websiteUrl.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) normalizedUrl = 'https://' + normalizedUrl;

    setLoading(true);
    setError(null);
    setAuditResult(null);

    try {
      const response = await axios.post(`${API}/audit`, { url: normalizedUrl, audit_type: 'full' });
      setAuditResult(response.data);
    } catch (err) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.code === 'ERR_NETWORK' || err.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please ensure the backend is running on port 8001.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timed out. The website may be slow or unreachable.');
      } else {
        setError(`Failed to audit website: ${err.message || 'Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="audit-section" className="py-20 lg:py-28 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center">
          <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-4">
            Powered by Google & WCAG Standards
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Complete Website Audit
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Analyze accessibility, SEO, Core Web Vitals, mobile-friendliness, and security
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Enter your website URL (e.g., example.com)"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
                  className="w-full h-14 pl-12 pr-4 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60"
                  disabled={loading}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              </div>
              <Button
                onClick={handleAudit}
                disabled={loading}
                className="h-14 px-8 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full font-semibold flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" />Analyzing...</>
                ) : (
                  <>RUN FULL AUDIT<ArrowRight className="w-5 h-5" /></>
                )}
              </Button>
            </div>
            {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
          </div>

          {displayResult && (
            <FullAuditResults
              result={displayResult}
              originalResult={auditResult}
              view={activeView}
              onToggle={setActiveView}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AuditSection;
