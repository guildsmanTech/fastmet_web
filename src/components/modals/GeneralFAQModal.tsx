import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {question} from "@/constants/images";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";

const FAQs = [
  {
    question: "Ano ang FastMet App?",
    answer:
      "Ang FastMet ay isang delivery service app na proudly made by Philippine-based developers, para sa mga Pilipino. Layunin naming magbigay ng mas maayos, mabilis, at maaasahang delivery service habang tumutulong sa mga driver, empleyado, estudyante, professionals, small bussinesses at sa bawat Pilipino para sa kanilang everyday deliveries at errands.",
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
      "Oo naman! May iba’t ibang uri ng sasakyan ang FastMet para sa iba’t ibang delivery needs. Maliit man o malaki, kaya naming i-deliver — from documents to bulk items",
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
    answer: `Available ang FastMet depende sa oras at availability ng mga drivers sa iyong area.
Dahil flexible ang schedule ng drivers, may posibilidad na makapagbook anumang oras, ngunit maaari itong mag-iba depende sa lokasyon.`,
  },
];

export default function GeneralFAQModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex justify-center items-center p-2 bg-white rounded-full border transition-all duration-200 cursor-pointer border-primary hover:bg-primary hover:scale-110">
          <img src={question} alt="question" className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
    z-[999]
    w-[95vw] max-w-lg
    md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
    p-0 overflow-hidden
    rounded-xl
  "
      >
        {/* HEADER */}
        <DialogHeader className="px-4 pt-5 pb-3 border-b">
          <DialogTitle className="text-base font-bold text-center text-primary md:text-xl">
            FastMet FAQs
          </DialogTitle>
        </DialogHeader>

        {/* BODY */}
        <div className="max-h-[75vh] overflow-y-auto px-4 py-4 space-y-4 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <DialogDescription className="sr-only">
            Frequently Asked Questions
          </DialogDescription>

          {FAQs.map(({question, answer, hasLink, extra}, index) => (
            <div key={question} className="space-y-1">
              <p className="text-sm font-semibold text-primary md:text-base">
                {index + 1}. {question}
              </p>

              <p className="text-xs leading-relaxed text-justify md:text-sm">
                {answer}{" "}
                {hasLink && (
                  <a
                    href={DRIVER_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    i-download ang Driver app
                  </a>
                )}
              </p>

              {extra && (
                <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
                  {extra}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex justify-center px-4 py-3 border-t">
          <DialogClose asChild>
            <Button className="bg-primary text-white px-6 py-1.5 text-sm rounded-full">
              Got It
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
