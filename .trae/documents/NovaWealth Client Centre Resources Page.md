## Goals

* Build a pixel‑perfect, brand‑compliant Resources page under Client Centre.

* Make resources easily discoverable via categories, search, filters, and popular items.

* Support responsive layout, WCAG 2.1 AA accessibility, fast loading, bookmarks for logged‑in users, analytics, and secure access controls.

## Tech & Conventions

* React 18 with React Router v6, Tailwind CSS utilities per existing conventions.

* Use existing Tailwind theme tokens for NovaWealth brand colors; avoid hardcoded colors.

* Keep logic in hooks/utilities; presentational components stay lean and composable.

## Page Structure

* Route: `client-centre/resources` rendered by `src/pages/ClientCentre/Resources.jsx`.

* Layout: reuse `ClientCentre` layout wrapper if present (e.g., `ClientCentreLayout`).

* Regions:

  * Header: title "Insights & Resources", subtitle, small badge chips (e.g., "Updated Daily", "From Experts").

  * Toolbar: category tabs + search input + filter dropdowns (type, date range, topic) + sort (Latest/Popular).

  * Main grid: resource cards (consistent with screenshot) in 3‑column desktop, 2 on tablet, 1 on mobile.

  * Sidebar: subscription CTA, Popular Resources list, Categories list.

  * Footer CTA banner: gold accent with two buttons (Book Consultation, WhatsApp us) matching brand styles.

## Components

* `ResourceCard`: thumbnail, title, summary, type icon (PDF/Video/Calculator/etc.), metadata (date, size, reading time), brand‑styled action buttons.

* `ResourceFilters`: category tabs, type/date/topic filters, sort control; emits filter state.

* `SearchBar`: debounced text search with accessible label.

* `PopularList`: top downloads; compact list with type icons and small metadata.

* `CategoriesList`: links to category views.

* `SubscribeCTA`: right‑rail card with copy, input/email button using brand accent.

* `BookmarkButton`: toggles save state for logged‑in users; disabled with tooltip when not authenticated.

* `Pagination`: numbered pager with next/prev; supports infinite scroll on mobile.

* `Skeletons`: loading placeholders for cards and lists.

## Data & API

* Resource model: `{ id, title, summary, category, type, topic, publicationDate, fileSize, readingTime, thumbnailUrl, downloadUrl, access, popularityScore }`.

* Endpoints (adapt to existing backend):

  * `GET /api/resources?query=&category=&type=&topic=&dateFrom=&dateTo=&sort=&page=&pageSize=`

  * `GET /api/resources/popular?limit=`

  * `GET /api/categories`

  * `POST /api/resources/:id/bookmark` | `DELETE /api/resources/:id/bookmark`

* Client modules:

  * `src/lib/api/resources.js` for fetchers.

  * `src/hooks/useResources.js` to manage query params, pagination, and caching.

## Search & Filters

* Text search with 300ms debounce and trim; enter/clear accessible controls.

* Filters: multi‑select type, single/multi topic, date range.

* Sort: Latest (date desc) and Popular (downloads/score desc).

* URL sync: reflect state in query params to enable shareable views.

## Icons & Metadata

* Type icons: inline SVGs in `src/assets/icons` or React icon components; consistent sizing.

* Metadata: formatted date, human‑readable file size, computed reading time.

## Accessibility (WCAG 2.1 AA)

* Semantic landmarks: `header`, `nav`, `main`, `aside`, `footer`.

* Labels for inputs; visible focus states; ARIA for tabs and filter controls.

* Color contrast using Tailwind brand tokens; ensure button text contrast meets AA.

* Keyboard navigation: tabs, search, filters, pagination; no keyboard traps.

## Performance

* Lazy‑load images with `loading="lazy"` and proper `sizes`.

* Code‑split page with React.lazy; defer sidebar popular list fetch.

* Pagination page size 9; memoize card lists; prefetch resource detail on hover.

* Caching: simple in‑memory cache in `useResources`; respect stale‑while‑revalidate pattern.

## Bookmarks

* Requires authentication via `useAuth()` context.

* Persistent bookmarks stored via API; localStorage fallback when offline.

* Optimistic UI: toggle state immediately; rollback on API error with toast.

## Analytics

* Event module `src/lib/analytics.js` wrapping GA4/dataLayer.

* Events: `resources_search`, `resources_filter_apply`, `resource_card_view`, `resource_download`, `bookmark_add/remove`, `popular_click`, `category_click`.

* Include payloads (resource id/type/category, query length, filter counts).

## Access Controls

* Resource `access` field: `public` | `client`.

* UI gating: hide/lock client‑only actions for anonymous users; show login prompt.

* Server enforcement: all protected endpoints check session token; front‑end respects 403 with friendly messaging.

## Styling & Brand Compliance

* Use Tailwind theme tokens for NovaWealth colors, spacing, typography.

* Buttons: primary and accent variants; gold accent for footer CTA; consistent rounded corners and shadow depth.

* Match screenshot spacings: header margin, grid gutters, card paddings, sidebar widths.

## Integration

* Add route in React Router config; nest under Client Centre.

* Reuse global header/footer; ensure breadcrumbs match existing pattern.

* Link from Client Centre nav to Resources.

## Testing & QA

* Visual QA: align to screenshot (spacing, font sizes, iconography, colors).

* Accessibility audit: keyboard tab order, ARIA roles, contrast checks.

* Performance: lighthouse pass, ensure fast LCP; verify lazy loading.

* Functional tests: search, filters, pagination, bookmarks, downloads; analytics event firing.

## Deliverables

* New page component and child components under `src/pages/ClientCentre/` and `src/components/resources/`.

* API modules and hooks; analytics wrapper; access control checks.

* Pixel‑perfect styling with Tailwind using existing brand tokens.

* Documentation notes in code for non‑obvious logic kept minimal per conventions.

## Rollout

* Implement components and route, wire data, finalize styles.

* Smoke test across breakpoints; run accessibility/performance checks.

* Enable analytics and access control in production config.

