import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
const steps = [
  {
    icon: "📝",
    title: "1. Complete Your Pre-Registration",
    desc: "Provide the required information through the existing FastMet user pre-registration page.",
  },
  {
    icon: "🔔",
    title: "2. Receive Official Updates",
    desc: "FastMet will send launch announcements, service updates, promotions, and next steps through your registered contact details.",
  },
  {
    icon: "📲",
    title: "3. Access FastMet When Available",
    desc: "Once the app and delivery services become available, you will receive instructions on how to download the app and request a delivery.",
  },
];

export default function PaanoMagPreRegister() {
  return (
    <section className="w-full pb-10 pt-10 md:pt-5 bg-white">
      <PageContainer className="text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
          Paano Mag-Pre-Register?
        </h2>

        {/* Desktop: icon row with connectors, text row below aligned to same columns */}
        <div className="hidden sm:block mt-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {i < steps.length - 1 && (
                  <div className="absolute top-10 left-1/2 -translate-y-1/2 w-full pr-10 pl-20 flex items-center gap-1 z-0">
                    <svg
                      viewBox="0 0 100 4"
                      className="flex-1 h-1"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="0"
                        y1="2"
                        x2="100"
                        y2="2"
                        stroke="currentColor"
                        className="text-primary"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="0.5 10"
                      />
                    </svg>
                    <span className="text-primary text-lg shrink-0">
                      &#9654;
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center rounded-full bg-secondary size-20">
                  <span className="text-4xl">{step.icon}</span>
                </div>

                <div className="mt-6 text-left w-full">
                  <h3 className="text-secondary font-bold text-sm">
                    {step.title}
                  </h3>
                  <p className="text-secondary/70 text-xs leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: icon + text sequential per step, vertical arrow connector between */}
        <div className="sm:hidden flex flex-col items-center mt-10 max-w-xs mx-auto">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center rounded-full bg-secondary size-20">
                <span className="text-4xl">{step.icon}</span>
              </div>
              <div className="text-center mt-3">
                <h3 className="text-secondary font-bold text-sm">
                  {step.title}
                </h3>
                <p className="text-secondary/70 text-xs leading-relaxed mt-1">
                  {step.desc}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="flex flex-col items-center gap-1 my-4">
                  <svg
                    viewBox="0 0 4 60"
                    className="w-1 h-14"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="2"
                      y1="0"
                      x2="2"
                      y2="60"
                      stroke="currentColor"
                      className="text-primary"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="0.5 10"
                    />
                  </svg>
                  <span className="text-primary text-lg rotate-90">
                    &#9654;
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <CTAButton to="/" variant="primary" className="mt-10">
          Complete Your Pre-Registration
        </CTAButton>
      </PageContainer>
    </section>
  );
}
