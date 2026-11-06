import {
  aboutBg,
  aboutUser,
  aboutBusiness,
  aboutTruck,
  logo,
} from "@/constants/images";
import PageContainer from "@/components/PageContainer";

const needs = [
  {
    icon: aboutUser,
    label: "Users",
    desc: "Need a simple and convenient delivery option.",
  },
  {
    icon: aboutBusiness,
    label: "Businesses",
    desc: "Need dependable support for daily operations.",
  },
  {
    icon: aboutTruck,
    label: "Partner-Drivers",
    desc: "Need flexible earning opportunities.",
  },
];

export default function ConnectNeeds() {
  return (
    <section className="relative w-full py-10 lg:py-0 lg:pb-10 overflow-hidden">
      <img
        src={aboutBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-secondary/85" />

      <PageContainer className="relative z-10">
        {/* Desktop / tablet */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative w-full h-[420px] lg:h-[480px]">
            <svg
              viewBox="0 0 1600 700"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              <line
                x1="920"
                y1="380"
                x2="480"
                y2="255"
                stroke="currentColor"
                className="text-primary/60"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="0.5 30"
                strokeDashoffset="5"
              />
              <line
                x1="680"
                y1="380"
                x2="1120"
                y2="255"
                stroke="currentColor"
                className="text-primary/60"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="0.5 30"
                strokeDashoffset="5"
              />
              <line
                x1="800"
                y1="450"
                x2="800"
                y2="560"
                stroke="currentColor"
                className="text-primary/60"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="0.5 30"
                strokeDashoffset="15"
              />
            </svg>

            <div
              className="absolute flex items-center justify-center rounded-full border border-primary/30 size-[220px]"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex items-center justify-center rounded-full border border-primary/30 size-[175px]">
                <div className="flex items-center flex-col justify-center rounded-full bg-white size-[130px] font-extrabold text-secondary text-base">
                  <img src={logo} alt="FastMet logo" className="size-12" />
                  <span>FastMet</span>
                </div>
              </div>
            </div>

            <div
              className="absolute flex items-center gap-3 max-w-[230px]"
              style={{
                left: "20.6%",
                top: "32.9%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={needs[0].icon}
                alt=""
                className="size-14 object-contain shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="text-primary font-semibold text-base">
                  {needs[0].label}
                </span>
                <p className="text-white/80 text-sm leading-relaxed">
                  {needs[0].desc}
                </p>
              </div>
            </div>

            <div
              className="absolute flex items-center gap-3 max-w-[230px]"
              style={{
                left: "79.4%",
                top: "32.9%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={needs[1].icon}
                alt=""
                className="size-14 object-contain shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="text-primary font-semibold text-base">
                  {needs[1].label}
                </span>
                <p className="text-white/80 text-sm leading-relaxed">
                  {needs[1].desc}
                </p>
              </div>
            </div>

            <div
              className="absolute flex items-center gap-3 max-w-[230px]"
              style={{
                left: "50%",
                top: "87%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={needs[2].icon}
                alt=""
                className="size-14 object-contain shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="text-primary font-semibold text-base">
                  {needs[2].label}
                </span>
                <p className="text-white/80 text-sm leading-relaxed">
                  {needs[2].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center">
          <div className="flex items-center justify-center rounded-full border border-primary/30 size-[110px]">
            <div className="flex flex-col items-center justify-center rounded-full bg-white size-[80px] font-extrabold text-secondary text-xs">
              <img src={logo} alt="FastMet logo" className="size-6" />
              FastMet
            </div>
          </div>

          <div className="flex flex-col mt-2 w-full max-w-xs">
            {needs.map((need) => (
              <div key={need.label} className="flex flex-col items-center">
                <div className="h-6 w-px border-l border-dashed border-primary/60" />
                <div className="flex flex-col items-center gap-1 text-center mt-1">
                  <img
                    src={need.icon}
                    alt=""
                    className="size-12 object-contain"
                  />
                  <span className="text-primary font-semibold text-sm">
                    {need.label}
                  </span>
                  <p className="text-white/80 text-xs leading-relaxed max-w-[220px]">
                    {need.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
