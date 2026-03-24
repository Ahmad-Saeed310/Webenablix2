# HomePage Schema Documentation

Complete structure and functionality reference for the Webenablix landing page (HomePage).

---

## Overview

**File:** `src/App.jsx` (HomePage component)

**Purpose:** Primary landing page showcasing Webenablix's accessibility solutions with multiple call-to-actions and feature sections.

**Sections in Order:**

1. HeroSection
2. FeaturesSection
3. AuditSection
4. WhyAccessibilitySection
5. WidgetSection
6. UnifiedSectionNav
7. FaqSection
8. TrustedBySection

---

## 1. HeroSection

**File:** `src/components/HeroSection.jsx`

### Component Structure

```jsx
const HeroSection = ({ onScanRequest }) => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  // ...
};
```

### Props JSON Schema

```json
{
  "type": "object",
  "properties": {
    "onScanRequest": {
      "type": "function",
      "description": "Callback fired when user submits URL scan form",
      "parameters": {
        "url": {
          "type": "string",
          "description": "Normalized URL (e.g., https://example.com)"
        }
      }
    }
  },
  "required": ["onScanRequest"]
}
```

### State JSON Schema

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "URL input value"
    }
  }
}
```

### Props

- `onScanRequest` (function): Callback fired when user submits URL scan form
  - Receives normalized URL string (e.g., "https://example.com")

### State

- `url` (string): URL input value

### Key Features

**Hero Content:**

- Gradient blue background (from-[#3B82F6] to-[#60a5fa])
- Main headline: "Ultimate Web Accessibility Compliance Tool"
- Subheadline with navigation guidance

**Interactive Elements:**

1. **Primary CTA Button** - "Enable Accessibility Today"
   - Links to: `/products/checker`
   - White background with blue text
   - Navigates user to free checker tool

2. **URL Scan Form**
   - Input: Website URL with placeholder "Enter your website URL…"
   - Submit button: "Analyze Free"
   - Auto-prefixes URLs with `https://` if missing
   - On submit: Scrolls page to audit-section with smooth scroll
   - Triggers `onScanRequest` callback with normalized URL

### Decorative Elements

- 4 animated glassmorphism cards (white/10 opacity with blur)
- Positioned absolutely in corners for visual interest
- Rotate and scale with CSS transforms

### Info Cards (3 columns)

```
┌─────────────────────────────────┐
│ Check Compliance (with Shield)  │
│ Your site meets WCAG            │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Accessibility Score (Check)     │
│ 90%                             │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Lawsuit Risk (with Shield)      │
│ Safe against legal violation    │
└─────────────────────────────────┘
```

### Styling

- Uses Tailwind CSS with responsive typography
- Mobile: text-4xl, Tablet: text-5xl, Desktop: text-6xl
- White/90 opacity text on blue gradient
- Glassmorphic card elements (white/95 backdrop)

---

## 2. FeaturesSection

**File:** `src/components/FeaturesSection.jsx`

### Component Structure

```jsx
const FeaturesSection = () => {
  // Static 3-column grid layout
};

const FeatureCard = ({ iconType, title, description, point1, point2 }) => {
  // Individual feature card
};
```

### Section Header

- Label: "THE WEBENABLIX WAY" (blue, uppercase, small)
- Title: "Make Your Website with Webenablix" (with line break)
- Description: "Turn accessibility from a legal burden into a business advantage..."

### Data Structure - 3 Features

```javascript
[
  {
    iconType: "accessibility",
    title: "Inclusive Design",
    description: "Everyone can use and enjoy your site...",
    point1: "Create accessible designs for vision-impaired users",
    point2: "Support screen readers, focus outlines, and WAI-ARIA...",
  },
  {
    iconType: "globe",
    title: "Global Compliance",
    description: "Meet ADA, WCAG and other regional standards...",
    point1: "Automated audits to surface WCAG issues...",
    point2: "Evidence & documentation to produce compliance statements...",
  },
  {
    iconType: "users",
    title: "User Satisfaction",
    description: "Improve usability, increase engagement...",
    point1: "Better engagement and lower bounce rates...",
    point2: "Tap the 15% large-spending access of users with disabilities...",
  },
];
```

### FeatureCard Props JSON Schema

```json
{
  "type": "object",
  "properties": {
    "iconType": {
      "type": "string",
      "enum": ["accessibility", "globe", "users"],
      "description": "Icon type to display"
    },
    "title": {
      "type": "string",
      "description": "Feature title"
    },
    "description": {
      "type": "string",
      "description": "Feature description"
    },
    "point1": {
      "type": "string",
      "description": "First bullet point"
    },
    "point2": {
      "type": "string",
      "description": "Second bullet point"
    }
  },
  "required": ["iconType", "title", "description", "point1", "point2"]
}
```

### Features Data JSON Schema

````json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "iconType": {
        " JSON Schema
```json
{
  "type": "object",
  "properties": {
    "externalUrl": {
      "type": "string",
      "description": "URL passed from HeroSection's onScanRequest callback"
    }
  }
}
````

### State JSON Schema

```json
{
  "type": "object",
  "properties": {
    "websiteUrl": {
      "type": "string",
      "description": "Form URL input"
    },
    "loading": {
      "type": "boolean",
      "description": "API request in progress"
    },
    "auditResult": {
      "type": "object",
      "description": "Full audit response from backend"
    },
    "error": {
      "type": ["string", "null"],
      "description": "Error message"
    },
    "showWebenablixView": {
      "type": "boolean",
      "description": "Toggle between Baseline/Webenablix views"
    },
    "expandedCategory": {
      "type": ["string", "null"],
      "description": "Currently open category in expandable sections"
    }
  }
}
```

### Propstype": "string",

        "enum": ["accessibility", "globe", "users"]
      },
      "title": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "point1": {
        "type": "string"
      },
      "point2": {
        "type": "string"
      }
    }

},Audit Result JSON Schema

```json
{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "Website URL scanned"
    },
    "accessibility_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "seo_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "performance_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "security_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "resources_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "images_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "network_caching_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "code_quality_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "overall_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "lawsuit_risk": {
      "type": "string",
      "enum": ["low", "medium", "high"]
    },
    "wcag_level": {
      "type": "string",
      "enum": ["AA", "AAA"]
    },
    "critical_issues": {
      "type": "number",
      "minimum": 0
    },
    "warnings": {
      "type": "number",
      "minimum": 0
    },
    "total_issues": {
      "type": "number",
      "minimum": 0
    },
    "mobile_friendliness": {
      "type": "object",
      "properties": {
        "is_mobile_friendly": { "type": "boolean" },
        "viewport_configured": { "type": "boolean" },
        "text_readable": { "type": "boolean" },
        "tap_targets_sized": { "type": "boolean" },
        "content_wider_than_screen": { "type": "boolean" }
      }
    },
    "security": {
      "type": "object",
      "properties": {
        "has_https": { "type": "boolean" },
        "has_hsts": { "type": "boolean" },
        "has_csp": { "type": "boolean" },
        "mixed_content": { "type": "boolean" }
      }
    },
    "top_recommendations": {
      "type": "array",
      "items": { "type": "string" }
    },
    "accessibility_issues": {
      "type": "array",
      "items": { "type": "object" }
    },
    "seo_issues": {
      "type": "array",
      "items": { "type": "object" }
    }
  },
  "required": [
    "url",
    "accessibility_score",
    "seo_score",
    "performance_score",
    "overall_score",
    "lawsuit_risk",
    "wcag_level"
  ]
}
```

###

"minItems": 3,
"maxItems": 3
}

````

### FeatureCard Sub-component
**Props:**
- `iconType` (string): 'accessibility' | 'globe' | 'users'
- `title` (string): Feature title
- `description` (string): Feature description
- `point1` (string): First bullet point
- `point2` (string): Second bullet point

**Rendering:**
- Icon display with background circle (blue-50)
- Title and description
- 2-point checklist with blue check badges
- White card with blue border on hover
- Responsive grid: 1 column mobile, 3 columns desktop

### Styling
- Background: gray-50
- Card bg: white, shadow on hover
- Icons: blue (#2563EB)
- Check marks: white text on blue circular background

---

## 3. AuditSection

**File:** `src/components/AuditSection.jsx`

### Component Structure
```jsx
const AuditSection = ({ externalUrl }) => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [error, setError] = useState(null);
  const [showWebenablixView, setShowWebenablixView] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
}
````

### Props

- `externalUrl` (string): URL passed from HeroSection's onScanRequest callback
  - Auto-populates form and triggers audit when changed

### State Management

- `websiteUrl` (string): Form URL input
- `loading` (boolean): API request in progress
- `auditResult` (object): Full audit response from backend
- `error` (string): Error message
- `showWebenablixView` (boolean): Toggle between Baseline/Webenablix views
- `expandedCategory` (string): Currently open category in expandable sections

### Key Features

**1. URL Input Form**

- Text input for website URL
- "Scan Now" button
- Auto-trigger when externalUrl prop changes
- URL normalization (https:// prefix)

**2. Results Display - Dual View**

**Baseline View:**

- Shows "Before Webenablix" scores
- Display 8 categories:
  - Accessibility Score
  - SEO Score
  - Performance Score
  - Security Score
  - Resources Score
  - Images Score
  - Network Caching Score
  - Code Quality Score
- Color-coded badges (red <60, yellow 60-79, green 80+)

**Webenablix View:**

- Shows "After Webenablix" scores with delta badges
- Same 8 categories with projected improvements
- Green +X improvement badges

**3. Core Web Vitals Section**

- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)
- Status badges per metric

**4. Expandable Categories**
Categories that expand to show details:

- Security details (HTTPS, HSTS, CSP status)
- Mobile friendliness (viewport, text readability, tap targets)
- Top recommendations (8-10 items)

**5. Featured Metrics**

- Lawsuit Risk (low/medium/high)
- WCAG Compliance Level (AA/AAA)
- Overall Score (0-100)

### API Integration

- **Endpoint:** POST `/api/audit`
- **Payload:** `{ url: string, audit_type: 'full' }`
- **Response:** Detailed audit result object

### Data Structures

**Audit Result Object:**

```javascript
{
  url: string,
  accessibility_score: number,
  seo_score: number,
  performance_score: number,
  security_score: number,
  resources_score: number,
  images_score: number,
  network_caching_score: number,
  code_quality_score: number,
  overall_score: number,
  lawsuit_risk: 'low' | 'medium' | 'high',
  wcag_level: 'AA' | 'AAA',
  critical_issues: number,
  warnings: number,
  total_issues: number,
  mobile_friendliness: { is_mobile_friendly, ... },
  security: { has_https, has_csp, has_hsts, ... },
  top_recommendations: string[],
  // ... detailed issue arrays per category
}
```

### Error Handling

- Invalid URLs: Displays error message
- Network errors: Shows connection error
- Backend errors: Displays server error detail
- Timeout: Shows request timeout message

### UI Components

- ScoreBadge (displays numeric score with color coding)
- StatusBadge (displays status: good, needs-improvement, etc.)
- Expandable sections with ChevronDown icons

---

## 4. WhyAccessibilitySection

**File:** `src/components/WhyAccessibilitySection.jsx`

### Component Props JSON Schema

```json
{
  "type": "object",
  "properties": {}
}
```

### Content Items JSON Schema

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "icon": {
        "type": "string",
        "enum": ["Heart", "Check"],
        "description": "Icon name from lucide-react"
      },
      "title": {
        "type": "string",
        "description": "Item title"
      },
      "description": {
        "type": "string",
        "description": "Item description text"
      }
    },
    "required": ["icon", "title", "description"]
  },
  "minItems": 2,
  "maxItems": 2
}
```

### Component Structure

```jsx
const WhyAccessibilitySection = () => {
  const navigate = useNavigate();
  // Static content with navigation
};
```

### Layout

- **Left Column:** Text content with CTA button
- **Right Column:** 2 information items

### Content Structure

**Left Side:**

- Label: "WHY ACCESSIBILITY?" (blue, uppercase)
- Heading: "Web accessibility is the right thing to do and good for business"
- CTA Button: "TRY WEBENABLIX NOW" with arrow icon
  - Links to: `/products/checker`
  - Blue background with hover effect

**Right Side - 2 Cards:**

1. **Inclusivity for everyone** (with Heart icon in blue circle)
   - Description: Make your website accessible to all users...

2. **Comply with legislation** (with Check icon in blue circle)
   - Description: Meet ADA, WCAG 2.1 and Section 508 requirements...

### Styling

- White background
- 2-column grid (1 column mobile, 2 desktop)
- Blue accent color for icons and button
- Heart and Check icons in blue-100 backgrounds

---

## 5. WidgetSection

**File:** `src/components/WidgetSection.jsx`

### Component Props JSON Schema

```json
{
  "type": "object",
  "properties": {}
}
```

### Widget Features JSON Schema

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "icon": {
        "type": "object",
        "description": "Lucide React icon component"
      },
      "label": {
        "type": "string",
        "enum": ["Larger Text", "Highlight Links", "Contrast+", "Video Spacing"]
      }
    },
    "required": ["icon", "label"]
  },
  "minItems": 4,
  "maxItems": 4
}
```

### Widget Demo Toggles JSON Schema

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "icon": {
        "type": "object",
        "description": "Lucide React icon component"
      },
      "label": {
        "type": "string",
        "description": "Toggle label"
      },
      "active": {
        "type": "boolean",
        "description": "Whether toggle is enabled"
      }
    },
    "required": ["icon", "label", "active"]
  },
  "minItems": 5,
  "maxItems": 5
}
```

### Component Structure

```jsx
const WidgetSection = () => {
  const widgetFeatures = [
    { icon: <Type className="w-6 h-6" />, label: "Larger Text" },
    { icon: <Link2 className="w-6 h-6" />, label: "Highlight Links" },
    { icon: <Contrast className="w-6 h-6" />, label: "Contrast+" },
    { icon: <PlayCircle className="w-6 h-6" />, label: "Video Spacing" },
  ];
};
```

### Section Header

- Label: "OUR WIDGET FEATURES" (blue, uppercase)
- Heading: "Your **Widget** for instant compliance" (Widget in blue)

### Layout - 2 Columns

```
LEFT: Description + 4 Feature Cards
RIGHT: Widget Demo Preview
```

### Left Column

**Description:**

- Title: "Web accessibility at your fingertips"
- Text: "Our accessibility widget automatically adapts your website..."

**4 Feature Cards Grid:**

```
┌─────────────────────┐  ┌─────────────────────┐
│ Type Icon Larger Text│  │ Link2 Icon HL Links │
└─────────────────────┘  └─────────────────────┘
┌─────────────────────┐  ┌─────────────────────┐
│ Contrast+ Contrast  │  │ Video Spacing       │
└─────────────────────┘  └─────────────────────┘
```

Features with icons:

- Type: Larger Text
- Link2: Highlight Links
- Contrast: Contrast+
- PlayCircle: Video Spacing
- Keyboard: Keyboard Nav
- Eye: Screen Reader

### Right Column - Widget Demo

**Mock Widget UI:**

- Header: Accessibility icon with toggle label
- 5 Feature Toggles:
  1. Larger Text (enabled - blue)
  2. Highlight Links (disabled - gray)
  3. High Contrast (disabled - gray)
  4. Keyboard Nav (disabled - gray)
  5. Screen Reader (disabled - gray)

Each toggle shows:

- Icon
- Label
- Toggle switch (styled as rounded pill)

**Styling:**

- White card with rounded corners
- Shadow effect with blue glow backdrop
- Responsive: Full width mobile, constrained width desktop

### Styling

- Background: gray-50
- Cards: white with blue border on hover
- Icons: blue color (#2563EB)
- Demo widget: white with shadow and blue glow

---

## 6. UnifiedSectionNav

**File:** `src/components/UnifiedSectionNav.jsx`

### Component Structure

```jsx
const UnifiedSectionNav = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);
  const wrapperRef = useRef(null);
  // Scroll detection and rendering
};
```

### State Management

- `activeSection` (number): Index of currently visible section (0-3)
- `sectionRefs` (array): DOM references to section elements for scroll detection

### Key Features

**Scroll Detection:**

- Window scroll event listener (passive: true)
- Calculates which section is in viewport
- Trigger point: window height / 3
- Updates activeSection based on scroll position

**Layout Pattern:**

- Full viewport height sections (min-h-screen)
- 50/50 split (w-1/2) left and right
- Left side sticky (sticky top-0) with 2-column layout
- Right side scrolls naturally
- **Alternating layout:** Sections 1,3 flip left/right via flex-row-reverse

### Color Theme

- **All left sides:** White background with gray text
- **All right sides:** Light blue gradient (blue-50 to white)
- **Accent:** Blue (#2563EB) for buttons and icons

### 4 Sections

#### Section 1: Products

- **Title:** Products We Offer
- **Description:** Comprehensive solutions for accessibility compliance
- **Full Description:** Discover our suite of powerful accessibility products...
- **CTA:** "Explore Products" → `/products`
- **Items:** 5 products (from productsMenu data)
  - Each with icon, name, description

#### Section 2: Industries

- **Title:** Industries We Serve
- **Description:** Tailored solutions for every sector and vertical
- **Full Description:** Accessibility is critical across all industries...
- **CTA:** "View All Industries" → `/industries`
- **Items:** 5 industries (from industriesMenu data)
  - Building, Landmark, GraduationCap icons, etc.

#### Section 3: Installation

- **Title:** Installation Options
- **Description:** Seamless integration with your favorite platforms
- **Full Description:** Getting started is easy...
- **CTA:** "See Installation Guide" → `/installation`
- **Items:** 5 installation options (from installationsMenu data)
  - Code2, Globe, Wrench icons, etc.

#### Section 4: Resources

- **Title:** More Resources
- **Description:** Everything you need to know about Webenablix
- **Full Description:** Dive deeper into our documentation...
- **CTA:** "Browse Resources" → `/docs`
- **Items:** 5 static items
  - Documentation → `/docs`
  - Pricing → `/pricing`
  - About Us → `/about`
  - Blog → `/blogs`
  - Agency → `/agency`

### Item Card Structure

**Each item card displays:**

- Icon (blue background, darker on hover)
- Name (bold text)
- Description (smaller gray text)
- Optional "NEW" badge (emerald)

**Styling:**

- White card with gray border
- Hover: Blue border with light blue background
- Icon: Blue-100 background, rotates to blue-600 on hover
- Icon text: Blue-600 to white on hover
- Smooth transitions (300ms)

### Styling Details

- Left sticky section: White background, gray text
- Right section: Blue gradient (blue-50 to white)
- Bold hierarchy: 5xl title, lg description, base full text
- Max-width on descriptions (max-w-md)
- Gap spacing: 6 between elements

### Component Props

```json
{
  "type": "object",
  "properties": {},
  "description": "UnifiedSectionNav component has no props - data sourced from navigation.js"
}
```

### Sections Data Schema

```json
{
  "type": "array",
  "minItems": 4,
  "maxItems": 4,
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "number",
        "description": "Unique section identifier (0-3)"
      },
      "title": {
        "type": "string",
        "description": "Main section heading (5xl size)"
      },
      "description": {
        "type": "string",
        "description": "Subtitle description (lg size, gray-600)"
      },
      "fullDescription": {
        "type": "string",
        "description": "Complete section description for left content area"
      },
      "ctaText": {
        "type": "string",
        "description": "Call-to-action button text (e.g., 'Explore Products')"
      },
      "ctaLink": {
        "type": "string",
        "description": "Route path (e.g., '/products', '/industries')"
      },
      "items": {
        "type": "array",
        "minItems": 5,
        "maxItems": 5,
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Item card name/title"
            },
            "href": {
              "type": "string",
              "description": "Navigation link path"
            },
            "icon": {
              "type": "string",
              "description": "Lucide icon name (e.g., 'Code2', 'Building')"
            },
            "description": {
              "type": "string",
              "description": "Item card description (gray-600)"
            },
            "isNew": {
              "type": "boolean",
              "description": "Whether to show 'NEW' badge on card (emerald color)"
            }
          },
          "required": ["name", "href", "icon", "description"],
          "additionalProperties": false
        }
      },
      "getIcon": {
        "type": "object",
        "description": "Function mapping icon names to Lucide components"
      }
    },
    "required": [
      "id",
      "title",
      "description",
      "fullDescription",
      "ctaText",
      "ctaLink",
      "items"
    ],
    "additionalProperties": false
  }
}
```

### Item Card Props

```json
{
  "type": "object",
  "properties": {
    "item": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "href": { "type": "string" },
        "icon": { "type": "string" },
        "description": { "type": "string" },
        "isNew": { "type": "boolean" }
      },
      "required": ["name", "href", "icon", "description"]
    },
    "currentIcon": {
      "type": "object",
      "description": "Lucide React icon component"
    }
  },
  "required": ["item", "currentIcon"]
}
```

### State Schema

```json
{
  "type": "object",
  "properties": {
    "activeSection": {
      "type": "number",
      "minimum": 0,
      "maximum": 3,
      "description": "Index of currently visible section"
    },
    "sectionRefs": {
      "type": "array",
      "description": "DOM references to each section element for scroll detection"
    },
    "wrapperRef": {
      "type": "object",
      "description": "Reference to main wrapper div for scroll offset calculation"
    }
  }
}
```

---

## 7. FaqSection

**File:** `src/components/FaqSection.jsx`

### Component Structure

```jsx
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  // Accordion FAQ items
};

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  // Individual expandable FAQ item
};
```

### State Management

- `openIndex` (number): Index of currently open FAQ (default: 0)
- Only one FAQ can be open at a time

### Data - 6 FAQs

```javascript
[
  {
    question: "What is Webenablix?",
    answer: "AI-powered accessibility platform..." (full text)
  },
  {
    question: "How does Webenablix work?",
    answer: "Uses advanced AI and machine learning..."
  },
  {
    question: "What accessibility standards does Webenablix support?",
    answer: "WCAG 2.1 Level AA, WCAG 2.2, Section 508, EN 301 549..."
  },
  {
    question: "How long does it take to implement Webenablix?",
    answer: "In under 5 minutes by embedding a single line of code..."
  },
  {
    question: "Does Webenablix require coding knowledge to install?",
    answer: "No, designed to be non-technical..."
  },
  {
    question: "Can I customize the accessibility widget?",
    answer: "Yes, fully customizable. Customize colors, size, position..."
  }
]
```

### FaqItem Sub-component

**Props:**

- `question` (string): FAQ question text
- `answer` (string): FAQ answer text
- `isOpen` (boolean): Whether item is currently expanded
- `onClick` (function): Callback when user clicks question

**Features:**

- Clickable header with question text
- Expandable answer content (smooth transition)
- Chevron icon rotates 180° when open
- Border color changes to blue on hover
- Active: Blue border and blue chevron

### Section Structure

**Header:**

- Title: "Frequently Asked Questions" (4xl-5xl)
- Subtitle: "Everything you need to know about Webenablix"

**FAQ List:**

- Space-y-4 (spacing between items)
- Each item is a bordered box
- Accordion-style expand/collapse

**Support Card:**

- Title: "Didn't find your answer?"
- Description: "Our support team is here to help..."
- CTA Button: mailto link to support@webenablix.com
  - Blue background, white text
  - Rounded full (pill shape)

### Styling

- Background: gray-50
- Item border: gray-200, blue on hover
- Item bg: white, gray-50 on open
- Question: lg font-semibold text-gray-900
- Answer: text-gray-600 text-base leading-relaxed
- Chevron: blue (#2563EB), 5 h-5 w-5
- Support card: white background, gray-200 border
- CTA button: Blue (#2563EB) background with hover effect

### Component Props

```json
{
  "type": "object",
  "properties": {},
  "description": "FaqSection has no props - FAQ data is internal"
}
```

### State Schema

```json
{
  "type": "object",
  "properties": {
    "openIndex": {
      "type": "number",
      "minimum": 0,
      "maximum": 5,
      "description": "Index of currently open FAQ item (0 by default)"
    }
  },
  "required": ["openIndex"]
}
```

### FAQ Items Data Schema

```json
{
  "type": "array",
  "minItems": 6,
  "maxItems": 6,
  "items": {
    "type": "object",
    "properties": {
      "question": {
        "type": "string",
        "description": "FAQ question text displayed in header"
      },
      "answer": {
        "type": "string",
        "description": "FAQ answer text displayed when expanded"
      }
    },
    "required": ["question", "answer"],
    "additionalProperties": false
  }
}
```

### FaqItem Props Schema

```json
{
  "type": "object",
  "properties": {
    "question": {
      "type": "string",
      "description": "Question text from FAQ data"
    },
    "answer": {
      "type": "string",
      "description": "Answer text from FAQ data"
    },
    "isOpen": {
      "type": "boolean",
      "description": "Whether this FAQ item is currently expanded"
    },
    "onClick": {
      "type": "function",
      "description": "Callback function called when user clicks the question header"
    }
  },
  "required": ["question", "answer", "isOpen", "onClick"]
}
```

---

## 8. TrustedBySection

**File:** `src/components/TrustedBySection.jsx`

### Component Structure

```jsx
const TrustedBySection = () => {
  const companies = [
    { name: "Salesforce", color: "#00A1E0" },
    { name: "IBM", color: "#1F70C1" },
    { name: "Zendesk", color: "#03363D" },
    { name: "BMW", color: "#0066B1" },
    { name: "British", color: "#EB2226" },
  ];
};
```

### Content

- Label: "Trusted by leading companies worldwide" (centered, gray, uppercase)
- Company display: Flex row with wrapping, gaps

### Company Cards

Display format for each company:

```
[colored dot] Company Name
```

Features:

- Circular color dot (3x3)
- Company name (bold, gray-700)
- Rounded-full pill background (gray-50)
- Padding and spacing for visual balance

### Styling

- Background: white
- Card bg: gray-50
- Dot colors: Brand colors (Salesforce blue, IBM blue, etc.)
- Company name: font-semibold text-gray-700
- Full width, centered, flex wrap

### Component Props

```json
{
  "type": "object",
  "properties": {},
  "description": "TrustedBySection has no props - company data is internal"
}
```

### Companies Data Schema

```json
{
  "type": "array",
  "minItems": 5,
  "maxItems": 5,
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Company name to display (e.g., 'Salesforce', 'IBM')"
      },
      "color": {
        "type": "string",
        "pattern": "^#[0-9A-Fa-f]{6}$",
        "description": "Hex color code for company brand dot indicator"
      }
    },
    "required": ["name", "color"],
    "additionalProperties": false
  }
}
```

### Company Card Props Schema

```json
{
  "type": "object",
  "properties": {
    "company": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "color": { "type": "string" }
      },
      "required": ["name", "color"]
    }
  },
  "required": ["company"]
}
```

---

## HomePage Integration

**File:** `src/App.jsx`

### Component Structure

```jsx
const HomePage = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [heroScanUrl, setHeroScanUrl] = useState('');

  return (
    <div>
      <Header />
      <main>
        <HeroSection onScanRequest={(url) => setHeroScanUrl(...)} />
        <FeaturesSection />
        <AuditSection externalUrl={heroScanUrl} />
        <WhyAccessibilitySection />
        <WidgetSection />
        <UnifiedSectionNav />
        <FaqSection />
        <TrustedBySection />
      </main>
      <Footer />

      {showCookieConsent && <CookieConsent ... />}
      <AccessibilityReportModal ... />
    </div>
  );
}
```

### State Management

- `showCookieConsent` (boolean): Display cookie consent banner
- `showReportModal` (boolean): Display accessibility report modal
- `heroScanUrl` (string): URL from HeroSection passed to AuditSection

### Data Flow

```
HeroSection
  ↓ onScanRequest(url)
  ↓ setHeroScanUrl(url)
  ↓
AuditSection (externalUrl prop)
  ↓ Triggers audit API call
  ↓ Displays results
```

### Modals

- **CookieConsent** - Displayed by default, can be closed
- **AccessibilityReportModal** - Hidden by default, shown on demand

### Styling

- `min-h-screen bg-white` - Full viewport height with white background

---

## Summary Table

| Section  | Type             | Key Props     | Background    | Features                         |
| -------- | ---------------- | ------------- | ------------- | -------------------------------- |
| Hero     | Interactive      | onScanRequest | Blue Gradient | URL scan, Info cards             |
| Features | Static           | None          | Gray-50       | 3 feature cards with benefits    |
| Audit    | Interactive      | externalUrl   | White/Gray    | Real audit results, dual view    |
| Why      | Static           | None          | White         | 2 info cards with benefits       |
| Widget   | Static Demo      | None          | Gray-50       | Feature preview + mock widget    |
| Nav      | Scroll-triggered | None          | White/Blue-50 | 4 alternating sections, 20 items |
| FAQ      | Interactive      | None          | Gray-50       | 6 accordion items + support CTA  |
| Trusted  | Static           | None          | White         | 5 company logos                  |

---

## API Integration

### Endpoints Used

- POST `/api/audit` - AuditSection
  - Payload: `{ url: string, audit_type: 'full' }`
  - Returns: Audit result object

### Navigation Routes

- `/products/checker` - HeroSection, WhyAccessibilitySection buttons
- `/products` - UnifiedSectionNav Products section
- `/industries` - UnifiedSectionNav Industries section
- `/installation` - UnifiedSectionNav Installation section
- `/docs` - UnifiedSectionNav Resources section, FaqSection link
- `/pricing` - UnifiedSectionNav Resources section
- `/about` - UnifiedSectionNav Resources section
- `/blogs` - UnifiedSectionNav Resources section
- `/agency` - UnifiedSectionNav Resources section
- `mailto:support@webenablix.com` - FaqSection contact link

---

## Performance Considerations

1. **Scroll Event Optimization**
   - UnifiedSectionNav uses passive: true listener
   - Updates only when active section changes

2. **Lazy Evaluation**
   - FaqSection only renders open/closed answers
   - Expandable sections render on demand

3. **Image Optimization**
   - Decorative blur elements use CSS
   - No external image loading on initial page

4. **API Caching**
   - AuditSection results cached in component state
   - Prevents duplicate requests for same URL

---

## Accessibility Notes

- Color contrast meets WCAG AA standards
- Button focus states properly styled
- Chevron icons indicate interactive state
- Form inputs have proper labels and placeholders
- Modal dialogs have proper focus management
- Scroll events don't interfere with keyboard navigation

---

## Responsive Design

- **Mobile:** Stack sections vertically, adjust font sizes
- **Tablet:** 2-column layouts, medium spacing
- **Desktop:** Full 2-column layouts, max-width containers
- **Extra Large:** Container max-widths prevent content from spreading

---
