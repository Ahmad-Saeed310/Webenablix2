import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_BACKEND_URL || '';

// Normalize a DB blog row to the same shape as BLOG_POSTS entries
export const normalizeApiPost = (b) => ({
  id: b.id,
  title: b.title,
  excerpt: b.excerpt || '',
  category: b.category || '',
  categoryColor: b.category_color || 'blue',
  readTime: b.read_time || '',
  date: b.date || '',
  author: b.author || '',
  authorRole: b.author_role || '',
  image: b.image_url || '',
  content: b.content || '',
  is_featured: b.is_featured,
});

// ── Blog Data ─────────────────────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    id: 'wcag-2-2-guide',
    title: 'WCAG 2.2: What\'s New and How to Comply',
    excerpt:
      'The latest update to the Web Content Accessibility Guidelines introduces four new success criteria. We break down each change and what it means for your website.',
    category: 'Compliance',
    categoryColor: 'blue',
    readTime: '8 min read',
    date: 'Feb 12, 2026',
    author: 'Sarah Mitchell',
    authorRole: 'Accessibility Lead',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    content: `
## What is WCAG 2.2?

WCAG 2.2 is the most recent version of the Web Content Accessibility Guidelines published by the W3C. Released in October 2023, it builds on WCAG 2.1 by adding four new Success Criteria focused on users with cognitive, learning, and motor disabilities.

## The Four New Success Criteria

### 2.4.11 – Focus Not Obscured (Minimum) (Level AA)
When a user interface component receives keyboard focus, the component should not be entirely hidden by author-created content. This means sticky headers, cookie banners, and chat widgets must not completely cover focused elements.

### 2.4.12 – Focus Not Obscured (Enhanced) (Level AAA)
A stricter version requiring that the focus indicator is never obscured at all — even partially — by other content.

### 2.4.13 – Focus Appearance (Level AAA)
The keyboard focus indicator must meet minimum size and contrast requirements: it needs to enclose the component and have a contrast ratio of at least 3:1 between focused and unfocused states.

### 2.5.7 – Dragging Movements (Level AA)
Any functionality that uses dragging (like sliders or kanban boards) must also be operable with a single pointer without dragging, ensuring users with motor impairments are not excluded.

### 2.5.8 – Target Size (Minimum) (Level AA)
Interactive targets must be at least 24×24 CSS pixels, unless spacing, inline content, or user-agent styling is responsible for the size.

### 3.2.6 – Consistent Help (Level A)
Help mechanisms (such as a contact phone number, chat widget, or support link) that repeat across multiple pages must appear in the same relative order each time.

### 3.3.7 – Redundant Entry (Level A)
Users should not have to re-enter information they have already provided within the same process (such as a checkout flow).

### 3.3.8 – Accessible Authentication (Minimum) (Level AA)
A cognitive function test (like remembering a password or solving a puzzle) must not be the only method for authentication unless an alternative is provided — such as a copy-paste option or a third-party authentication provider.

## How to Audit Your Site

1. **Run automated scans** — Tools like Webenablix can catch many of these issues automatically.
2. **Manual keyboard testing** — Navigate your entire site using only Tab, Shift+Tab, Enter, and arrow keys.
3. **Check focus indicators** — Use browser DevTools to verify focus styles have sufficient contrast.
4. **Test drag interactions** — Verify every drag-based widget has a keyboard-accessible alternative.
5. **Review authentication flows** — Ensure login and sign-up forms support copy-paste.

## Getting Help

Webenablix's automated scanner now fully supports WCAG 2.2 Level AA checks. Run a free scan today to see where your site stands.
    `,
  },
  {
    id: 'ada-compliance-2026',
    title: 'ADA Compliance in 2026: What Every Business Must Know',
    excerpt:
      'U.S. courts continue to see a surge in web accessibility lawsuits. Here\'s what changed, what\'s coming, and how you can protect your business today.',
    category: 'Legal',
    categoryColor: 'red',
    readTime: '6 min read',
    date: 'Jan 28, 2026',
    author: 'James Harlow',
    authorRole: 'Legal & Compliance Writer',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    content: `
## The Legal Landscape for Web Accessibility in 2026

Since the DOJ finalized its web accessibility rule under Title II of the ADA in 2024, federal agencies and state governments are now legally required to meet WCAG 2.1 AA standards. For private businesses under Title III, the legal pressure remains largely litigation-driven — and the number of lawsuits filed continues to grow.

## Key Developments in 2025–2026

- **DOJ Title II Rule** went into effect for large state and local governments (June 2025) and smaller entities (April 2026).
- **Federal contractor requirements** have been updated to align with Section 508 refresh standards.
- **Serial plaintiff litigation** continues in California, Florida, and New York, targeting e-commerce, hospitality, and healthcare sites.

## Common Violations That Lead to Lawsuits

1. Missing alt text on product images
2. Inaccessible checkout and form flows
3. Videos without captions
4. Poor keyboard navigation
5. Insufficient color contrast

## Building a Defensible Compliance Program

A strong accessibility program includes:

- **Regular automated audits** on all public-facing pages
- **Manual expert reviews** at least annually
- **Accessibility conformance report** (ACR/VPAT) kept up to date
- **Published accessibility statement** with contact information
- **Remediation roadmap** prioritized by impact

## Why Proactive Compliance Pays Off

Beyond avoiding lawsuits, accessible websites see measurable business benefits: improved SEO rankings, higher conversion rates, and larger addressable audiences. An estimated 26% of U.S. adults live with a disability.
    `,
  },
  {
    id: 'screen-reader-ux',
    title: 'Designing for Screen Readers: A Developer\'s Practical Guide',
    excerpt:
      'Most accessibility issues faced by screen reader users are invisible to sighted developers. This guide walks through the most impactful patterns and anti-patterns.',
    category: 'Development',
    categoryColor: 'green',
    readTime: '10 min read',
    date: 'Jan 14, 2026',
    author: 'Priya Nair',
    authorRole: 'Frontend Engineer',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    content: `
## Understanding How Screen Readers Work

Screen readers like NVDA, JAWS, and VoiceOver convert on-screen content into speech or Braille output. They navigate the page via a virtual cursor driven by the DOM's accessibility tree — not the visual layout.

## Semantic HTML is Your Best Friend

Use the right element for the right job:

- \`<button>\` for actions, \`<a>\` for navigation
- \`<h1>–<h6>\` for headings (never style a \`<div>\` to look like a heading)
- \`<ul>/<ol>\` for lists, \`<table>\` for tabular data with \`<caption>\` and \`scope\` attributes
- \`<form>\` elements with properly associated \`<label>\` elements

## ARIA: Use It Sparingly

ARIA is powerful but dangerous when misused. Follow the first rule of ARIA: **don't use ARIA if a native HTML element does the job**.

Good uses of ARIA:
- \`aria-live\` regions for dynamic content like toast notifications
- \`aria-label\` / \`aria-labelledby\` when a visible label isn't possible
- \`role="dialog"\` with focus management for custom modals

Bad uses:
- Adding \`role="button"\` to a \`<div>\` instead of using \`<button>\`
- Using \`aria-hidden="true"\` on content that should be readable

## Focus Management in SPAs

Single-page applications must manage focus deliberately:

1. When a modal opens, move focus to the modal container or its first interactive element.
2. When a modal closes, return focus to the trigger element.
3. After a page navigation, move focus to the main heading or a skip-link target.

## Testing Your Work

Always test with real assistive technologies:

| Tool | Platform | Cost |
|------|----------|------|
| NVDA + Firefox | Windows | Free |
| JAWS + Chrome | Windows | Paid |
| VoiceOver + Safari | macOS / iOS | Built-in |
| TalkBack | Android | Built-in |

Never rely solely on automated scanners — they catch roughly 30–40% of real issues.
    `,
  },
  {
    id: 'color-contrast-guide',
    title: 'Color Contrast Demystified: Meeting WCAG AA and AAA',
    excerpt:
      'Contrast ratios, large text rules, UI components — color contrast is more nuanced than it looks. A complete, visual breakdown for designers and developers.',
    category: 'Design',
    categoryColor: 'purple',
    readTime: '7 min read',
    date: 'Dec 30, 2025',
    author: 'Carlos Reyes',
    authorRole: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=80',
    content: `
## Why Color Contrast Matters

Low color contrast is one of the most common and impactful accessibility barriers. It affects users with low vision, color blindness, and anyone reading in bright sunlight on a mobile device.

## The WCAG Contrast Requirements

WCAG defines contrast requirements for **text** and **non-text** elements separately.

### Text Contrast (Success Criteria 1.4.3 and 1.4.6)

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA    | 4.5:1       | 3:1        |
| AAA   | 7:1         | 4.5:1      |

**Large text** means ≥18pt (24px) regular weight, or ≥14pt (18.67px) bold.

### Non-Text Contrast (Success Criterion 1.4.11, Level AA)

UI components (borders of inputs, checkbox marks, focus rings) and informational graphics need a minimum 3:1 contrast ratio against adjacent colors.

## Calculating Contrast Ratios

The formula uses **relative luminance** (L):

\`\`\`
Ratio = (L1 + 0.05) / (L2 + 0.05)
\`\`\`

Where L1 is the lighter color and L2 the darker. Tools like the WebAIM Contrast Checker do this automatically.

## Common Mistakes

- **Placeholder text** — often styled gray; it must meet the same 4.5:1 ratio as regular text.
- **Disabled elements** — WCAG exempts them, but users can't tell they're disabled if they look identical to enabled ones with poor contrast.
- **Text over images** — the contrast must be measured over the actual pixels, not an average. Use a semi-transparent scrim behind text.

## Practical Tips

1. Design with contrast in mind from the start — retrofitting is costly.
2. Use a palette-level contrast checker in Figma or Sketch.
3. Verify with browser DevTools > Accessibility > Color Contrast.
4. Don't rely on color alone to convey meaning (e.g., red = error); add an icon or text.
    `,
  },
  {
    id: 'accessibility-roi',
    title: 'The ROI of Accessibility: Real Numbers, Real Impact',
    excerpt:
      'Accessibility isn\'t just a compliance checkbox. Companies that invest in it see measurable gains in SEO, conversion, and customer retention. Here\'s the data.',
    category: 'Business',
    categoryColor: 'orange',
    readTime: '5 min read',
    date: 'Dec 15, 2025',
    author: 'Amanda Torres',
    authorRole: 'Growth Strategist',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    content: `
## The Business Case for Accessibility

When accessibility is framed as "just compliance," it's treated as a cost center. When framed correctly, it's a growth driver.

## Market Size

- **1.3 billion people** worldwide live with some form of disability.
- In the U.S. alone, people with disabilities have **$490 billion in disposable income**.
- The global accessible technology market is projected to reach **$823 billion by 2030**.

## SEO Benefits

Accessibility and SEO are deeply intertwined:

- **Alt text** helps search engines understand images.
- **Semantic HTML** and proper heading structure improve crawlability.
- **Fast, clean DOM** from accessible markup reduces Core Web Vitals issues.
- **Captions** on videos create indexable text content.

Studies show that sites with high accessibility scores rank 15–20% higher for long-tail queries on average.

## Conversion Rate Impact

A Microsoft study found that accessible e-commerce sites had:

- **2× lower cart abandonment** among users with disabilities
- **13% higher overall conversion rate** due to improved UX clarity
- **Higher Net Promoter Scores** from all users (accessible designs are simply better designs)

## The Cost of Inaction

- **Average ADA lawsuit settlement**: $25,000–$100,000
- **Average remediation cost post-lawsuit**: 3–5× the cost of proactive remediation
- **Brand reputational damage**: Immeasurable

## Getting Started

Use Webenablix's free checker to get a baseline score today. Even a 10-point improvement in your accessibility score can translate to real revenue gains.
    `,
  },
  {
    id: 'keyboard-navigation-tips',
    title: 'Keyboard Navigation: Making Every Feature Reachable',
    excerpt:
      'Millions of users rely entirely on keyboards to browse the web. This guide covers skip links, focus traps, custom widgets, and everything in between.',
    category: 'Development',
    categoryColor: 'green',
    readTime: '9 min read',
    date: 'Nov 28, 2025',
    author: 'Priya Nair',
    authorRole: 'Frontend Engineer',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    content: `
## Who Uses Keyboard Navigation?

Keyboard navigation is essential for:

- Users with motor disabilities who cannot use a mouse
- Power users who prefer keyboard efficiency
- Users of assistive technologies that emulate keyboard input (switch access, eye gaze)

## The Fundamentals

Every interactive element must be:
1. **Focusable** — reachable with Tab or arrow keys
2. **Operable** — activatable with Enter or Space
3. **Visible when focused** — clear focus indicator

## Skip Links

Skip links allow keyboard users to jump past repetitive navigation to the main content. They are typically the first focusable element on the page and visually hidden until focused.

\`\`\`html
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content">...</main>
\`\`\`

\`\`\`css
.skip-link {
  position: absolute;
  transform: translateY(-100%);
  transition: transform 0.2s;
}
.skip-link:focus {
  transform: translateY(0);
}
\`\`\`

## Focus Traps

Modal dialogs must trap focus — Tab should cycle through the modal's interactive elements and not escape to the page behind it.

A minimal focus trap:
1. On open: collect all focusable children, focus the first one.
2. On Tab: if on last focusable child, wrap to first. If Shift+Tab on first, wrap to last.
3. On close: return focus to the trigger.

## Custom Keyboard Patterns (ARIA Authoring Practices)

The W3C ARIA Authoring Practices Guide defines keyboard interaction models for common widgets:

| Widget | Navigation |
|--------|-----------|
| Tab list | Arrow keys between tabs |
| Menu / menubar | Arrow keys, Escape to close |
| Combobox | Arrow keys to navigate list, Escape to close |
| Tree | Arrow keys to expand/collapse |
| Grid / Data table | Arrow keys in all directions |

## Testing Tip

Unplug your mouse. Spend 15 minutes using your product with only the keyboard. You will immediately find the most critical issues.
    `,
  },
];

// ── Category color map ────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  red:    { bg: 'bg-red-100',    text: 'text-red-700'    },
  green:  { bg: 'bg-green-100',  text: 'text-green-700'  },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
};

// ── Card ──────────────────────────────────────────────────────────────────────
const BlogCard = ({ post }) => {
  const cc = CATEGORY_COLORS[post.categoryColor] || CATEGORY_COLORS.blue;
  return (
    <Link
      to={`/blogs/${post.id}`}
      className="group flex-shrink-0 w-80 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${cc.bg} ${cc.text}`}>
          {post.category}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// ── Carousel ──────────────────────────────────────────────────────────────────
const VISIBLE = 3; // cards visible at once on desktop

const BlogsPage = () => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(320 + 24); // 320px card + 24px gap
  const [apiPosts, setApiPosts] = useState([]);

  // Fetch dynamic blogs from backend; combine with static ones
  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then((r) => r.json())
      .then((data) => setApiPosts((data.blogs || []).map(normalizeApiPost)))
      .catch(() => {});
  }, []);

  // Merge: DB posts (featured first) then static posts
  const allPosts = [...apiPosts, ...BLOG_POSTS];

  const maxIndex = Math.max(0, allPosts.length - VISIBLE);

  useEffect(() => {
    const update = () => {
      if (trackRef.current) {
        const card = trackRef.current.querySelector('a');
        if (card) setCardWidth(card.offsetWidth + 24);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Featured post: first explicitly featured, otherwise first post
  const featured = allPosts.find((p) => p.is_featured) || allPosts[0];
  const rest = allPosts.filter((p) => p.id !== featured?.id);
  const restMax = Math.max(0, rest.length - VISIBLE);
  const [restIndex, setRestIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page Header ──────────────────────────────────────── */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Tag className="h-4 w-4" /> Blog & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Accessibility Knowledge Hub
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Expert guides, compliance updates, and development tips to keep your website accessible and inclusive.
            </p>
          </div>

          {/* ── Featured Post ────────────────────────────────────── */}
          <Link
            to={`/blogs/${featured.id}`}
            className="group block rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white mb-14 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className={`self-start px-3 py-1 text-xs font-semibold rounded-full mb-4 ${CATEGORY_COLORS[featured.categoryColor]?.bg} ${CATEGORY_COLORS[featured.categoryColor]?.text}`}>
                  {featured.category}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />{featured.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />{featured.readTime}
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* ── Carousel Section ─────────────────────────────────── */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRestIndex((i) => Math.max(0, i - 1))}
                disabled={restIndex === 0}
                className="p-2 rounded-full border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => setRestIndex((i) => Math.min(restMax, i + 1))}
                disabled={restIndex >= restMax}
                className="p-2 rounded-full border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Carousel track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${restIndex * cardWidth}px)` }}
            >
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: restMax + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setRestIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === restIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* ── All Topics ───────────────────────────────────────── */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Topic</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {['Compliance', 'Legal', 'Development', 'Design', 'Business'].map((topic) => {
                const colorKey = { Compliance: 'blue', Legal: 'red', Development: 'green', Design: 'purple', Business: 'orange' }[topic];
                const cc = CATEGORY_COLORS[colorKey];
                const count = allPosts.filter((p) => p.category === topic).length;
                return (
                  <div key={topic} className={`rounded-2xl p-5 text-center border ${cc.bg} border-transparent`}>
                    <div className={`text-2xl font-bold ${cc.text}`}>{count}</div>
                    <div className={`text-sm font-medium mt-1 ${cc.text}`}>{topic}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogsPage;
