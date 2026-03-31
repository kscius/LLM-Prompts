---
name: web-accessibility
description: WCAG 2.1 AA compliance for web UI — semantic HTML, ARIA, keyboard navigation, focus management, color contrast, screen reader compatibility. Use when building or reviewing frontend components, forms, modals, navigation, or interactive elements. Proactively apply when generating any UI code to prevent accessibility regressions.
---

# Web Accessibility

Agents produce inaccessible UI by default. This skill prevents that.

**Target standard:** WCAG 2.1 AA — the legal and practical baseline for production web apps.

## Core Rules (Always Apply)

### 1. Semantic HTML First

Use the right element before reaching for ARIA. ARIA adds roles to existing elements — it does not replace semantic elements.

```html
<!-- Good: semantic -->
<button type="button">Submit</button>
<nav aria-label="Main navigation">...</nav>
<main>...</main>
<h1>Page Title</h1>

<!-- Bad: div soup + ARIA patch -->
<div role="button" tabindex="0">Submit</div>
<div role="navigation">...</div>
```

Prefer: `<button>`, `<a href>`, `<input>`, `<select>`, `<textarea>`, `<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<h1>`–`<h6>`, `<ul>/<ol>/<li>`, `<table>` (for tabular data only).

### 2. Every Interactive Element Must Be Keyboard Accessible

- Native `<button>` and `<a href>` are keyboard-accessible by default — prefer them
- Custom interactive elements need `tabindex="0"` and keyboard handlers (`onKeyDown` for Enter/Space)
- Never use `tabindex > 0` — it breaks natural tab order

```tsx
// Good: handles keyboard
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
>
  Custom button
</div>

// Better: just use a button
<button type="button" onClick={handleClick}>Custom button</button>
```

### 3. Every Form Field Must Have a Visible Label

```html
<!-- Good: explicit label -->
<label for="email">Email address</label>
<input id="email" type="email" />

<!-- Good: aria-label when visible label isn't possible -->
<input type="search" aria-label="Search products" />

<!-- Good: aria-labelledby for complex cases -->
<span id="qty-label">Quantity</span>
<input type="number" aria-labelledby="qty-label" />

<!-- Bad: placeholder-only (disappears on input, not a label) -->
<input type="email" placeholder="Email address" />
```

### 4. Modals and Dialogs — Focus Management

```tsx
// When modal opens: move focus inside
useEffect(() => {
  if (isOpen) {
    firstFocusableRef.current?.focus();
  }
}, [isOpen]);

// When modal closes: return focus to trigger
useEffect(() => {
  if (!isOpen) {
    triggerRef.current?.focus();
  }
}, [isOpen]);

// Modal must trap focus (Tab/Shift+Tab stay inside)
// Escape key must close the modal
// Modal root: role="dialog" aria-modal="true" aria-labelledby="dialog-title"
```

### 5. Images Must Have Alt Text

```html
<!-- Informative image -->
<img src="chart.png" alt="Monthly revenue grew 23% from Jan to Jun 2025" />

<!-- Decorative image -->
<img src="decoration.png" alt="" role="presentation" />

<!-- Icon button: describe the action, not the icon -->
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>
```

### 6. Color Contrast

- Normal text (< 18px or non-bold): minimum 4.5:1 contrast ratio
- Large text (≥ 18px or ≥ 14px bold): minimum 3:1
- UI components (inputs, buttons borders): minimum 3:1
- Never convey information by color alone — pair with text, icons, or patterns

```tsx
// Always provide non-color indicator for errors
<p className="text-red-600" role="alert">
  <span aria-hidden="true">⚠</span> Email is required
</p>
```

### 7. ARIA Live Regions for Dynamic Content

```html
<!-- Loading states, async results, notifications -->
<div aria-live="polite" aria-atomic="true">
  {isLoading ? 'Loading results...' : `${results.length} results found`}
</div>

<!-- Critical errors: use aria-live="assertive" -->
<div role="alert">Payment failed. Please try again.</div>
```

### 8. Skip Navigation Link

For pages with significant nav content before main:

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute ...">
  Skip to main content
</a>
<main id="main-content">...</main>
```

## Component-Specific Patterns

### Dropdown / Select Menus

```tsx
// Custom dropdown must implement:
// - button trigger with aria-expanded, aria-haspopup="listbox"
// - listbox role on the dropdown
// - option roles on items
// - Arrow key navigation within options
// - Home/End key support
// - Type-ahead selection

// Simpler: use native <select> when design allows
<select aria-label="Sort by">
  <option value="price">Price</option>
  <option value="rating">Rating</option>
</select>
```

### Tabs

```html
<div role="tablist" aria-label="Product details">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Overview</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">Specs</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>...</div>
```

Arrow keys must navigate between tabs.

### Loading/Spinner

```tsx
// Not just visual — announce to screen readers
<div role="status" aria-live="polite">
  {isLoading && <span className="sr-only">Loading, please wait...</span>}
  <Spinner aria-hidden="true" />
</div>
```

### Toast/Notification

```tsx
// Appears dynamically — must use live region
<div role="status" aria-live="polite" aria-atomic="true">
  {notification && <p>{notification.message}</p>}
</div>
```

## Checklist (Before Declaring UI Done)

### Semantic structure
- [ ] Native elements used over ARIA divs where possible
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skips)
- [ ] Landmark regions present: `<main>`, `<nav>`, `<header>`, `<footer>`

### Interactive elements
- [ ] All interactive elements reachable by Tab key
- [ ] Focus is visible (not hidden with `outline: none` without replacement)
- [ ] Custom components handle Enter/Space keyboard activation
- [ ] No `tabindex` values > 0

### Forms
- [ ] Every input has an associated `<label>` or `aria-label`
- [ ] Error messages are programmatically associated (`aria-describedby` or adjacent label)
- [ ] Required fields marked (`required` attribute + visual indicator)

### Images and media
- [ ] All `<img>` have `alt` text (empty alt for decorative)
- [ ] Icon-only buttons have `aria-label`
- [ ] SVG icons inside buttons use `aria-hidden="true"`

### Dynamic content
- [ ] Loading states announced to screen readers
- [ ] Error alerts use `role="alert"` or `aria-live="assertive"`
- [ ] Status updates use `aria-live="polite"`

### Color and contrast
- [ ] Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large)
- [ ] Information not conveyed by color alone

### Modals
- [ ] Focus moves into modal on open
- [ ] Focus returns to trigger on close
- [ ] Escape key closes modal
- [ ] Focus trapped within modal while open

## Common Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| `onClick` on `<div>` | Use `<button>` or add `role="button"` + keyboard handler |
| `placeholder` as only label | Add `<label>` element |
| `outline: none` with no replacement | Provide custom focus style (box-shadow, border) |
| Empty `alt` on informative image | Describe the content or purpose |
| Modal that doesn't trap focus | Implement focus trap (see pattern above) |
| Status message in non-live region | Add `aria-live="polite"` to container |
| `<table>` for layout | Use CSS flexbox/grid instead |

## Quick Test — Keyboard Only

Close the mouse and navigate the entire flow with keyboard only:
1. Tab — reaches every interactive element in logical order
2. Enter/Space — activates buttons and links
3. Arrow keys — navigate within radios, tabs, selects, custom dropdowns
4. Escape — closes modals, dropdowns, tooltips

If you get stuck or lose focus: the component is inaccessible.

## Integration with this Setup

- Pairs with `web-design-guidelines` (broader UI quality check)
- Pairs with `ui-ux-pro-max` (design system work)
- Pairs with `review-and-secure` (quality gate before shipping)
- Run as part of `ship-feature` UI validation step

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
