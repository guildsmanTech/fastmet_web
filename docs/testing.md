# Website tests

Tests live in `src/__tests__/`, grouped into `api`, `schemas`, `helper`, and `components`. Shared sample data lives in `src/__tests__/fixtures/`.

Run from `fastmet_web`:

- `npm test` runs the Vitest suite once.
- `npm run test:watch` reruns affected tests during development.
- `npm run test:coverage` prints coverage and writes an HTML report to `coverage/index.html`.

Tests cover fleet application normalization, required uploads (including the logo), file limits, terms acceptance, multipart submission, server and network errors, phone and date formatting, peso formatting, checkout URLs, supported email domains, quote pricing, and the public support email link.

Tests use synthetic files and mocked network requests. They never submit applications, send emails, or upload documents to Cloudinary. They run in Node with browser-compatible File, FormData, and Response APIs. They do not replace browser checks for visual layout, focus, or accessibility.
