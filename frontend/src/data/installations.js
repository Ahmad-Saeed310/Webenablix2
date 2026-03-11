// Installation guide data for all platforms

const SNIPPET = `<!-- Webenablix Accessibility Widget -->
<script>
  (function(w,d,s,l){
    w._webenablix = l;
    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s);
    j.async=true;
    j.src='https://cdn.webenablix.com/widget.js?key='+l;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','YOUR_API_KEY');
</script>`;

const WP_SNIPPET = `// functions.php
function add_webenablix_widget() { ?>
  <script>
    (function(w,d,s,l){
      w._webenablix=l;
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
      j.async=true;
      j.src='https://cdn.webenablix.com/widget.js?key='+l;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','YOUR_API_KEY');
  </script>
<?php }
add_action('wp_footer','add_webenablix_widget');`;

const GTM_JSON = `{
  "type": "Custom HTML Tag",
  "name": "Webenablix Widget",
  "html": "<script src=\\"https://cdn.webenablix.com/widget.js?key=YOUR_API_KEY\\" async></script>",
  "firingTriggerId": ["All Pages"]
}`;

export const installationsData = {
  embed: {
    slug: "embed",
    name: "Embed",
    tagline: "Add Webenablix to any website in 2 minutes",
    description:
      "The universal embed method works on every website regardless of the technology stack. Paste one script tag into your HTML and Webenablix is live.",
    gradient: "from-[#1e3a8a] to-[#2563EB]",
    accentBg: "bg-[#2563EB]",
    accentText: "text-[#2563EB]",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: "Code",
    difficulty: "Easy",
    time: "2 min",
    steps: [
      {
        title: "Get your API key",
        description:
          "Log in to your Webenablix dashboard and navigate to Settings → API Keys. Copy your unique site key.",
        code: null,
      },
      {
        title: "Paste the script before </body>",
        description:
          "Open your HTML file (or template) and paste the following snippet just before the closing </body> tag. Replace YOUR_API_KEY with the key from step 1.",
        code: SNIPPET,
      },
      {
        title: "Verify the widget loads",
        description:
          "Save and refresh your page. You should see the Webenablix accessibility icon in the bottom-right corner. Click it to confirm the widget opens correctly.",
        code: null,
      },
      {
        title: "Customise widget position & branding",
        description:
          "Head back to your Webenablix dashboard → Customise to change the widget position, colour, and language to match your brand.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Does the script slow down my page?",
        a: "No — the script tag uses the async attribute, so it loads completely independently of your page content and has zero impact on your Core Web Vitals.",
      },
      {
        q: "Can I place the script in the <head>?",
        a: "Yes, but we recommend placing it before </body> to ensure the DOM is ready when the widget initialises.",
      },
      {
        q: "Does it work on multi-page and single-page apps?",
        a: "Yes. The widget auto-initialises on page load and re-initialises on route changes in SPA frameworks like React and Vue.",
      },
      {
        q: "How do I get my API key?",
        a: "Sign up or log in at app.webenablix.com, go to Settings → Sites, and copy the key for your site.",
      },
    ],
    tips: [
      "Place the script as close to </body> as possible for fastest initialisation.",
      "One API key can cover multiple domains in your plan.",
      "Use the dashboard to preview widget changes before they go live.",
    ],
  },

  wordpress: {
    slug: "wordpress",
    name: "WordPress",
    tagline: "Install Webenablix on WordPress in 3 clicks",
    description:
      "Install via our official WordPress plugin from the plugin directory — no coding required — or add the snippet manually via your theme's functions.php.",
    gradient: "from-[#1d4ed8] via-[#2374AB] to-[#21759B]",
    accentBg: "bg-[#21759B]",
    accentText: "text-[#21759B]",
    badgeColor: "bg-sky-100 text-sky-700",
    icon: "wordpress",
    difficulty: "Easy",
    time: "3 min",
    steps: [
      {
        title: "Install the Webenablix plugin",
        description:
          'In your WordPress admin, go to Plugins → Add New. Search for "Webenablix" and click Install Now, then Activate.',
        code: null,
      },
      {
        title: "Enter your API key",
        description:
          "Navigate to Settings → Webenablix in the admin sidebar. Paste your API key (found in your Webenablix dashboard) and click Save.",
        code: null,
      },
      {
        title: "Verify the widget",
        description:
          "Visit your website's front end. The accessibility icon should appear in the corner. If not, clear your caching plugin cache.",
        code: null,
      },
      {
        title: "Alternative: manual functions.php method",
        description:
          "If you prefer not to use a plugin, paste the snippet below into your active theme's functions.php or a site-specific plugin.",
        code: WP_SNIPPET,
      },
    ],
    faqs: [
      {
        q: "Does it work with page builders like Elementor and Divi?",
        a: "Yes — Webenablix is completely independent of your page builder and works alongside any WordPress theme or builder.",
      },
      {
        q: "Will it conflict with other accessibility plugins?",
        a: "Webenablix is designed to run alongside other tools. However, to avoid duplicate widget UI, disable any other accessibility overlay plugins.",
      },
      {
        q: "Does it work with WordPress multisite?",
        a: "Yes. Install the plugin network-wide or on individual sites, each with their own API key.",
      },
      {
        q: "I use a caching plugin — what should I do?",
        a: "After activating the plugin, clear your caching plugin's cache (e.g. WP Rocket, W3 Total Cache). The widget will then appear on the cached pages.",
      },
    ],
    tips: [
      "Always use the plugin method for the easiest updates.",
      "If using WP Rocket, add the Webenablix CDN domain to your excluded scripts list.",
      "Test with your caching plugin disabled first to confirm the widget works.",
    ],
  },

  custom: {
    slug: "custom",
    name: "Custom",
    tagline: "Full control for custom-built websites",
    description:
      "For bespoke CMS platforms, headless builds, server-rendered applications, or any stack not covered by a dedicated integration — use our universal script with optional advanced configuration.",
    gradient: "from-[#1e293b] to-[#334155]",
    accentBg: "bg-slate-700",
    accentText: "text-slate-700",
    badgeColor: "bg-slate-100 text-slate-700",
    icon: "Settings",
    difficulty: "Medium",
    time: "5–10 min",
    steps: [
      {
        title: "Identify your base template",
        description:
          "Find the layout file that wraps every page on your site (e.g. base.html, layout.erb, _layout.hbs, App.jsx). The script needs to appear on every page, so the global layout is the right place.",
        code: null,
      },
      {
        title: "Paste the script tag",
        description:
          "Add the embed snippet inside the global layout, just before </body>. Replace YOUR_API_KEY with the key from your Webenablix dashboard.",
        code: SNIPPET,
      },
      {
        title: "Handle Content Security Policy (CSP)",
        description:
          "If your site uses a Content Security Policy header, whitelist Webenablix's CDN domain so the script is permitted to load.",
        code: `# Nginx / Apache CSP header addition
Content-Security-Policy: script-src 'self' https://cdn.webenablix.com;
                         style-src  'self' https://cdn.webenablix.com;`,
      },
      {
        title: "Configure advanced options (optional)",
        description:
          "Pass a configuration object to the initialiser to set the widget position, language, or disable specific features programmatically.",
        code: `<script>
  window._webenablixConfig = {
    position: 'bottom-left',   // 'bottom-right' (default) | 'bottom-left'
    language: 'auto',           // ISO code or 'auto'
    hideAfterInit: false,       // true to keep widget hidden until triggered
  };
</script>
${SNIPPET}`,
      },
      {
        title: "Verify & test",
        description:
          "Deploy the change and open your site in a browser. The accessibility icon should appear. Use a screen reader and keyboard-only navigation to confirm the widget opens and closes correctly.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Can I load the script server-side to avoid layout shift?",
        a: "Yes — add the script to your server-rendered <head> with the defer attribute for the best loading behaviour without affecting Core Web Vitals.",
      },
      {
        q: "Does it work in a headless / JAMstack setup?",
        a: "Yes. Add the script to your CDN-served HTML shell or your framework's _document.jsx / app.html file.",
      },
      {
        q: "My site is behind authentication — will the widget still load?",
        a: "Yes. The widget script is served from our CDN, not your server. As long as the page HTML includes the script tag, the widget loads.",
      },
      {
        q: "Can I lazy-load the widget?",
        a: "Yes — use our JavaScript API to initialise the widget on demand: window.Webenablix?.init().",
      },
    ],
    tips: [
      "For the best performance, add the script to a global CDN edge function or your build pipeline's HTML injection step.",
      "Use the window._webenablixConfig object for programmatic control.",
      "Test CSP headers on a staging environment before deploying.",
    ],
  },

  wix: {
    slug: "wix",
    name: "Wix",
    tagline: "Add Webenablix to your Wix site without code",
    description:
      "Integrate Webenablix with Wix using the Custom Code injection feature available on paid Wix plans. No coding experience needed.",
    gradient: "from-[#0c0c0c] via-[#1a1a1a] to-[#333]",
    accentBg: "bg-gray-900",
    accentText: "text-gray-900",
    badgeColor: "bg-gray-100 text-gray-700",
    icon: "Wix",
    difficulty: "Easy",
    time: "3 min",
    steps: [
      {
        title: "Open your Wix dashboard",
        description:
          "Log in to Wix and go to your site's dashboard. Click Settings in the left sidebar.",
        code: null,
      },
      {
        title: "Navigate to Custom Code",
        description:
          "In Settings, scroll down to Advanced and click Custom Code. Then click + Add Custom Code.",
        code: null,
      },
      {
        title: "Paste the Webenablix script",
        description:
          'Paste the embed snippet into the code input. Set the placement to "Body — end" and apply it to "All pages". Replace YOUR_API_KEY with your Webenablix key.',
        code: SNIPPET,
      },
      {
        title: "Save and publish",
        description:
          "Click Apply, then publish your site. Visit the live URL and confirm the accessibility widget appears in the corner.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Does Custom Code require a paid Wix plan?",
        a: "Yes — Custom Code injection is available on Wix Premium (Connect Domain plan or higher).",
      },
      {
        q: "Will it work on Wix Editor X / Studio?",
        a: "Yes. Wix Studio also supports Custom Code injection via Site Settings → Custom Code.",
      },
      {
        q: "My widget isn't appearing — what should I do?",
        a: 'Confirm you published the site after adding the code (Wix preview mode does not execute third-party scripts). Also check that the script is set to "All pages".',
      },
      {
        q: "Can I use Velo / Wix Dev Mode instead?",
        a: "Yes — in Wix Dev Mode you can add the script in the site-level masterPage.js file or the global header/footer code.",
      },
    ],
    tips: [
      "Always publish your site after adding code — preview mode won't show the widget.",
      'Set the code to "All pages" so every visitor benefits from the widget.',
      "Clear your browser cache after publishing if the widget doesn't appear immediately.",
    ],
  },

  webflow: {
    slug: "webflow",
    name: "Webflow",
    tagline: "Embed Webenablix in Webflow in minutes",
    description:
      "Use Webflow's Project Settings custom code area to add the Webenablix widget globally across your entire Webflow site.",
    gradient: "from-[#146EF5] to-[#0055CC]",
    accentBg: "bg-[#146EF5]",
    accentText: "text-[#146EF5]",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: "WF",
    difficulty: "Easy",
    time: "3 min",
    steps: [
      {
        title: "Open Project Settings",
        description:
          "In the Webflow Designer, click the W logo (top-left) → Project Settings, or go to the Dashboard → select your project → Settings.",
        code: null,
      },
      {
        title: "Go to the Custom Code tab",
        description:
          'Click the Custom Code tab in Project Settings. You\'ll see a "Footer Code" section — this is where global scripts belong.',
        code: null,
      },
      {
        title: "Paste the script into Footer Code",
        description:
          "Paste the Webenablix embed snippet into the Footer Code field. Replace YOUR_API_KEY with the key from your Webenablix dashboard.",
        code: SNIPPET,
      },
      {
        title: "Save and Publish",
        description:
          "Click Save Changes. Then publish your Webflow site to your subdomain or custom domain. The widget will appear on every published page.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Does it work on pages with per-page custom code too?",
        a: "Yes — Project-level footer code runs on all pages in addition to any per-page custom code you've added.",
      },
      {
        q: "I'm on the Free Webflow plan — will this work?",
        a: "Custom code injection requires a Webflow paid plan (Basic or higher). Free plan sites don't support third-party script injection.",
      },
      {
        q: "Does it work with Webflow's CMS pages?",
        a: "Yes — project-level footer code runs on CMS collection pages, static pages, and e-commerce pages.",
      },
      {
        q: "The widget isn't appearing in the Designer preview — is that normal?",
        a: "Yes — Webflow's Designer and Preview modes don't execute external scripts. Publish to your domain to see the widget.",
      },
    ],
    tips: [
      "Project-level footer code is the best place — it ensures the widget loads on every page type including CMS pages.",
      "After publishing, test with a private browser window to avoid cached versions.",
    ],
  },

  shopify: {
    slug: "shopify",
    name: "Shopify",
    tagline: "Make your Shopify store accessible to every shopper",
    description:
      "Add Webenablix to your Shopify store via our native app from the Shopify App Store, or manually via theme.liquid — no developer required.",
    gradient: "from-[#004c3f] via-[#008060] to-[#00a654]",
    accentBg: "bg-[#008060]",
    accentText: "text-[#008060]",
    badgeColor: "bg-green-100 text-green-700",
    icon: "Shopify",
    difficulty: "Easy",
    time: "3 min",
    steps: [
      {
        title: "Install via the Shopify App Store (recommended)",
        description:
          'Visit the Shopify App Store, search for "Webenablix", and click Add app. Approve the required permissions and you\'re done — the widget installs automatically.',
        code: null,
      },
      {
        title: "Alternative: manual theme.liquid method",
        description:
          "In your Shopify admin go to Online Store → Themes → Actions → Edit code. Open layout/theme.liquid and paste the snippet just before the closing </body> tag.",
        code: SNIPPET,
      },
      {
        title: "Enter your API key (manual method)",
        description:
          "Replace YOUR_API_KEY in the snippet with the key from your Webenablix dashboard. Save the file.",
        code: null,
      },
      {
        title: "Preview and verify",
        description:
          "Open your storefront. The accessibility widget should appear on every page — including product pages, collection pages, cart, and checkout.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Will the widget show on the Shopify checkout?",
        a: "The native checkout is hosted by Shopify and requires Shopify Plus to inject custom scripts. On standard plans the widget covers all storefront pages except native checkout.",
      },
      {
        q: "What happens when I update my theme?",
        a: "If you used the manual method, re-check theme.liquid after a theme update. The App Store method is theme-independent and survives updates.",
      },
      {
        q: "Does it work with Shopify Markets / multi-language?",
        a: "Yes — Webenablix auto-detects the browser language and serves the widget in the visitor's language.",
      },
      {
        q: "Is the app free?",
        a: "The app itself is free to install. Your Webenablix subscription plan determines the features and pages monitored.",
      },
    ],
    tips: [
      "Use the App Store method — it survives theme updates and requires no code changes.",
      "If your store uses a custom checkout, ask about our Shopify Plus checkout script injection option.",
    ],
  },

  hubspot: {
    slug: "hubspot",
    name: "HubSpot",
    tagline: "Add Webenablix to your HubSpot website",
    description:
      "HubSpot CMS allows custom scripts in site-wide code snippets. Add Webenablix in minutes through the Design Manager or Website Settings.",
    gradient: "from-[#FF5C35] via-[#e8490f] to-[#c93e0d]",
    accentBg: "bg-[#e8490f]",
    accentText: "text-[#e8490f]",
    badgeColor: "bg-orange-100 text-orange-700",
    icon: "HS",
    difficulty: "Easy",
    time: "4 min",
    steps: [
      {
        title: "Go to Website Settings → Pages",
        description:
          "In your HubSpot portal, click the Settings icon (⚙) → Website → Pages. Scroll to the Site Footer HTML section.",
        code: null,
      },
      {
        title: "Paste the script in Site Footer HTML",
        description:
          'In the "Site Footer HTML" input, paste the Webenablix embed snippet. This adds the script to every page on your HubSpot site.',
        code: SNIPPET,
      },
      {
        title: "Save and preview",
        description:
          "Click Save. Open any published HubSpot page and confirm the accessibility widget appears.",
        code: null,
      },
      {
        title: "Alternative: Design Manager method",
        description:
          "For finer control, open Design Manager, edit your active template's base layout, and add the script before the closing </body> tag.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Does it work on HubSpot landing pages?",
        a: "Yes — the Site Footer HTML method applies to all HubSpot page types: website pages, landing pages, and blog posts.",
      },
      {
        q: "Will it conflict with HubSpot's built-in accessibility tools?",
        a: "HubSpot's built-in tools are basic. Webenablix extends them significantly and does not conflict.",
      },
      {
        q: "Does it work with HubSpots blog?",
        a: "Yes — Site Footer HTML is applied globally including blog listing and post pages.",
      },
      {
        q: "I'm on HubSpot Starter — can I use this?",
        a: "Yes — the Site Footer HTML setting is available on all paid HubSpot CMS tiers including Starter.",
      },
    ],
    tips: [
      "The Site Footer HTML method is the quickest — no code knowledge needed.",
      "After saving, use HubSpot's preview mode and also check the live published site.",
    ],
  },

  gtm: {
    slug: "gtm",
    name: "Google Tag Manager",
    tagline: "Deploy Webenablix via GTM — no developer needed",
    description:
      "Use Google Tag Manager to add Webenablix to any website you manage through GTM — without touching the site's source code.",
    gradient: "from-[#1a73e8] via-[#1558b0] to-[#0f3d80]",
    accentBg: "bg-[#1a73e8]",
    accentText: "text-[#1a73e8]",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: "GTM",
    difficulty: "Easy",
    time: "5 min",
    steps: [
      {
        title: "Create a new Tag",
        description:
          'In GTM, open your container and click Tags → New. Name it "Webenablix Widget".',
        code: null,
      },
      {
        title: "Choose Custom HTML tag type",
        description:
          "Under Tag Configuration, click the tag type and choose Custom HTML from the list.",
        code: null,
      },
      {
        title: "Paste the HTML snippet",
        description:
          "In the HTML field, paste the full Webenablix embed script. Replace YOUR_API_KEY with your key from the Webenablix dashboard.",
        code: SNIPPET,
      },
      {
        title: 'Set the Trigger to "All Pages"',
        description:
          'Under Triggering, click + and choose the built-in "All Pages" trigger. This ensures the widget loads on every page view.',
        code: null,
      },
      {
        title: "Save, Submit, and Publish",
        description:
          "Click Save on the tag, then click Submit in the top-right corner to publish your container version. The widget is now live.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Can I restrict the widget to specific pages?",
        a: 'Yes — instead of the "All Pages" trigger, create a custom Page Path trigger to include or exclude specific URLs.',
      },
      {
        q: "Will GTM's async loading affect the widget?",
        a: 'GTM loads asynchronously; the widget will appear slightly after page load. Set the tag to fire on "DOM Ready" rather than "Page View" for the fastest initialisation.',
      },
      {
        q: "What if my site has a Content Security Policy?",
        a: "Add https://cdn.webenablix.com to your CSP script-src directive. If GTM itself is blocked, whitelist https://www.googletagmanager.com too.",
      },
      {
        q: "Can I use GTM to pass the API key dynamically?",
        a: "Yes — store your API key as a GTM Constant Variable and reference it as {{Webenablix API Key}} in the HTML tag.",
      },
    ],
    tips: [
      'Set the tag to fire on "DOM Ready" for best performance.',
      "Use a Constant Variable to manage your API key centrally across multiple tags.",
      "Test in GTM Preview mode before publishing to production.",
    ],
  },

  bigcommerce: {
    slug: "bigcommerce",
    name: "BigCommerce",
    tagline: "Accessible storefronts on BigCommerce",
    description:
      "Add Webenablix to your BigCommerce store in minutes using the Script Manager — no theme editing required.",
    gradient: "from-[#003087] via-[#034da2] to-[#0564c8]",
    accentBg: "bg-[#034da2]",
    accentText: "text-[#034da2]",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: "BC",
    difficulty: "Easy",
    time: "3 min",
    steps: [
      {
        title: "Open Script Manager",
        description:
          "In your BigCommerce control panel go to Storefront → Script Manager. Click + Create a Script.",
        code: null,
      },
      {
        title: "Configure the script settings",
        description:
          'Name the script "Webenablix Widget". Set Location to "Footer", set Pages to "All Pages", and set Script Category to "Functional".',
        code: null,
      },
      {
        title: "Paste the script content",
        description:
          "In the Script Contents area, paste the Webenablix embed snippet. Replace YOUR_API_KEY with your key from the Webenablix dashboard.",
        code: SNIPPET,
      },
      {
        title: "Save and verify",
        description:
          "Click Save. Visit your storefront and confirm the accessibility widget appears. Test it on a product page, cart, and category page.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Does Script Manager work on all BigCommerce themes?",
        a: "Yes — Script Manager is theme-independent. The widget will continue to work even after a theme change.",
      },
      {
        q: "Will the widget appear on the checkout page?",
        a: 'BigCommerce\'s optimised one-page checkout allows scripts via Script Manager with category set to "Functional".',
      },
      {
        q: "I get a CSP error in the console — what should I do?",
        a: "Contact BigCommerce support to add https://cdn.webenablix.com to your store's Content Security Policy allowlist.",
      },
      {
        q: "Can I use the manual theme files method instead?",
        a: "Yes — edit templates/layout/base.html in your theme and add the script before </body>. However Script Manager is recommended as it survives theme updates.",
      },
    ],
    tips: [
      "Script Manager survives theme updates — always prefer it over manual template edits.",
      'Set category to "Functional" to ensure the script loads on all page types including checkout.',
    ],
  },

  squarespace: {
    slug: "squarespace",
    name: "Squarespace",
    tagline: "Add Webenablix to your Squarespace site",
    description:
      "Squarespace supports global custom code injection via its Code Injection settings — available on Business plans and above.",
    gradient: "from-[#1a1a1a] via-[#222] to-[#333]",
    accentBg: "bg-gray-800",
    accentText: "text-gray-800",
    badgeColor: "bg-gray-100 text-gray-700",
    icon: "SS",
    difficulty: "Easy",
    time: "3 min",
    steps: [
      {
        title: "Go to Website → Pages → Website Tools",
        description:
          "Log in to Squarespace. Click the Pages panel (□ icon) → scroll to the bottom → Website Tools → Code Injection.",
        code: null,
      },
      {
        title: "Paste into the Footer field",
        description:
          "In the Code Injection panel, find the Footer text area. Paste the Webenablix script here. Replace YOUR_API_KEY with your key.",
        code: SNIPPET,
      },
      {
        title: "Save",
        description:
          "Click Save. The script is now live on every page of your Squarespace site.",
        code: null,
      },
      {
        title: "Verify on the live site",
        description:
          "Open your site in a new tab (not the Squarespace editor preview). The accessibility widget should appear in the corner.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Which Squarespace plan do I need?",
        a: "Code Injection requires a Business plan or higher. It is not available on Personal plans.",
      },
      {
        q: "The widget doesn't appear in the editor preview — is that normal?",
        a: "Yes — Squarespace's editor does not execute third-party scripts. You must view the published site to see the widget.",
      },
      {
        q: "Will it work on Squarespace 7.0 and 7.1?",
        a: "Yes — Code Injection is available on both Squarespace 7.0 and 7.1.",
      },
      {
        q: "Can I add it per-page instead of globally?",
        a: "Yes — go to a specific page's Settings → Advanced → Page Header Code Injection to add it to a single page only.",
      },
    ],
    tips: [
      "Always check the live URL, not the Squarespace editor, to confirm the widget works.",
      "The Footer injection runs after page content — ideal for the Webenablix widget.",
    ],
  },

  gohighlevel: {
    slug: "gohighlevel",
    name: "Go High Level",
    tagline: "Add Webenablix to your GoHighLevel funnels & sites",
    description:
      "GoHighLevel supports custom script injection at the funnel, website, and page level. Add Webenablix globally in minutes from the Settings panel.",
    gradient: "from-[#0f172a] via-[#1e3a5f] to-[#2563EB]",
    accentBg: "bg-[#2563EB]",
    accentText: "text-[#2563EB]",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: "GHL",
    difficulty: "Easy",
    time: "4 min",
    steps: [
      {
        title: "Open your Sub-Account Settings",
        description:
          "In GoHighLevel, select your sub-account, then click Settings (gear icon) in the left sidebar.",
        code: null,
      },
      {
        title: "Go to Custom Code / Tracking Code",
        description:
          'Scroll to the "Tracking Code" or "Custom Code" section. You\'ll see a "Header" and "Footer" script area.',
        code: null,
      },
      {
        title: "Paste the script in the Footer area",
        description:
          "Paste the Webenablix embed snippet into the Footer code area. Replace YOUR_API_KEY with your key from the Webenablix dashboard. This applies to all GHL-hosted pages and funnels.",
        code: SNIPPET,
      },
      {
        title: "Alternative: per-funnel injection",
        description:
          "To add the widget to a specific funnel only, open the funnel in the Funnel Builder → Settings → Tracking Code → paste in the Footer field.",
        code: null,
      },
      {
        title: "Publish and verify",
        description:
          "Save your settings and open any GHL-hosted page or funnel in a browser. The accessibility widget should appear in the corner.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "Does it work on GHL's website builder and funnels?",
        a: "Yes — both the website builder and funnel builder support footer script injection.",
      },
      {
        q: "Will it show on GHL membership sites?",
        a: "Membership portal pages may require separate code injection — add the script in the membership site's custom code settings.",
      },
      {
        q: "Does it work in the GHL mobile app preview?",
        a: "No — in-app previews don't execute third-party scripts. View the published link in a browser to confirm the widget loads.",
      },
      {
        q: "Can I add it for all my client sub-accounts at once?",
        a: "For agency-level injection across all sub-accounts, use the Agency-level Tracking Code settings if available in your plan.",
      },
    ],
    tips: [
      "Use the sub-account settings for the broadest coverage across all pages and funnels.",
      "Test using the published funnel/page URL, not the GHL internal preview.",
    ],
  },

  manage: {
    slug: "manage",
    name: "Manage Installations",
    tagline: "See, control, and monitor all your Webenablix installations",
    description:
      "The Installations Manager lets you add new sites, rotate API keys, configure per-site widget settings, and view the compliance status of every property from one dashboard.",
    gradient: "from-[#1e3a8a] to-[#2563EB]",
    accentBg: "bg-[#2563EB]",
    accentText: "text-[#2563EB]",
    badgeColor: "bg-blue-100 text-blue-700",
    icon: "Folder",
    difficulty: "N/A",
    time: null,
    steps: [
      {
        title: "Log in to your dashboard",
        description:
          "Go to app.webenablix.com and sign in. From the main menu, click Installations.",
        code: null,
      },
      {
        title: "Add a new site",
        description:
          "Click + Add Site. Enter the domain name and assign it to a plan. Your unique API key for that domain will be generated automatically.",
        code: null,
      },
      {
        title: "Configure per-site settings",
        description:
          "Click any site in the list to open its settings. Adjust widget position, colour, language, and enabled features independently for each property.",
        code: null,
      },
      {
        title: "Rotate or regenerate API keys",
        description:
          "To rotate a key, open the site → API Key tab → click Regenerate. The old key stops working immediately — update your embed snippet.",
        code: null,
      },
      {
        title: "Monitor compliance status",
        description:
          "Each row in the installations list shows a live compliance score badge. Click View Report to see the full Accessibility Monitor report for that site.",
        code: null,
      },
    ],
    faqs: [
      {
        q: "How many sites can I manage?",
        a: "The number of sites depends on your plan. Essential plans cover 1–5 sites; Professional and Enterprise plans allow unlimited sites.",
      },
      {
        q: "Can I transfer a site to another account?",
        a: "Yes — open the site settings → Danger Zone → Transfer Site, and enter the email of the receiving account.",
      },
      {
        q: "What happens to the widget if I delete a site?",
        a: "Deleting a site immediately invalidates the API key, and the widget stops loading on that domain — no page-level code change needed.",
      },
      {
        q: "Can team members access the installations manager?",
        a: "Yes — invite team members via Settings → Team and assign them Admin or Viewer roles on specific sites.",
      },
    ],
    tips: [
      "Use clear naming conventions (e.g. domain + environment) when adding sites to keep large portfolios organised.",
      "Set up compliance score alerts in the monitor tab so you're notified of regressions.",
    ],
  },
};

export const installationList = Object.values(installationsData);
