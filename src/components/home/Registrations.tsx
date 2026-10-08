import { bir, sec } from "@/constants/images";
import PageContainer from "../PageContainer";

const registrations = [
  {
    image: sec,
    alt: "SEC Registration",
    title: "SEC Registered",
    subtitle: "Registration No. 2026070259894-15",
  },
  {
    image: bir,
    alt: "BIR Registration Seal Badge",
    title: "BIR Registered & Verified",
    subtitle: "Official BIR Registration Seal Badge",
  },
];

export default function Registrations() {
  return (
    <section className="w-full">
      <PageContainer>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-3 mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
            Registered. Trusted. Ready to Serve.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            FastMet Inc. is a Philippine company committed to providing reliable
            delivery solutions for businesses and communities.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-14 max-w-4xl mx-auto">
          {registrations.map((reg, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 w-full max-w-sm"
            >
              <div className="w-full border-2 border-primary rounded-lg p-4 bg-white">
                <img
                  src={reg.image}
                  alt={reg.alt}
                  className="w-full h-40 md:h-50 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900">
                  {reg.title}
                </h3>
                <p className="font-bold text-sm sm:text-base text-zinc-900">
                  {reg.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
