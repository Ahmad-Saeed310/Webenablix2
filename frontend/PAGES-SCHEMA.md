# Frontend Pages Schema Documentation

Complete schema and structure reference for all 20 pages in the Webenablix frontend application.

---

## 1. AboutPage.jsx

**Path:** `src/pages/AboutPage.jsx`

### Exports
- Default export: `AboutPage` component

### Imports
- React, Router (Link, useNavigate)
- Lucide Icons: Award, Zap, Target, Users, Globe, TrendingUp, ArrowRight
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const AboutPage = () => {
  // No state
  // Direct render of about page
}
```

### Key Sections
1. **Hero Section** - Blue gradient background with tagline
2. **Stats Grid** - 4 stat cards (Team, Years, Projects, Clients)
3. **Values Section** - Array of 4 company values with icons
4. **Mission Statement** - Key mission and vision
5. **CTA Section** - Call-to-action buttons

### Data Structures
```javascript
const stats = [
  { value: '50+', label: 'Team Members' },
  // ... 3 more
]

const values = [
  { icon: Award, title: 'Excellence', description: '...' },
  // ... 3 more
]
```

### Navigation
- Links to: /register, /contact, /dashboard
- Uses: useNavigate hook

### UI/Icons
- Header, Footer components
- Award, Zap, Target, Users, Globe, TrendingUp icons
- Button component

---

## 2. AccessibilityMonitorPage.jsx

**Path:** `src/pages/AccessibilityMonitorPage.jsx`

### Exports
- Default export: `AccessibilityMonitorPage` component

### Imports
- React hooks: useState
- Icons: BarChart3, Bell, BellRing, Check, ChevronDown, Clock, Download, etc.
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const AccessibilityMonitorPage = () => {
  const [expandedIssue, setExpandedIssue] = useState(null);
  // Mock dashboard preview
}
```

### State Management
- `expandedIssue` - Track expanded issue details

### Key Sections
1. **Hero Section** - Gradient background with feature description
2. **Dashboard Preview** - Mock data showing issues and monitoring
3. **Features Grid** - Key accessibility monitor features
4. **Integration Section** - How monitoring works
5. **CTA Section** - Get started buttons

### Data Structures
```javascript
const severityColors = {
  critical: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  serious, moderate, minor
}

const mockIssues = [
  { id, type, page, severity, wcag, status },
  // ...
]
```

### Navigation
- Links to: /dashboard, /register, /docs
- Uses: useNavigate hook

---

## 3. AdminPage.jsx

**Path:** `src/pages/AdminPage.jsx`

### Exports
- Default export: `AdminPage` component

### Imports
- React hooks: useState, useEffect, useCallback
- Router: useNavigate
- Icons: Shield, Users, BarChart2, Globe, LogOut, Trash2, etc.
- Constants: API_URL from VITE_BACKEND_URL

### Component Structure
```jsx
const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
}
```

### State Management
- `isLoggedIn` - Admin authentication state
- `sites` - List of monitored websites
- `stats` - Global statistics
- `filter` - Search/filter term
- `page` - Pagination state

### Key Features
- Admin login gate with username/password
- Displays global statistics (sites, audits, issues)
- Paginated site list with search
- Delete site functionality
- View details and audit results

### API Calls
- POST `/api/admin/login` - Admin authentication
- GET `/api/admin/stats` - Global statistics
- GET `/api/admin/sites` - List of sites with pagination
- DELETE `/api/admin/sites/:id` - Delete site

### Sub-components
- `AdminLoginGate` - Login form
- `StatCard` - Statistics display
- `PlanBadge` - Plan type badge
- `ScorePill` - Score display

### Helper Functions
```javascript
adminHeaders() - Returns auth headers with Bearer token
```

---

## 4. AgencyPage.jsx

**Path:** `src/pages/AgencyPage.jsx`

### Exports
- Default export: `AgencyPage` component

### Imports
- React: useState
- Router hooks: useNavigate
- Lucide Icons: ArrowRight, Award, BarChart3, Briefcase, etc.
- UI Components: Button, Header, Footer
- Icon constants from lucide-react

### Component Structure
```jsx
const AgencyPage = () => {
  const navigate = useNavigate();
  // Static content about agency partnerships
}
```

### Key Sections
1. **Hero Section** - Agency partnership overview
2. **Partner Tiers** - 4 tier cards (Certified, Silver, Gold, Elite)
3. **Requirements & Benefits** - Commission and perks per tier
4. **Success Stories** - Case studies from partner agencies
5. **FAQ Section** - Common partner questions
6. **CTA Section** - Join now button

### Data Structures
```javascript
const partnerTiers = [
  {
    name: 'Certified Partner',
    icon: BadgeCheck,
    color: 'border-gray-200',
    requirement: 'Refer 5+ clients / year',
    revenue: '20% recurring commission',
    perks: [...]
  },
  // ... Silver, Gold, Elite
]
```

### Navigation
- Links to: /contact, /register
- Uses: useNavigate hook

### UI Components
- Button, Header, Footer
- Multiple tier cards with color theming
- Feature lists with Check icons

---

## 5. AuditPage.jsx

**Path:** `src/pages/AuditPage.jsx`

### Exports
- Default export: `AuditPage` component

### Imports
- React hooks
- Router: useNavigate
- Lucide Icons: ArrowRight, Check, Search, BarChart3, FileText, etc.
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const AuditPage = () => {
  const navigate = useNavigate();
  // Audit services overview
}
```

### Key Sections
1. **Hero Section** - Audit services overview with buttons
2. **Audit Types** - 3 service levels (Automated, Expert, Enterprise)
3. **What We Audit** - Checklist of audit areas
4. **Audit Reports** - Sample report showcase
5. **Pricing** - Service tiers and pricing
6. **CTA Section** - Request audit button

### Data Structures
- 3 audit service cards with features and pricing
- Audit areas checklist
- Report sample sections

### Navigation
- Links to: /register, /docs, /products/checker, /about
- Uses: useNavigate hook

---

## 6. AuthPage.jsx

**Path:** `src/pages/AuthPage.jsx`

### Exports
- Default export: `AuthPage` component

### Imports
- React hooks: useState, useEffect
- Router: useNavigate, Link
- Google OAuth: GoogleLogin
- UI Components: Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Button
- Icons: Shield, Mail, Lock, User, Building, ArrowRight, CheckCircle
- Header, Footer components

### Component Structure
```jsx
const AuthPage = () => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', company: ''
  });
}
```

### State Management
- `tab` - Toggle between login/register forms
- `loading` - Form submission state
- `error` - Error message display
- `formData` - Form input values

### Key Features
- Email/password authentication
- Google OAuth integration
- User registration with name and company
- Auto-redirect to dashboard if already logged in
- Token storage in localStorage

### API Calls
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration
- POST `/api/auth/google` - Google OAuth flow

### Form Handling
```javascript
handleChange() - Update formData on input
handleSubmit() - Submit login/register
handleGoogleSuccess() - Process Google credential
```

### Storage
- `webenablix_token` - JWT authentication token
- `webenablix_user` - User object (JSON)

---

## 7. BlogPostPage.jsx

**Path:** `src/pages/BlogPostPage.jsx`

### Exports
- Default export: `BlogPostPage` component
- Helper: `renderContent()` - Markdown renderer

### Imports
- React hooks: useState, useEffect, useRef, useCallback
- Router: useParams, useNavigate, Link
- Icons: ArrowLeft, Clock, Calendar, User, Tag, ChevronRight, BookOpen
- Components: Header, Footer
- BlogsPage: BLOG_POSTS, normalizeApiPost

### Component Structure
```jsx
const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
}
```

### State Management
- `post` - Current blog post data
- `relatedPosts` - Posts in same category
- `loading` - API loading state

### Key Features
- Fetch blog post by slug from API or local data
- Render markdown content with custom parser
- Display related posts
- Author and metadata info
- Share functionality

### Data Structures
```javascript
post = {
  id, slug, title, excerpt, category, categoryColor,
  readTime, date, author, authorRole, image,
  content (markdown)
}
```

### Custom Renderer
`renderContent()` supports:
- Markdown headings (## ###)
- Code blocks (```)
- Tables (|)
- Bold (**), code (`)
- Lists and paragraphs

### API Integration
- GET `{API_URL}/api/blog/{slug}` - Fetch post
- Fallback to BLOG_POSTS array

---

## 8. BlogsPage.jsx

**Path:** `src/pages/BlogsPage.jsx`

### Exports
- Default export: `BlogsPage` component
- Helpers: `normalizeApiPost()`, `BLOG_POSTS` array

### Imports
- React hooks: useState, useRef, useEffect
- Router: Link
- Icons: ChevronLeft, ChevronRight, Clock, Calendar, Tag, ArrowRight
- Components: Header, Footer
- Constants: VITE_BACKEND_URL

### Component Structure
```jsx
const BlogsPage = () => {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
}
```

### State Management
- `posts` - All blog posts from API or defaults
- `filteredPosts` - Posts after filtering/search
- `selectedCategory` - Current category filter
- `searchTerm` - Search input value

### Key Features
- Display blog posts in grid
- Category filtering
- Search functionality
- Featured posts carousel
- Read time display
- Link to individual posts

### Data Structures
```javascript
BLOG_POSTS = [
  {
    id, slug, title, excerpt, category, categoryColor,
    readTime, date, author, authorRole, image,
    metaTitle, metaDescription, content
  }
]

// 8 sample blog posts included
```

### Helper Functions
```javascript
normalizeApiPost(b) - Convert DB row to post shape
```

### API Integration
- GET `{API_URL}/api/blog/posts` - Fetch all posts (with fallback)

---

## 9. ComparePage.jsx

**Path:** `src/pages/ComparePage.jsx`

### Exports
- Default export: `ComparePage` component

### Imports
- React hooks: useState
- Router: Link, useNavigate
- Lucide Icons: ArrowRight, Check, X, Minus, Star, Shield, etc.
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const ComparePage = () => {
  // Static comparison table
}
```

### Key Sections
1. **Hero Section** - Comparison overview
2. **Comparison Table** - Feature matrix vs competitors
3. **Detailed Comparison** - Deep-dive feature comparison
4. **Pricing Section** - Cost comparison
5. **CTA Section** - Choose Webenablix button

### Data Structures
```javascript
competitors = ['Webenablix', 'accessiBe', 'AudioEye', 'UserWay']

brandColors = {
  Webenablix: { bg, text, light, border },
  // ... others in gray
}

// 30+ comparison features organized by category
// Values: 'yes', 'no', 'partial', or text
```

### Comparison Categories
- Scanning & Detection
- Features & Capabilities
- Pricing & ROI
- Support & Service
- Industry Reputation

---

## 10. DashboardPage.jsx

**Path:** `src/pages/DashboardPage.jsx`

### Exports
- Default export: `DashboardPage` component

### Imports
- React hooks: useState, useEffect, useCallback
- Router: useNavigate
- Icons: Plus, Card, ArrowRight, BarChart3, AlertTriangle, Eye, CheckCircle, etc.
- UI Components: Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Button, Label
- Constants: VITE_BACKEND_URL

### Component Structure
```jsx
const DashboardPage = () => {
  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState({ total: 0, fixed: 0, average_score: 0 });
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddingNewSite, setIsAddingNewSite] = useState(false);
}
```

### State Management
- `sites` - User's monitored websites
- `stats` - Dashboard statistics
- `newSiteUrl` - New site input
- `loading` - Data loading state
- `isAddingNewSite` - Add site form visibility

### Key Features
- Display monitored websites
- Dashboard statistics (total sites, issues fixed, avg score)
- Add new website to monitor
- View website details and audit results
- Delete website functionality
- Authentication required

### API Calls
- GET `/api/sites` - Fetch user's sites
- GET `/api/stats` - Fetch dashboard stats
- POST `/api/sites` - Add new site
- GET `/api/sites/:id` - Get site details
- DELETE `/api/sites/:id` - Delete site

### Sub-components
- `SiteCard` - Individual site display
- `StatCard` - Statistics display

### Headers
```javascript
function headers() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('webenablix_token')}`
  }
}
```

### Storage
- Reads `webenablix_token` from localStorage

---

## 11. DocsPage.jsx

**Path:** `src/pages/DocsPage.jsx`

### Exports
- Default export: `DocsPage` component
- Sub-components: CodeBlock, Badge

### Imports
- React hooks: useState
- Icons: ArrowRight, BookOpen, Check, ChevronDown, Code, Copy, CheckCircle2, etc.
- UI Components: Button, Header, Footer
- Utilities: Copy to clipboard functionality

### Component Structure
```jsx
const DocsPage = () => {
  const [expandedSection, setExpandedSection] = useState(0);
  const [expandedCode, setExpandedCode] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
}
```

### State Management
- `expandedSection` - Active sidebar section
- `expandedCode` - Expanded code block
- `copiedIndex` - Copied code block index

### Key Sections
1. **Getting Started** - Introduction, Quick Start, Installation
2. **Widget Documentation** - Usage and configuration
3. **Widget Features** - Feature descriptions
4. **Customization** - Styling and customization options
5. **API Reference** - API endpoints documentation
6. **Troubleshooting** - Common issues and solutions
7. **FAQs** - Frequently asked questions

### Data Structures
```javascript
const sidebarSections = [
  {
    title: 'Getting Started',
    icon: Play,
    items: ['Introduction', 'Quick Start', 'Installation', 'Core Concepts']
  },
  // ... more sections
]
```

### Sub-components
- `CodeBlock` - Code display with copy button
- `Badge` - Color-coded feature badges
- `Tabs` - Tabbed content navigation

---

## 12. FreeCheckerPage.jsx

**Path:** `src/pages/FreeCheckerPage.jsx`

### Exports
- Default export: `FreeCheckerPage` component
- Sub-component: `ScoreBadge`

### Imports
- React hooks: useState
- Router: useNavigate
- Icons: ArrowRight, Search, Loader2, CheckCircle, XCircle, AlertTriangle, Shield, etc.
- UI Components: Button, Input, Header, Footer
- External: axios

### Component Structure
```jsx
const FreeCheckerPage = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [error, setError] = useState(null);
}
```

### State Management
- `websiteUrl` - URL input value
- `loading` - API request state
- `auditResult` - Audit results object
- `error` - Error message

### Key Features
- Free WCAG/ADA compliance scanner
- Real-time URL validation and normalization
- Displays accessibility score and issues
- Downloadable report
- Error handling with user-friendly messages

### API Calls
- POST `/api/audit` - Submit URL for audit
  - Payload: `{ url, audit_type: 'full' }`
  - Returns: Audit result with scores and issues

### Error Handling
```javascript
- Invalid URL format -> normalization (prepend https://)
- Network errors -> 'Cannot connect to server' message
- Timeout errors -> 'Request timed out' message
- Server errors -> Display error detail
```

### Sub-components
- `ScoreBadge` - Color-coded score display (0-100)
  - Red: < 60, Yellow: 60-79, Green: 80+

---

## 13. IndustriesPage.jsx

**Path:** `src/pages/IndustriesPage.jsx`

### Exports
- Default export: `IndustriesPage` component

### Imports
- React hooks
- Router: Link, useNavigate
- Icons: ArrowRight, Building, Landmark, GraduationCap, ShoppingCart, Code, HeartPulse, etc.
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const IndustriesPage = () => {
  const navigate = useNavigate();
  // Static industry showcase
}
```

### Key Sections
1. **Hero Section** - Industries overview
2. **Industry Grid** - 11 industry cards
3. **Stats Section** - Key metrics
4. **CTA Section** - Get industry solution

### Data Structures
```javascript
const industries = [
  {
    to: '/industries/government', icon: Building,
    title: 'Government', desc: 'Make government websites...'
  },
  // 10 more industries:
  // Banking, Academic, Retail, IT, HealthCare,
  // Automotive, Real Estate, NGO/NPO, Media, Law Enforcement
]
```

### Navigation
- Links to: `/industries/{industry}` detail pages
- Uses: useNavigate hook

---

## 14. IndustryDetailPage.jsx

**Path:** `src/pages/IndustryDetailPage.jsx`

### Exports
- Default export: `IndustryDetailPage` component
- Sub-components: RegCard, ChallengeCard, SolutionCard

### Imports
- React hooks: useParams
- External: jsPDF for PDF export
- Icons: ArrowRight, Download, Check, CheckCircle2, Shield, ShieldCheck, etc.
- UI Components: Button, Header, Footer
- Data: industriesData

### Component Structure
```jsx
const IndustryDetailPage = () => {
  const { industry } = useParams();
  const data = industriesData[industry];
  // PDF generation and detailed industry info
}
```

### Key Features
- Industry-specific compliance information
- Regulations overview
- Challenges unique to industry
- Solutions provided
- PDF guide download
- Statistics and case studies

### Data Structure
```javascript
industriesData[industry] = {
  name, icon, hero_description,
  regulations: [{ name, desc }],
  challenges: [{ title, desc }],
  solutions: [{ title, desc, accentBg }],
  // ... more fields
}
```

### PDF Generation
- Uses jsPDF to generate downloadable guide
- Includes: Title, description, regulations, challenges, solutions
- Formatted with proper styling and pagination

### Sub-components
- `RegCard` - Regulation display with badge
- `ChallengeCard` - Challenge with alert icon
- `SolutionCard` - Solution with number badge

---

## 15. InstallationDetailPage.jsx

**Path:** `src/pages/InstallationDetailPage.jsx`

### Exports
- Default export: `InstallationDetailPage` component
- Sub-components: CodeBlock, StepCard, FaqItem

### Imports
- React hooks: useState, useParams
- Icons: ArrowRight, Check, CheckCircle2, ChevronDown, Code, Copy, etc.
- UI Components: Button, Header, Footer
- Data: installationsData

### Component Structure
```jsx
const InstallationDetailPage = () => {
  const { platform } = useParams();
  const [expandedFaq, setExpandedFaq] = useState(null);
  // Step-by-step installation guide
}
```

### State Management
- `expandedFaq` - Currently expanded FAQ item

### Key Sections
1. **Hero Section** - Platform-specific installation overview
2. **Requirements** - Prerequisites
3. **Step-by-step Guide** - Installation steps with code blocks
4. **FAQ Section** - Platform-specific FAQs
5. **Support CTA** - Contact support

### Data Structure
```javascript
installationsData[platform] = {
  name, description, icon,
  requirements: [{ title, items }],
  steps: [{ title, description, code }],
  faqs: [{ q, a }]
}
```

### Sub-components
- `CodeBlock` - Code display with copy button
- `StepCard` - Installation step with visual indicator
- `FaqItem` - Expandable FAQ with chevron animation

---

## 16. InstallationsPage.jsx

**Path:** `src/pages/InstallationsPage.jsx`

### Exports
- Default export: `InstallationsPage` component

### Imports
- React hooks
- Router: Link
- Icons: ArrowRight, Code, Settings, Tag, ShoppingBag, Rocket, Folder
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const InstallationsPage = () => {
  // Static platform listing
}
```

### Key Sections
1. **Hero Section** - Installation guides overview
2. **Quick Start Section** - Quick start buttons
3. **Platform Grid** - 12 platform cards
4. **Support Section** - Contact support CTA

### Data Structures
```javascript
const platforms = [
  { to: '/installation/embed', icon: Code, title: 'Embed', desc: '...' },
  // 11 more platforms:
  // WordPress, Custom, Wix, Shopify, Squarespace,
  // HubSpot, GTM, Webflow, BigCommerce, GoHighLevel, Manage
]
```

### Platforms Supported
- Embed (custom code)
- WordPress
- Wix
- Shopify
- Squarespace
- HubSpot
- Google Tag Manager (GTM)
- Webflow
- BigCommerce
- Go High Level
- Manage (admin panel)

---

## 17. ManagedAccessibilityPage.jsx

**Path:** `src/pages/ManagedAccessibilityPage.jsx`

### Exports
- Default export: `ManagedAccessibilityPage` component
- Sub-components: FeatureCard, PlanCard

### Imports
- React hooks: useState
- Router: useNavigate
- Icons: ArrowRight, Award, BarChart3, Bell, BookOpen, Check, CheckCircle2, etc.
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const ManagedAccessibilityPage = () => {
  const navigate = useNavigate();
  // Managed accessibility service overview
}
```

### Key Sections
1. **Hero Section** - Managed service overview
2. **Benefits Grid** - Key benefits with icons
3. **Services Included** - What's included in service
4. **Pricing Plans** - Plan options with features
5. **ROI Section** - Return on investment metrics
6. **CTA Section** - Get started button

### Data Structures
```javascript
const plans = [
  {
    name, badge, price, period, description,
    features: [{ icon, title, desc }],
    highlighted: boolean
  }
]

const services = [
  { icon: Icon, iconBg: 'color', title, description },
  // ... multiple services
]
```

### Features Included
- Ongoing monitoring
- Monthly reports
- Expert recommendations
- Priority support
- Compliance documentation
- Legal protection

---

## 18. PricingPage.jsx

**Path:** `src/pages/PricingPage.jsx`

### Exports
- Default export: `PricingPage` component

### Imports
- React hooks: useState
- Router: useNavigate
- Icons: ArrowRight, Check, X, Star, Shield, Zap, BarChart3, HeadphonesIcon, Globe, BookOpen, Gavel
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // or 'annual'
  const navigate = useNavigate();
}
```

### State Management
- `billingCycle` - Monthly vs Annual toggle

### Key Sections
1. **Hero Section** - Pricing overview
2. **Billing Toggle** - Switch between monthly/annual
3. **Pricing Cards** - 4 plan tiers
4. **Features Comparison** - Detailed feature table
5. **FAQ Section** - Pricing FAQs
6. **CTA Section** - Get started

### Data Structures
```javascript
const plans = [
  {
    name, description, price_monthly, price_annual,
    icon, color, features: [{ label, included }],
    cta_text, cta_link
  }
]

const comparisonFeatures = [
  { category, items: [{ feature, platforms }] }
]
```

### Plan Tiers
1. **Free** - Basic scanner access
2. **Starter** - Small business automation
3. **Professional** - Growing team features
4. **Enterprise** - Full feature set + support

---

## 19. ProductsPage.jsx

**Path:** `src/pages/ProductsPage.jsx`

### Exports
- Default export: `ProductsPage` component

### Imports
- React hooks
- Router: Link
- Icons: ArrowRight, Zap, Eye, Globe, BarChart3, Users, Shield, Code, CheckCircle
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const ProductsPage = () => {
  const navigate = useNavigate();
  // Product showcase
}
```

### Key Sections
1. **Hero Section** - Products overview
2. **Main Products Grid** - 4 core products
3. **Add-ons Section** - Optional features
4. **Use Cases** - Real-world applications
5. **Testimonials** - Customer feedback
6. **CTA Section** - Get started

### Data Structures
```javascript
const products = [
  {
    icon: Icon, title, description,
    features: [{ label, desc }],
    cta, link
  }
]

const addOns = [
  { icon, title, description, price }
]
```

### Products
1. **Free Checker** - URL scanner
2. **Widget** - Accessibility solution
3. **Managed Service** - Full management
4. **Enterprise** - Custom solutions

---

## 20. WidgetPage.jsx

**Path:** `src/pages/WidgetPage.jsx`

### Exports
- Default export: `WidgetPage` component
- Sub-components: WidgetToggle, WidgetDemo, ProfileCard

### Imports
- React hooks: useState
- Router: useNavigate
- Icons: ArrowRight, Check, Eye, Keyboard, Palette, Brain, Zap, EyeOff, Focus, Globe, BarChart3, Settings, Type, MousePointer, Volume2, Languages, ChevronLeft, ChevronRight, Accessibility, Users, DollarSign, Shield
- UI Components: Button, Header, Footer

### Component Structure
```jsx
const WidgetPage = () => {
  const [currentLang, setCurrentLang] = useState(0);
  const navigate = useNavigate();
  // Widget showcase and features
}
```

### State Management
- `currentLang` - Current language in carousel (0-26)
- Navigation for language selection

### Key Sections
1. **Hero Section** - Widget overview with demo
2. **Features Grid** - Key widget features
3. **Languages Section** - 27+ language support carousel
4. **User Profiles** - Different user personas
5. **Implementation Section** - How to add widget
6. **Pricing** - Widget pricing
7. **CTA Section** - Install now button

### Data Structures
```javascript
const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch',
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Turkish',
  'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Greek', 'Czech',
  'Hungarian', 'Romanian', 'Bulgarian', 'Croatian', 'Hebrew'
  // 27 total
]

const features = {
  highlightTitle, highlightLink, dyslexiaFont,
  letterSpacing, lineHeight, fontWeight,
  hideImage, textAlignment
}
```

### Sub-components
- `WidgetToggle` - Feature toggle control
- `WidgetDemo` - Interactive widget preview
- `ProfileCard` - User archetype cards

### Key Features
- **Accessibility Features:**
  - Highlight titles and links
  - Dyslexia-friendly font
  - Adjustable letter spacing
  - Adjustable line height
  - Font weight adjustment
  - Hide images option
  - Text alignment options
  
- **Language Support:** 27+ languages
- **Customization:** Logo, colors, position
- **Analytics:** Track user interactions

---

## Summary

### Frontend Technology Stack
- **Framework:** React 18+ with React Router v6+
- **Styling:** Tailwind CSS
- **Icons:** Lucide React (40+ icons used)
- **HTTP:** Axios
- **UI Components:** Custom Button, Card, Input, Label
- **PDF Export:** jsPDF
- **Authentication:** JWT tokens via localStorage
- **External APIs:** Google OAuth

### Common Patterns
- Header/Footer wrapper on all pages
- useNavigate for programmatic navigation
- State management with useState
- API calls with axios or fetch
- Error handling with try/catch
- Environment variables via VITE_BACKEND_URL

### Authentication Flow
- Store JWT token in `webenablix_token` localStorage
- Store user object in `webenablix_user` localStorage
- Dispatch `webenablix-auth` event on login/logout
- Check token on app load to auto-redirect

### Data Sources
1. **Local Data Files:**
   - `src/data/industries.js` - Industry information
   - `src/data/installations.js` - Installation guides
   - `src/data/navigation.js` - Navigation menu data

2. **API Endpoints:**
   - Auth: `/api/auth/*`
   - Audit: `/api/audit`
   - Dashboard: `/api/sites`, `/api/stats`
   - Admin: `/api/admin/*`
   - Blog: `/api/blog/*`

---
