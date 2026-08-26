import {NavLink} from "react-router-dom";
import PageContainer from "@/components/PageContainer";
import {useScrollSpy} from "@/hooks/useScrollSpy";

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

export default function LegalTabsLayout({
  title,
  lastUpdated,
  basePath,
  toc,
  children,
}: Props) {
  const activeId = useScrollSpy(toc.map((t) => t.id));

  const typeTab = ({isActive}: {isActive: boolean}) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors flex-1 text-center ${
      isActive
        ? "bg-primary text-white shadow-sm"
        : "text-gray-500 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-50/60">
      <PageContainer className="pt-20 pb-10 md:pt-30">
        <div className="flex flex-col gap-2 md:gap-8 md:flex-row md:items-start">
          {/* Sticky sidebar */}
          <aside className="md:w-60 md:pl-1 shrink-0 md:sticky md:top-30 md:max-h-[calc(100vh-10rem)] md:overflow-y-auto  [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="mb-8">
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

            <div className="flex gap-2 p-1 mb-8 w-full bg-gray-100 rounded-full md:w-fit">
              <NavLink to={`${basePath}/user`} className={typeTab}>
                User
              </NavLink>

              <NavLink to={`${basePath}/driver`} className={typeTab}>
                Driver
              </NavLink>
            </div>

            {/* Desktop TOC */}
            <nav className="hidden md:block">
              <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mb-3">
                On this page
              </p>

              <ol className="relative space-y-1 border-l border-gray-200">
                {toc.map((item) => {
                  const active = item.id === activeId;

                  return (
                    <li key={item.id} className="relative pl-4">
                      <span
                        className={`absolute -left-[3.5px] top-2 w-[7px] h-[7px] rounded-full transition-colors ${
                          active ? "bg-primary" : "bg-gray-300"
                        }`}
                      />

                      <a
                        href={`#${item.id}`}
                        className={`block py-1.5 text-xs leading-snug transition-colors ${
                          active
                            ? "text-primary font-medium"
                            : "text-gray-500 hover:text-secondary"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
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
          </aside>

          {/* Content */}
          <div className="flex-1 p-6 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm md:p-10">
            {children}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
