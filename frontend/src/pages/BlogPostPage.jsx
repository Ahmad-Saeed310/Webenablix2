import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Clock, Calendar, User, Tag,
  ChevronRight, BookOpen,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BLOG_POSTS, normalizeApiPost } from './BlogsPage';

const API_URL = import.meta.env.VITE_BACKEND_URL || '';

// ── Tiny Markdown-ish renderer ────────────────────────────────────────────────
// Supports: ## headings, **bold**, `code`, ```code blocks```, tables, lists, paragraphs
const renderContent = (raw) => {
  const lines = raw.trim().split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="bg-gray-900 text-green-300 rounded-xl p-5 my-5 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').map((c) => c.trim()).filter(Boolean);
      i += 2; // skip separator
      const rows = [];
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').map((c) => c.trim()).filter(Boolean));
        i++;
      }
      elements.push(
        <div key={key++} className="overflow-x-auto my-6 rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-200">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-gray-600 border-b border-gray-100">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl font-semibold text-gray-800 mt-7 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[\-\*] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[\-\*] /)) {
        items.push(lines[i].replace(/^[\-\*] /, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-outside pl-6 my-4 space-y-1.5 text-gray-600">
          {items.map((item, ii) => (
            <li key={ii}>{inlineRender(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal list-outside pl-6 my-4 space-y-1.5 text-gray-600">
          {items.map((item, ii) => (
            <li key={ii}>{inlineRender(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="text-gray-600 leading-relaxed my-4">
        {inlineRender(line)}
      </p>
    );
    i++;
  }

  return elements;
};

// Inline: bold, inline code
const inlineRender = (text) => {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold **...**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code `...`
    const codeMatch = remaining.match(/`(.+?)`/);

    const bIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;
    const cIdx = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity;

    if (bIdx === Infinity && cIdx === Infinity) {
      parts.push(<React.Fragment key={key++}>{remaining}</React.Fragment>);
      break;
    }

    if (bIdx <= cIdx) {
      if (bIdx > 0) parts.push(<React.Fragment key={key++}>{remaining.slice(0, bIdx)}</React.Fragment>);
      parts.push(<strong key={key++} className="font-semibold text-gray-900">{boldMatch[1]}</strong>);
      remaining = remaining.slice(bIdx + boldMatch[0].length);
    } else {
      if (cIdx > 0) parts.push(<React.Fragment key={key++}>{remaining.slice(0, cIdx)}</React.Fragment>);
      parts.push(<code key={key++} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">{codeMatch[1]}</code>);
      remaining = remaining.slice(cIdx + codeMatch[0].length);
    }
  }

  return parts;
};

// ── Reading Progress Widget ───────────────────────────────────────────────────
const ReadingProgress = ({ progress }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="fixed  bottom-6 right-[6vw] z-50 flex items-center justify-around gap-2 bg-white border border-gray-200 rounded-full shadow-lg px-3 py-2"
      title={`${Math.round(progress)}% read`}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
        <circle cx="22" cy="22" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="3" />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-200"
        />
      </svg>
      <div className="absolute items-center  pointer-events-none">
        <span className="text-[1.7vh] font-bold text-blue-600 select-none">
          {Math.round(progress)}%
        </span>
      </div>
      {/* <span className="text-xs font-medium text-gray-600 pr-1">Read</span> */}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(() => BLOG_POSTS.find((p) => p.id === id) || null);
  const [loading, setLoading] = useState(!BLOG_POSTS.find((p) => p.id === id));
  const [progress, setProgress] = useState(0);
  const articleRef = useRef(null);

  // If not found in static data, try the API
  useEffect(() => {
    if (!BLOG_POSTS.find((p) => p.id === id)) {
      setLoading(true);
      fetch(`${API_URL}/api/blogs/${id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.blog) setPost(normalizeApiPost(data.blog));
          else setPost(null);
        })
        .catch(() => setPost(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const { top, height } = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = Math.max(0, windowH - top);
      const pct = Math.min(100, (scrolled / height) * 100);
      setProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setProgress(0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-20 text-center text-gray-400">Loading...</main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h1>
          <Link to="/blogs" className="text-blue-600 hover:underline">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const cc = { blue: 'bg-blue-100 text-blue-700', red: 'bg-red-100 text-red-700', green: 'bg-green-100 text-green-700', purple: 'bg-purple-100 text-purple-700', orange: 'bg-orange-100 text-orange-700' };
  const badgeCls = cc[post.categoryColor] || cc.blue;

  // Related posts (same category, excluding current)
  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/blogs" className="hover:text-blue-600 transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Back button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </Link>

          {/* Hero Image */}
          <div className="rounded-3xl overflow-hidden mb-10 shadow-xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${badgeCls}`}>
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{post.author}</div>
                  <div className="text-xs text-gray-400">{post.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />{post.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />{post.readTime}
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                <span>{Math.round(progress)}% read</span>
              </div>
            </div>
          </div>

          {/* Intro excerpt */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl px-6 py-5 mb-10 text-gray-700 leading-relaxed text-base italic">
            {post.excerpt}
          </div>

          {/* Article Body */}
          <article ref={articleRef} className="prose-container">
            {renderContent(post.content)}
          </article>

          {/* Divider */}
          <div className="border-t border-gray-200 mt-16 mb-12" />

          {/* Author Card */}
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 flex items-center gap-5 border border-blue-100 mb-12">
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg">{post.author}</div>
              <div className="text-sm text-blue-600 font-medium mb-1">{post.authorRole}</div>
              <p className="text-sm text-gray-500">
                Expert in web accessibility, compliance, and inclusive design. Writing to help teams build better digital experiences for everyone.
              </p>
            </div>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rp) => {
                  const rc = cc[rp.categoryColor] || cc.blue;
                  return (
                    <Link
                      key={rp.id}
                      to={`/blogs/${rp.id}`}
                      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-36 overflow-hidden">
                        <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rc}`}>{rp.category}</span>
                        <h3 className="mt-2 font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {rp.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />{rp.readTime}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Ready to Make Your Website Accessible?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Run a free accessibility scan and get a detailed compliance report in under 60 seconds.
            </p>
            <Link
              to="/products/checker"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors"
            >
              Try Free Checker <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />

      {/* ── Reading Progress Widget ── */}
      <ReadingProgress progress={progress} />
    </div>
  );
};

export default BlogPostPage;
