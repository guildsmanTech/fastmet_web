import {ChevronDown} from "lucide-react";
import {useState} from "react";

const FAQ_ITEMS = [
  {
    q: "Libre ba ang pre-registration?",
    a: "Oo. Libre ang pre-registration para maging FastMet partner-driver. Maaari kang mag-submit ng iyong application online.",
  },
  {
    q: "Paano gumagana ang introductory 0% commission?",
    a: "Sa panahon ng introductory zero-commission period, ang mga eligible partner-drivers ay makakapag-uwi ng 100% ng kanilang delivery earnings. Ipapadala ang buong detalye sa pamamagitan ng official FastMet updates.",
  },
  {
    q: "Automatic approved ba agad pagkatapos mag-pre-register?",
    a: "Hindi. Ang pre-registration ay unang hakbang pa lamang. Magpapadala ang FastMet ng updates tungkol sa susunod na proseso.",
  },
  {
    q: "Kailan ako makakapagsimulang bumiyahe?",
    a: "Makakatanggap ang mga registered drivers ng official updates kapag available na ang onboarding, activation, at delivery opportunities.",
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
    q: "Anong mga sasakyan ang puwedeng i-pre-register?",
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
    <section
      className="w-full px-4 md:px-12 xl:px-20 flex flex-col gap-8"
      id="driver-faq"
    >
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
    </section>
  );
}
