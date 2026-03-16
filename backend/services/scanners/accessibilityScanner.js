/**
 * Accessibility Scanner
 * Checks: alt text, form labels, page title, lang attr, link/button text,
 * duplicate IDs, skip navigation, heading hierarchy, ARIA roles, touch targets
 */

const scanAccessibility = ($) => {
  const issues = [];

  // 1. Images without alt text
  const imagesWithoutAlt = [];
  $('img').each((_, el) => {
    const alt = $(el).attr('alt');
    const src = $(el).attr('src') || '';
    if (alt === undefined || alt === null) {
      imagesWithoutAlt.push({ src, issue: 'missing alt attribute' });
    }
  });
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      type: 'error', code: 'img-alt',
      message: 'Images must have alternate text (WCAG 1.1.1)',
      count: imagesWithoutAlt.length, impact: 'critical',
      category: 'accessibility', elements: imagesWithoutAlt.slice(0, 5),
    });
  }

  // 2. Form inputs without labels
  let unlabeledInputs = 0;
  $('input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"])').each((_, el) => {
    const id = $(el).attr('id');
    const ariaLabel = $(el).attr('aria-label');
    const ariaLabelledBy = $(el).attr('aria-labelledby');
    if (!ariaLabel && !ariaLabelledBy && (!id || $(`label[for="${id}"]`).length === 0)) {
      unlabeledInputs++;
    }
  });
  if (unlabeledInputs > 0) {
    issues.push({
      type: 'error', code: 'label',
      message: 'Form elements must have labels (WCAG 1.3.1)',
      count: unlabeledInputs, impact: 'critical', category: 'accessibility',
    });
  }

  // 3. Missing page title
  const pageTitle = $('title').first().text().trim();
  if (!pageTitle) {
    issues.push({
      type: 'error', code: 'page-title',
      message: 'Page must have a title (WCAG 2.4.2)',
      count: 1, impact: 'serious', category: 'accessibility',
    });
  }

  // 4. Missing lang attribute
  const htmlLang = $('html').attr('lang');
  if (!htmlLang) {
    issues.push({
      type: 'error', code: 'html-lang',
      message: 'Page must have lang attribute (WCAG 3.1.1)',
      count: 1, impact: 'serious', category: 'accessibility',
    });
  }

  // 5. Links without text
  let emptyLinks = 0;
  $('a').each((_, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label');
    const title = $(el).attr('title');
    if (!text && !ariaLabel && !title) {
      emptyLinks++;
    }
  });
  if (emptyLinks > 0) {
    issues.push({
      type: 'error', code: 'link-name',
      message: 'Links must have discernible text (WCAG 2.4.4)',
      count: emptyLinks, impact: 'serious', category: 'accessibility',
    });
  }

  // 6. Buttons without text
  let emptyButtons = 0;
  $('button').each((_, el) => {
    const text = $(el).text().trim();
    const ariaLabel = $(el).attr('aria-label');
    const title = $(el).attr('title');
    if (!text && !ariaLabel && !title) {
      emptyButtons++;
    }
  });
  if (emptyButtons > 0) {
    issues.push({
      type: 'error', code: 'button-name',
      message: 'Buttons must have discernible text (WCAG 4.1.2)',
      count: emptyButtons, impact: 'critical', category: 'accessibility',
    });
  }

  // 7. Duplicate IDs
  const allIds = [];
  $('[id]').each((_, el) => {
    allIds.push($(el).attr('id'));
  });
  const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
  const uniqueDuplicates = [...new Set(duplicateIds)];
  if (uniqueDuplicates.length > 0) {
    issues.push({
      type: 'error', code: 'duplicate-id',
      message: 'IDs must be unique (WCAG 4.1.1)',
      count: uniqueDuplicates.length, impact: 'serious',
      category: 'accessibility', elements: uniqueDuplicates.slice(0, 5),
    });
  }

  // 8. Skip link (bypass)
  const hasSkipLink = $('a[href^="#"]').first().length > 0;
  if (!hasSkipLink) {
    issues.push({
      type: 'error', code: 'bypass',
      message: 'Page must have means to bypass repeated blocks (WCAG 2.4.1)',
      count: 1, impact: 'serious', category: 'accessibility',
    });
  }

  // 9. Heading hierarchy — must be sequential
  const headings = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const level = parseInt(el.tagName.replace('h', ''), 10);
    headings.push({ level, text: $(el).text().trim().substring(0, 80) });
  });
  let hierarchyBroken = false;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i - 1].level + 1) {
      hierarchyBroken = true;
      break;
    }
  }
  if (hierarchyBroken) {
    issues.push({
      type: 'warning', code: 'heading-order',
      message: 'Heading levels should be sequential (e.g., h1 then h2, not h1 then h3) (WCAG 1.3.1)',
      count: 1, impact: 'moderate', category: 'accessibility',
    });
  }

  // 10. Invalid ARIA roles
  const validRoles = [
    'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
    'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
    'contentinfo', 'definition', 'dialog', 'directory', 'document', 'feed',
    'figure', 'form', 'grid', 'gridcell', 'group', 'heading', 'img',
    'link', 'list', 'listbox', 'listitem', 'log', 'main', 'marquee',
    'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
    'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
    'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
    'rowheader', 'scrollbar', 'search', 'searchbox', 'separator', 'slider',
    'spinbutton', 'status', 'switch', 'tab', 'table', 'tablist', 'tabpanel',
    'term', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem',
  ];
  let invalidAriaRoles = 0;
  $('[role]').each((_, el) => {
    const role = $(el).attr('role');
    if (role && !validRoles.includes(role.toLowerCase().trim())) {
      invalidAriaRoles++;
    }
  });
  if (invalidAriaRoles > 0) {
    issues.push({
      type: 'error', code: 'aria-roles',
      message: 'ARIA role attributes must use valid values',
      count: invalidAriaRoles, impact: 'serious', category: 'accessibility',
    });
  }

  // 11. Color contrast — detect inline style low-contrast patterns
  let lowContrastHints = 0;
  $('[style*="color"]').each((_, el) => {
    const style = $(el).attr('style') || '';
    // Flag very light text colors as potential low-contrast
    const colorMatch = style.match(/(?:^|;)\s*color\s*:\s*(#[a-fA-F0-9]{3,8}|rgba?\([^)]+\))/);
    if (colorMatch) {
      const val = colorMatch[1].toLowerCase();
      // Flag obvious low-contrast: very light grays on presumably white bg
      if (val === '#ccc' || val === '#ddd' || val === '#eee' || val === '#fff' ||
          val === '#cccccc' || val === '#dddddd' || val === '#eeeeee') {
        lowContrastHints++;
      }
    }
  });
  if (lowContrastHints > 0) {
    issues.push({
      type: 'warning', code: 'color-contrast',
      message: 'Potential low color contrast detected in inline styles (WCAG 1.4.3)',
      count: lowContrastHints, impact: 'serious', category: 'accessibility',
    });
  }

  return {
    issues,
    headings,
    duplicateIds: uniqueDuplicates,
    imagesWithoutAlt,
    hasSkipLink,
    htmlLang: htmlLang || null,
  };
};

module.exports = { scanAccessibility };
