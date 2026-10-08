import {ChevronDown} from "lucide-react";
import {useState} from "react";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full" id="driver-faq">
      <PageContainer className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 max-w-2xl">
        <h2 className="text-primary font-bold text-2xl md:text-3xl">
          Driver Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-xs md:text-sm">
          Common questions from prospective FastMet partner-drivers.
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
                    {item.a && <p>{item.a}</p>}
                    {item.list && (
                      <>
                        <p className="mb-2">
                          Tumatanggap ang FastMet ng iba't ibang uri ng sasakyan
                          tulad ng:
                        </p>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 list-disc list-inside">
                          {item.list.map((v) => (
                            <li key={v}>{v}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </PageContainer>
    </section>
  );
}
