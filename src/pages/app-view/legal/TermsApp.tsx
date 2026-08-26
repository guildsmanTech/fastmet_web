import {useParams} from "react-router-dom";

import {slugify} from "@/utils/slugify";
import LegalContentRenderer from "@/components/LegalContentRenderer";
import {userTerms, driverTerms} from "@/constants/legal";
import type {LegalContent} from "@/types/legal";
import LegalTabsLayoutAppView from "@/layout/LegalTabsLayoutAppView";

const CONTENT: Record<string, LegalContent> = {
  user: userTerms,
  driver: driverTerms,
};

export default function TermsPageAppView() {
  const {type} = useParams<{type: string}>();
  const content = CONTENT[type ?? "user"] ?? CONTENT.user;

  const toc = content.sections.map((s) => ({
    id: slugify(s.heading),
    label: s.heading.split(". ").slice(1).join(". ") || s.heading,
  }));

  return (
    <LegalTabsLayoutAppView
      title="Terms & Conditions"
      lastUpdated={content.lastUpdated}
      basePath="/legal/terms"
      toc={toc}
    >
      <LegalContentRenderer content={content} />
    </LegalTabsLayoutAppView>
  );
}
