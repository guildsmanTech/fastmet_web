import PageContainer from "@/components/PageContainer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  title: string;
  lastUpdated?: string;
  basePath: string;
  toc: TocItem[];
  children: React.ReactNode;
}

export default function LegalTabsLayoutAppView({
  title,
  lastUpdated,
  toc,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50/60">
      <PageContainer className="pt-5 pb-10">
        <div className="flex flex-col gap-2 md:gap-8 md:flex-row md:items-start">
          <div className="shrink-0">
            <div className="flex flex-col gap-2 justify-center items-center mb-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-primary">
                Legal
              </p>

              <h1 className="mt-1 text-2xl font-bold md:text-3xl text-secondary">
                {title}
              </h1>

              {lastUpdated && (
                <p className="mt-2 text-xs text-gray-400">
                  Last updated {lastUpdated}
                </p>
              )}
            </div>
            {/* Mobile TOC */}
            <details className="p-3 mb-2 bg-white rounded-lg border border-gray-200 md:hidden">
              <summary className="text-xs font-semibold text-gray-500 uppercase cursor-pointer">
                Jump to section
              </summary>

              <ul className="mt-2 space-y-1">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block py-1 text-sm text-gray-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm md:p-10">
            {children}
          </div>
        </div>
      </PageContainer>

      <ScrollToTopButton />
    </div>
  );
}
