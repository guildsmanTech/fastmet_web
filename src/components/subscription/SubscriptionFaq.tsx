import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { SUPPORT_EMAIL } from "@/helper/constant";

const FAQ_ITEMS = [
  {
    q: "Saan ako puwedeng bumili ng subscription?",
    a: "Dito lang sa official FastMet website. Mag-log in gamit ang OTP na ipapadala sa mobile number ng iyong driver account, piliin ang plan, at magbayad sa secure na payment page.",
  },
  {
    q: "Anong mga plan ang available?",
    a: "May tatlong plan: 15 days, 1 month (30 days), at 1 year (365 days). Ang presyo ay nakadepende sa kategorya ng iyong sasakyan, at ang eksaktong halaga ay makikita sa plan card bago ka magbayad.",
  },
  {
    q: "Kailan magsisimula ang bilang ng araw ng plan ko?",
    a: "Magsisimula ang plan sa araw na binili mo ito. Kung may opisyal na launch date na hindi pa dumarating, sa launch date magsisimula ang bilang. Kung mayroon ka pang active plan, idadagdag ang bagong plan pagkatapos nito, kaya walang masasayang na araw.",
  },
  {
    q: "Paano ko malalaman na na-activate na ang subscription ko?",
    a: "Pagkatapos ng bayad, ipapakita ng page na ito ang status ng iyong payment. Kapag nakumpirma na, lalabas ang iyong active plan at ang petsa ng pagtatapos nito. Maaari mo ring i-refresh ang FastMet driver app.",
  },
  {
    q: "Nagbayad ako pero wala pa ring active plan. Ano ang gagawin ko?",
    a: "Huwag magbayad ulit. Minsan inaabot ng ilang minuto bago makumpirma ang bayad. I-refresh ang page na ito pagkatapos ng ilang minuto. Kung wala pa ring update, makipag-ugnayan sa aming support at ibigay ang iyong registered mobile number.",
  },
  {
    q: "Hindi ako makapag-log in. Bakit?",
    a: "Kailangang naka-register at na-activate na ng FastMet team ang iyong driver account. Siguraduhing ang mobile number na ginamit ay ang number ng iyong driver account.",
  },
];

export default function SubscriptionFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="subscription-faq"
      className="px-3 md:px-0 w-full py-20 lg:py-28"
    >
      <PageContainer className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Accordion (right column) */}
        <div className="lg:col-span-8 order-2 md:order-1">
          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `subscription-faq-panel-${i}`;

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

                  <div
                    id={panelId}
                    className="grid transition-[grid-template-rows] duration-200 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    aria-label="Frequently asked question answer"
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-14 pr-4 text-sm leading-relaxed text-slate-600 md:pl-[3.75rem] md:pr-8">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {SUPPORT_EMAIL && (
            <p className="mt-6 text-xs text-center md:text-left text-slate-500 md:text-sm">
              Kailangan ng tulong? Mag-email sa{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="font-semibold text-primary hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          )}
        </div>

        {/* Header (left column on desktop) */}
        <div className="lg:col-span-4 order-1 md:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            FAQ
          </p>

          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Subscription frequently asked{" "}
            <span className="text-primary">questions.</span>
          </h2>

          <div className="max-w-lg space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base mt-3">
            <p>
              Common questions from FastMet partner-drivers about subscriptions.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
