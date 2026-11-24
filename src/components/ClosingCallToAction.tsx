import SupportContactText from "@/components/SupportContactText";
import type { ReactNode } from "react";
import PageContainer from "@/components/PageContainer";

export default function ClosingCallToAction({
  title,
  description,
  action,
  badge,
  note,
}: Readonly<{
  title: string;
  description: string;
  action: ReactNode;
  badge?: string;
  note?: string;
}>) {
  return (
    <section id="final-cta" className="w-full bg-primary py-20">
      <PageContainer className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {badge && (
            <p className="w-fit self-center rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-zinc-900">
              {badge}
            </p>
          )}
          <p className="max-w-xl text-sm leading-relaxed text-secondary/80 sm:text-base">
            {description}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          {action}
          <SupportContactText />
          {note && <p className="max-w-md text-xs leading-relaxed text-secondary">{note}</p>}
        </div>
      </PageContainer>
    </section>
  );
}
