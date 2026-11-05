import { bir, sec } from "@/constants/images";
import PageContainer from "../PageContainer";

const registrations = [
  {
    image: sec,
    alt: "SEC certificate of incorporation",
    badge: "SEC",
    title: "Certificate of incorporation",
    regNo: "Registration No. 2026070259894-15",
  },
  {
    image: bir,
    alt: "BIR certificate of registration",
    badge: "BIR",
    title: "Certificate of registration",
    regNo: "BIR registered & verified official BIR registration seal badge",
  },
];

export default function Registrations() {
  return (
    <section className="w-full bg-secondary text-white py-16 md:py-24 lg:py-32 px-3">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column – copy */}
          <div className="flex flex-col gap-5 order-1 md:order-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Registered. Legit.
                <br />
                <span className="text-primary">Proudly Pinoy.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md">
              Rehistrado ang FastMet sa SEC at BIR. May opisyal na resibo ang
              bawat padala, at puwedeng mong tingnan ang mga papeles namin
              anumang oras.
            </p>

            <div className="flex flex-col gap-4 mt-2 text-sm">
              <div className="flex gap-4">
                <span className="font-bold text-white w-10 shrink-0">SEC</span>
                <span className="text-zinc-300">
                  Rehistradong korporasyon sa Pilipinas
                </span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-white w-10 shrink-0">BIR</span>
                <span className="text-zinc-300">
                  May certificate of registration at opisyal na resibo
                </span>
              </div>
            </div>
          </div>

          {/* Right column – certificate cards */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-end w-full">
            {registrations.map((reg) => (
              <div
                key={reg.badge}
                className="bg-white text-zinc-900 rounded-xl shadow-lg overflow-hidden w-full md:max-w-[350px] flex flex-col"
              >
                {/* Certificate mockup */}
                <div className="relative p-5 pb-4 flex-1">
                  <img
                    src={reg.image}
                    alt={reg.alt}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-zinc-100">
                  <p className="text-[10px] font-semibold tracking-wide text-zinc-500 uppercase mb-1">
                    {reg.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{reg.regNo}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        reg.badge === "SEC"
                          ? "text-yellow-500"
                          : "text-orange-500"
                      }`}
                    >
                      {reg.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
