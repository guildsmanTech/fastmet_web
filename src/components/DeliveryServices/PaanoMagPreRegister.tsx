import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";

const steps = [
  {
    icon: "📝",
    title: "1. Complete your information",
    desc: "Ilagay ang iyong name, address, gender, at email. Maaari ka ring mag-upload ng profile picture, pero optional ito.",
  },
  {
    icon: "🔔",
    title: "2. Complete face verification",
    desc: "Sundin ang instructions para makumpleto ang face verification ng iyong account.",
  },
  {
    icon: "📲",
    title: "3. Ready ka nang magpadala!",
    desc: "Kapag kumpleto na ang registration at face verification mo, enjoy affordable delivery services, available 24/7 para sa iba’t ibang delivery needs mo.",
  },
];

export default function PaanoMagPreRegister() {
  return (
    <section className="w-full bg-white py-20 lg:py-28 px-3 md:px-0">
      <PageContainer className="flex flex-col gap-12 lg:gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            How it works
          </p>
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Paano mag-register?
          </h2>
        </div>

        {/* Steps */}
        <ol className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="relative flex gap-5 md:flex-col md:gap-6"
            >
              {/* Connector (SVG dashed line + arrow) */}
              {i < steps.length - 1 && (
                <>
                  {/* Mobile: vertical connector */}
                  <div
                    aria-hidden
                    className="absolute left-5 top-12 -bottom-8 flex -translate-x-1/2 flex-col items-center md:hidden"
                  >
                    <svg
                      viewBox="0 0 4 80"
                      className="h-full w-1 flex-1"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="2"
                        y1="0"
                        x2="2"
                        y2="80"
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="0.5 8"
                      />
                    </svg>
                    <svg
                      viewBox="0 0 12 12"
                      className="mt-0.5 size-3 shrink-0 text-primary"
                      fill="currentColor"
                    >
                      <path d="M6 10L1 2h10L6 10z" />
                    </svg>
                  </div>

                  {/* Desktop: horizontal connector */}
                  <div
                    aria-hidden
                    className="absolute left-14 right-0 top-5 hidden -translate-y-1/2 items-center md:flex"
                  >
                    <svg
                      viewBox="0 0 100 4"
                      className="h-1 flex-1"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="0"
                        y1="2"
                        x2="100"
                        y2="2"
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="0.5 8"
                      />
                    </svg>
                    <svg
                      viewBox="0 0 12 12"
                      className="ml-0.5 size-3.5 shrink-0 text-primary"
                      fill="currentColor"
                    >
                      <path d="M10 6L2 1v10L10 6z" />
                    </svg>
                  </div>
                </>
              )}

              {/* Number badge */}
              <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold tabular-nums text-secondary">
                {i + 1}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-secondary">
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div>
          <CTAButton
            to="/user-register"
            variant="primary"
            className="w-full justify-center px-7 py-3 sm:w-fit"
          >
            Register now
          </CTAButton>
        </div>
      </PageContainer>
    </section>
  );
}
