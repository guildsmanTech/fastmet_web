# Fleet website and company applications

The Fleet terms are a draft for team/legal review. Resolve all marked placeholders before public launch, especially the Fleet privacy notice, identity-document processing basis, retention, contact and notification procedures. The current agreement links the existing FastMet Privacy Policy; the team must confirm it covers company applications. Privacy text references the National Privacy Commission's Data Privacy Act: https://privacy.gov.ph/data-privacy-act/.

## Website

- `/fleet`: offering, benefits, approval flow and registration calls to action.
- `/fleet?register=1`: company application dialog; no password, login or account creation. `/fleet/register` redirects here for compatibility. There is no standalone registration page.
- `/fleet/terms`: separate draft terms and contents navigation. Existing Terms and FAQ are unchanged.
- Home has a static Fleet promotion linking to `/fleet`; no banner storage or dismissal is needed. Header and footer link Fleet; footer also links Fleet terms.
- Uses existing Montserrat/Tailwind tokens, PageContainer, CTAButton, Button, Lucide, React Router, Helmet and Zod. New routes are lazy-loaded. Fleet pages suppress the existing reward popup. The existing `src/assets/fleet/fleet_bg.jpg` supplies the hero background (decorative, eager/high-priority, full-bleed cover). It has not been renamed or edited. No new image assets or image placeholders are needed. React Hook Form and @hookform/resolvers are now direct dependencies; the lockfile includes them.
- Two pre-existing lint errors were fixed by extracting service-area and badge variant constants into separate modules.

## Configuration and deployment

Use Node 24 and npm. Set the existing `VITE_API_URL` to the deployed FastMet backend; restart/rebuild after changes. Keep the host's existing SPA history fallback so direct visits to the three new routes return index.html. The backend needs the setup in `fastmet_backend/docs/fleet-applications.md`.

Form values stay in place after server/upload errors. Logo preview uses a revocable local object URL. No applicant data is written to browser storage. Client validation is for usability; the backend validates independently. The backend returns success only after application persistence. Terms must be accepted; applicants receive no session or credentials at submission.

## Admin handoff

No company model, route or admin company view existed. A dedicated MongoDB collection and super-admin review endpoints were added. Company applications are separate from driver pre-registration and dual-control action requests. No full admin review UI or approval actions were added. The existing admin app still needs a company applications view consuming the protected queue; later approval work must create the company account, link accountId and send credentials to companyEmail. Vehicle and driver enrollment remain separate. Email verification is not implemented; emailVerifiedAt is reserved for a future gate.

## Checks

Run `npm run lint` and `npm run build` (includes `tsc -b`). Backend: `npm run build` and `npm test -- src/__tests__/fleetApplication.isolated.test.ts`. Production-preview browser checks passed at 390px and 1440px: viewport bounds, fixed footer, focus entry/return and keyboard containment, scroll lock, discard confirmation (Escape/overlay/X), query and legacy routing, validation focus, server-error retention, success inside the dialog and reduced motion. Submission responses were mocked; no real application was sent. No page errors occurred. The fixed 85% navy overlay gives conservative contrast over an all-white image of 5.12:1 for the orange heading and 8.34:1 for the white body text, satisfying AA at both widths.

## Registration dialog amendment

CompanyRegistrationDialog uses the existing Radix Dialog for modal focus trapping, Escape/overlay handling and body scroll locking. It sets an accessible title/description and restores the originating button's focus (falls back to the hero button for direct query links). CompanyRegistrationForm retains the same fields and API. React Hook Form with zodResolver now handles the fields, file values, agreement, dirty state, submission state and field/server errors. shadcn Field/FieldSet/FieldLegend, Input, NativeSelect, Checkbox and Alert components provide the controls and error presentation. Header and action footer remain outside the scrolling form body; the dialog is full viewport on mobile and capped at 700px on desktop. Unsaved input invokes a shadcn AlertDialog discard confirmation on close, Cancel, Escape and overlay attempts. Closure is disabled while submitting to avoid losing the request result. Successful submission replaces the form within the dialog. No draft data is saved to browser storage. Reduced-motion users get no dialog/overlay animation.

The hero matches About Us height, padding, alignment, headline/subtext and rounded CTA treatment; no reusable cross-page hero existed. Sections alternate background, muted, card and primary-tinted surfaces with border separators. The received amendment ended at “separate sections with”; simple borders are the current separator assumption.

## Form and design polish

The form is a single-column layout with semantic fieldsets and legends, persistent format hints, scoped autofill tokens, 48px controls and visible input borders/focus. Validation runs on submission and revalidates on blur; typing clears an existing error only after the field is valid. Errors are linked through aria-describedby. Server field errors map to React Hook Form with focus moved to the first affected field; general errors remain visible above the fixed actions. File removal, client size/type checks, preview URL cleanup, retained files after server errors, and success without login are preserved. The styled discard confirmation defaults focus to Keep editing. Both dialog types honor reduced motion.

Fleet benefits and the approval process use a wider introductory column next to the details, with clearer spacing and type hierarchy. The closing CTA uses the site's dark surface and orange button. The supplied Fleet hero image is unchanged.

Applied Modern Web Guidance's `forms`, `validate-input-after-interaction` and `dialog` guides, adapting to the explicitly requested shadcn/Radix components. No native-dialog rewrite was performed because the requested existing component library takes precedence. Existing backend validation and private storage rules remain unchanged.

Verification for this refactor: lint and TypeScript/production build pass under Node 24. Browser checks at 320px, 390px and 1440px passed for initial error-free state, invalid submit focus, fixed action visibility, file type/removal, normalized multipart, duplicate/offline error retention, confirmation focus, success in the dialog, legacy redirect, keyboard containment and reduced motion. API responses were mocked; no application was submitted to production. No browser page errors were observed. Existing bundle-size and dependency annotation warnings remain.
