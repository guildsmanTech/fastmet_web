import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import FleetMeta from "@/components/fleet/FleetMeta";
const sections = [
  [
    "Eligibility and authority",
    "Apply only if you are authorized to represent the company and submit its information and documents. Your company must meet applicable business requirements and FastMet's review requirements.",
  ],
  [
    "Information and documents",
    "Provide accurate, complete and authentic information. Submit only documents you are authorized to share. Tell FastMet when submitted details change. False or altered documents may lead to rejection or suspension.",
  ],
  [
    "Application review",
    "Submitting an application does not create an account or guarantee approval. FastMet admins may request clarification, approve or reject the application. If approved, an admin creates the company account and sends login details to the company email.",
  ],
  [
    "Vehicles and drivers",
    "Company approval does not automatically approve vehicles or drivers. Vehicles require FastMet admin verification. Drivers register through the FastMet driver app and are processed by FastMet admins before they can participate.",
  ],
  [
    "Document validity",
    "Keep required documents valid and current. Provide replacements when documents expire or details change. FastMet may suspend affected access or operations while expired, invalid or unverifiable documents are unresolved.",
  ],
  [
    "Account responsibility and security",
    "Your company is responsible for authorized account use and keeping login details confidential. Complete required security setup, limit access to authorized people and promptly report suspected misuse to FastMet.",
  ],
  [
    "Privacy and submitted documents",
    "FastMet uses company and representative information to assess applications, verify eligibility and administer company access. Personal information must be handled in accordance with Republic Act No. 10173, the Philippine Data Privacy Act of 2012, including transparency, legitimate purpose and proportionality. Supporting documents are restricted to authorized reviewers and are not publicly accessible. [PLACEHOLDER: confirm the data controller and privacy contact, lawful basis for IDs, service providers, retention periods, rights request procedure and any cross-border processing before launch.]",
  ],
  [
    "Suspension and termination",
    "FastMet may suspend or terminate access for false information, invalid documents, unauthorized account use or breaches of these terms, subject to applicable law. [PLACEHOLDER: confirm notice, review and appeal procedures.]",
  ],
  [
    "Changes and contact",
    "FastMet may update these terms and will identify the updated date. [PLACEHOLDER: confirm how companies will be notified of material changes and when updates take effect.] [PLACEHOLDER: insert the Fleet support and legal contact.] No fees or payout terms are established by this draft.",
  ],
];
export default function Terms() {
  return (
    <PageContainer className="max-w-5xl pt-32 pb-20">
      <FleetMeta
        title="Fleet Terms and Conditions"
        description="Draft terms for FastMet Fleet company applications, verification and account responsibility."
        path="/fleet/terms"
      />
      <header className="space-y-4 mb-10">
        <Link to="/fleet" className="underline">
          FastMet Fleet
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold">Fleet Terms and Conditions</h1>
        <p>Last updated: November 23, 2026</p>
        <p className="border-l-4 border-primary pl-4 font-medium">
          Draft for team and legal review. The marked placeholders must be resolved before launch.
        </p>
      </header>
      <nav aria-label="Table of contents" className="rounded-xl bg-muted p-6 mb-12">
        <h2 className="font-semibold mb-4">Contents</h2>
        <ol className="list-decimal pl-5 space-y-2">
          {sections.map(([title], i) => (
            <li key={title}>
              <a className="underline underline-offset-4" href={`#fleet-term-${i + 1}`}>
                {title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <article className="space-y-10">
        {sections.map(([title, text], i) => (
          <section key={title} id={`fleet-term-${i + 1}`} className="scroll-mt-28">
            <h2 className="text-xl font-semibold mb-3">
              {i + 1}. {title}
            </h2>
            <p className="leading-relaxed">{text}</p>
            {i === 6 && (
              <p className="mt-3">
                <Link to="/legal/privacy-policy/user" className="underline">
                  Read the current FastMet Privacy Policy
                </Link>
                .{" "}
                <a
                  href="https://privacy.gov.ph/data-privacy-act/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Read the Data Privacy Act
                </a>
                .
              </p>
            )}
          </section>
        ))}
      </article>
      <Link to="/fleet?register=1" className="inline-block mt-12 font-semibold underline">
        Return to company registration
      </Link>
    </PageContainer>
  );
}
