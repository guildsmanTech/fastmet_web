import {ChevronDown} from "lucide-react";
import {useState} from "react";
import PageContainer from "@/components/PageContainer";
import {SUPPORT_EMAIL} from "@/helper/constant";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full" id="subscription-faq">
      <PageContainer className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 max-w-2xl">
          <h2 className="text-primary font-bold text-2xl md:text-3xl">
            Subscription Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-xs md:text-sm">
            Common questions from FastMet partner-drivers about subscriptions.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className={`rounded-xl border transition-colors ${
                  isOpen
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white hover:border-primary/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-4 md:px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex items-center justify-center size-7 md:size-8 shrink-0 rounded-full text-xs md:text-sm font-bold transition-colors ${
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </span>

                  <span className="flex-1 text-secondary font-semibold text-xs md:text-sm">
                    {item.q}
                  </span>

                  <ChevronDown
                    className={`size-4 md:size-5 shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-200 ease-out"
                  style={{gridTemplateRows: isOpen ? "1fr" : "0fr"}}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 md:px-5 pb-4 pl-15 md:pl-17 text-gray-600 text-xs md:text-sm leading-relaxed">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {SUPPORT_EMAIL && (
          <p className="text-xs md:text-sm text-gray-500">
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
      </PageContainer>
    </section>
  );
}
