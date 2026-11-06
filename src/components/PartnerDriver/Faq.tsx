import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PageContainer from "@/components/PageContainer";

const FAQ_ITEMS = [
  {
    q: "Paano maging FastMet partner-driver?",
    a: "I-download ang FastMet Driver app sa Google Play, mag-sign up, at sundin ang onboarding steps sa app.",
  },
  {
    q: "May commission ba sa FastMet?",
    a: "Walang commission. Keep mo ang 100% ng delivery earnings mo — subscription fee lang ang babayaran.",
  },
  {
    q: "May subscription ba ang driver app?",
    a: "Oo. Maaari mong i-manage ang iyong plan sa Subscription page ng website o sa loob ng FastMet Driver app.",
  },
  {
    q: "Kailan ako makakapagsimulang bumiyahe?",
    a: "Kapag na-approve na ang iyong account at aktibo ang iyong subscription, maaari ka nang tumanggap ng delivery opportunities.",
  },
  {
    q: "May fixed working hours ba?",
    a: "Walang fixed working hours. Dinisenyo ang FastMet para magkaroon ng flexible na pagkakataon ang mga partner-drivers.",
  },
  {
    q: "May required daily quota ba?",
    a: "Walang required na daily quota.",
  },
  {
    q: "Anong mga sasakyan ang tinatanggap?",
    a: null,
    list: [
      "Motorsiklo",
      "Sedan",
      "Subcompact SUV",
      "Small van",
      "Pickup",
      "Cargo van",
      "Closed van",
      "Wing van",
    ],
  },
];

export function DriverFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="driver-faq" className="px-3 md:px-0 w-full py-20 lg:py-28">
      <PageContainer className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Header (sticky on desktop) */}
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            FAQ
          </p>

          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Driver frequently asked{" "}
            <span className="text-primary">questions.</span>
          </h2>

          <div className="max-w-lg space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base mt-3">
            <p>Common questions from prospective FastMet partner-drivers.</p>
          </div>
        </div>

        {/* Accordion: one bordered container with hairline dividers */}
        <div className="lg:col-span-8">
          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `driver-faq-panel-${i}`;

              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center gap-4 px-4 py-5 text-left transition-colors hover:bg-slate-50 md:px-5"
                  >
                    <span
                      className={`w-6 shrink-0 text-xs font-medium tabular-nums transition-colors ${
                        isOpen ? "text-primary" : "text-slate-400"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-sm font-semibold text-secondary md:text-base">
                      {item.q}
                    </span>

                    <ChevronDown
                      aria-hidden
                      className={`size-4 shrink-0 text-slate-400 transition-transform duration-200 md:size-5 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {/* Animated height via grid rows */}
                  <div
                    id={panelId}
                    className="grid transition-[grid-template-rows] duration-200 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    aria-label="Frequently asked question answer"
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-14 pr-4 text-sm leading-relaxed text-slate-600 md:pl-[3.75rem] md:pr-8">
                        {item.a && <p>{item.a}</p>}

                        {item.list && (
                          <>
                            <p className="mb-3">
                              Tumatanggap ang FastMet ng iba't ibang uri ng
                              sasakyan tulad ng:
                            </p>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                              {item.list.map((v) => (
                                <li
                                  key={v}
                                  className="flex items-center gap-2 text-secondary"
                                >
                                  <span className="size-1 shrink-0 rounded-full bg-primary" />
                                  {v}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-4 text-xs text-slate-500">
                              Vehicle categories and capacities are subject to
                              FastMet confirmation.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
