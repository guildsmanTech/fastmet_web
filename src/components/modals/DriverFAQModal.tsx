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
import {Link} from "react-router-dom";

const DRIVER_FAQS = [
  {
    question: "Paano maging driver ng FastMet?",
    answer:
      "Bukas na ang aming pre-registration para sa mga gustong maging driver-partner.",
    hasLink: true,
    extra:
      "Maging isa sa mga unang driver ng FastMet at magkaroon ng chance na manalo ng cash prizes at exclusive merchandise sa aming official launch.",
  },
  {
    question: "Magkano ang commission rate sa FastMet?",
    answer:
      "Sa simula, magpapatupad ang FastMet ng zero-based commission, ibig sabihin mas malaki ang maiuuwi mong kita bilang driver.",
    extra: "Ito ay introductory offer at maaaring magbago sa hinaharap.",
  },
  {
    question: "Ano ang mga sasakyan na puwedeng i-register?",
    answer: "Maaaring mag-register ang iba’t ibang uri ng sasakyan:",
    list: [
      "2-wheel (motorsiklo)",
      "4-wheel (sedan, SUV, van, L300)",
      "6-wheel (trucks)",
    ],
    extra:
      "Kahit anong klase ng sasakyan, may opportunity kang kumita sa FastMet.",
  },
  {
    question: "May bayad ba ang registration?",
    answer:
      "Libre ang registration sa FastMet. Gayunpaman, may security deposit na kinakailangan ihanda.",
  },
  {
    question: "Ano ang mga requirements para maging driver?",
    answer: "Narito ang mga basic requirements:",
    list: [
      "Valid Driver’s License",
      "OR/CR ng sasakyan",
      "Valid Government ID",
      "Active Mobile Number at smartphone",
      "Selfie / Profile Photo",
      "NBI Clearance",
    ],
    extra:
      "Maaaring may additional requirements depende sa verification process.",
  },
];

export function DriverFAQModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 bg-white rounded-full border transition-all duration-200 cursor-pointer border-primary hover:bg-primary hover:scale-110">
          <img src={question} alt="question" className="size-5 sm:size-6" />
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
        {/* HEADER (fixed) */}
        <DialogHeader className="px-4 pt-5 pb-3 border-b">
          <DialogTitle className="text-base font-bold text-center text-primary md:text-xl">
            Driver FAQs
          </DialogTitle>
        </DialogHeader>

        {/* SCROLLABLE CONTENT */}
        <div
          className="
      max-h-[75vh]
      overflow-y-auto
      px-4 py-4
      space-y-4
      [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent
    "
        >
          <DialogDescription className="sr-only">
            Frequently Asked Questions
          </DialogDescription>

          {DRIVER_FAQS.map(
            ({question, answer, hasLink, extra, list}, index) => (
              <div key={question} className="space-y-1">
                <p className="text-sm font-semibold text-primary md:text-base">
                  {index + 1}. {question}
                </p>

                <p className="text-xs leading-relaxed text-justify md:text-sm">
                  {answer}{" "}
                  {hasLink && (
                    <DialogClose asChild>
                      <Link
                        to="/driver-register"
                        className="text-blue-600 underline"
                      >
                        mag-register dito
                      </Link>
                    </DialogClose>
                  )}
                </p>

                {list && (
                  <ul className="ml-5 space-y-1 text-xs list-disc md:text-sm">
                    {list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {extra && (
                  <p className="text-xs leading-relaxed text-gray-600 md:text-sm">
                    {extra}
                  </p>
                )}
              </div>
            ),
          )}
        </div>

        {/* FOOTER (fixed) */}
        <div className="flex justify-center px-4 py-3 border-t">
          <DialogClose asChild>
            <Button className="border border-primary cursor-pointer hover:bg-orange-500 bg-primary text-white px-10 py-1.5 text-sm rounded-full font-bold transition">
              Got It
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
