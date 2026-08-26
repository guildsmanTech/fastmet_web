import {useParams} from "react-router-dom";

import {slugify} from "@/utils/slugify";
import LegalContentRenderer from "@/components/LegalContentRenderer";
import {userTerms, driverTerms} from "@/constants/legal";
import LegalTabsLayout from "@/layout/LegalTabsLayout";
import type {LegalContent} from "@/types/legal";

const CONTENT: Record<string, LegalContent> = {
  user: userTerms,
  driver: driverTerms,
};

export default function TermsPage() {
  const {type} = useParams<{type: string}>();
  const content = CONTENT[type ?? "user"] ?? CONTENT.user;

  const toc = content.sections.map((s) => ({
    id: slugify(s.heading),
    label: s.heading.split(". ").slice(1).join(". ") || s.heading,
  }));

  return (
    <LegalTabsLayout
      title="Terms & Conditions"
      lastUpdated={content.lastUpdated}
      basePath="/legal/terms"
      toc={toc}
    >
      <LegalContentRenderer content={content} />
    </LegalTabsLayout>
  );
}
