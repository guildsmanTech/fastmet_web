import LegalContentRenderer from "@/components/LegalContentRenderer";
import {userPrivacyPolicy, driverPrivacyPolicy} from "@/constants/legal";
import LegalTabsLayout from "@/layout/LegalTabsLayout";
import type {LegalContent} from "@/types/legal";
import {slugify} from "@/utils/slugify";
import {useParams} from "react-router-dom";

const CONTENT: Record<string, LegalContent> = {
  user: userPrivacyPolicy,
  driver: driverPrivacyPolicy,
};

export default function PrivacyPolicyPage() {
  const {type} = useParams<{type: string}>();
  const content = CONTENT[type ?? "user"] ?? CONTENT.user;

  const toc = content.sections.map((s) => ({
    id: slugify(s.heading),
    label: s.heading.split(". ").slice(1).join(". ") || s.heading,
  }));

  return (
    <LegalTabsLayout
      title="Privacy Policy"
      lastUpdated={content.lastUpdated}
      basePath="/legal/privacy-policy"
      toc={toc}
    >
      <LegalContentRenderer content={content} />
    </LegalTabsLayout>
  );
}
