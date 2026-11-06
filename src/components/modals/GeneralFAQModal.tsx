import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { question } from "@/constants/images";
import { DRIVER_PLAY_STORE_URL } from "@/helper/constant";

type FAQ = {
  question: string;
  answer: string;
  hasLink?: boolean;
  extra?: string;
};

const FAQS: FAQ[] = [
  {
    question: "Ano ang FastMet App?",
    answer:
      "Ang FastMet ay isang delivery service app na proudly made by Philippine-based developers, para sa mga Pilipino. Layunin naming magbigay ng mas maayos, mabilis, at maaasahang delivery service habang tumutulong sa mga driver, empleyado, estudyante, professionals, small businesses at sa bawat Pilipino para sa kanilang everyday deliveries at errands.",
  },
  {
    question: "Paano maging driver ng FastMet?",
    answer:
      "I-download ang FastMet Driver app sa Google Play para mag-sign up bilang partner-driver.",
    hasLink: true,
    extra:
      "Maging isa sa mga unang partner drivers at magkaroon ng chance na manalo ng cash prizes at exclusive merchandise sa aming official launch.",
  },
  {
    question: "Puwede bang magpadeliver ng maramihan sa FastMet?",
    answer:
      "Oo naman! May iba’t ibang uri ng sasakyan ang FastMet para sa iba’t ibang delivery needs. Maliit man o malaki, kaya naming i-deliver — from documents to bulk items.",
  },
  {
    question: "May commission ba sa FastMet?",
    answer:
      "Walang commission. Ang mga partner-drivers ay nakakatanggap ng 100% ng kanilang delivery earnings — subscription fee lang ang babayaran.",
    extra:
      "Maaari mong tingnan at i-manage ang driver subscription plans sa Subscription page ng FastMet website.",
  },
  {
    question: "Available ba ang FastMet 24/7?",
    answer:
      "Available ang FastMet depende sa oras at availability ng mga drivers sa iyong area. Dahil flexible ang schedule ng drivers, may posibilidad na makapagbook anumang oras, ngunit maaari itong mag-iba depende sa lokasyon.",
  },
];

export default function GeneralFAQModal() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open frequently asked questions"
          className="size-10 cursor-pointer active:scale-95 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 rounded-full"
        >
          <img src={question} alt="" className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          flex max-h-[88dvh] w-[calc(100%-2rem)] max-w-2xl
          flex-col gap-0 overflow-hidden rounded-lg
          border border-gray-200 bg-white p-0 shadow-xl
        "
      >
        {/* HEADER */}
        <DialogHeader className="shrink-0 border-b border-gray-200 px-6 py-6 text-left sm:px-8 sm:py-7">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-[26px]">
            Frequently asked <span className="text-primary">questions</span>
          </DialogTitle>

          <DialogDescription className="max-w-lg text-sm leading-6 text-gray-500 sm:text-[15px]">
            Find answers to common questions about FastMet and our delivery
            services.
          </DialogDescription>
        </DialogHeader>

        {/* FAQ LIST */}
        <div
          className="
            min-h-0 flex-1 overflow-y-auto overscroll-contain
            px-6 sm:px-8
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
          "
        >
          <div className="divide-y divide-gray-200">
            {FAQS.map(({ question, answer, hasLink, extra }, index) => {
              const isOpen = openIndex === index;
              const triggerId = `${id}-trigger-${index}`;
              const panelId = `${id}-panel-${index}`;

              return (
                <div key={question}>
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="
                        flex w-full items-center justify-between
                        gap-5 py-5 text-left
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-inset
                        focus-visible:ring-primary
                      "
                    >
                      <span
                        className={`
                          text-[14px] font-medium leading-6
                          sm:text-[15px]
                          ${isOpen ? "text-gray-900" : "text-gray-700"}
                        `}
                      >
                        {question}
                      </span>

                      <ChevronDown
                        size={18}
                        aria-hidden="true"
                        className={`
                          shrink-0 text-gray-400
                          transition-transform duration-200
                          ${isOpen ? "rotate-180 text-primary" : ""}
                        `}
                      />
                    </button>
                  </h3>

                  <section
                    id={panelId}
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={`
    grid transition-[grid-template-rows]
    duration-200 ease-out
    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
  `}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-[65ch] space-y-3 pb-5">
                        <p className="text-sm leading-7 text-gray-600 sm:text-[15px]">
                          {answer}

                          {hasLink && (
                            <>
                              {" "}
                              <a
                                href={DRIVER_PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                  font-medium text-primary underline
                                  underline-offset-4
                                  hover:opacity-80
                                  focus-visible:outline-none
                                  focus-visible:ring-2
                                  focus-visible:ring-primary
                                "
                              >
                                I-download ang Driver app
                              </a>
                            </>
                          )}
                        </p>

                        {extra && (
                          <p className="border-l-2 border-gray-300 pl-3 text-sm leading-6 text-gray-500">
                            {extra}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex shrink-0 items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4 sm:px-8">
          <span className="text-xs text-gray-500">
            FastMet Customer Support
          </span>

          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-9 rounded-md border-gray-300 bg-white px-5 text-sm font-medium hover:bg-gray-100"
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
