import { aboutBg, aboutMain } from "@/constants/images";
import CTAButton from "@/components/CTAButton";
import PageContainer from "../PageContainer";

const heroCtaClass: string =
  "w-full px-5 py-2.5 text-xs sm:w-auto sm:px-6 sm:py-3 sm:text-sm";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-dvh w-full items-center overflow-hidden bg-secondary pt-10 md:pt-0 px-3 md:px-0"
      id="hero"
    >
      <img
        src={aboutBg}
        alt="FastMet delivery"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-secondary/85" />

      <PageContainer className="relative z-10 flex flex-col items-center justify-between gap-10 py-16 md:py-20 lg:flex-row lg:gap-12">
        {/* Left: Content */}
        <div className="flex w-full max-w-2xl flex-col gap-6 text-white lg:flex-1">
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Gawang Pinoy. <span className="block">Para sa Pinoy.</span>
            </h1>

            <div className="flex flex-col gap-3 max-w-xl text-[13px] font-medium leading-relaxed text-white/90 sm:text-sm md:gap-4 lg:text-[15px] 2xl:text-base">
              <p>
                FastMet is a proudly Filipino-made delivery platform connecting
                individuals, online sellers, and businesses with the right
                vehicle and partner-driver for their delivery needs.
              </p>
              <p>
                Para sa aming partner-drivers, bagong sistema ang hatid namin:{" "}
                <span className="text-primary">Zero commission for life.</span>{" "}
                Through our subscription-based model.
              </p>
            </div>
          </div>

          {/* Desktop & Mobile CTAs */}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton
              to="/user-register"
              variant="user"
              size="md"
              className={`${heroCtaClass} text-secondary shadow-lg w-full justify-center sm:w-fit`}
            >
              Register as a User
            </CTAButton>

            <CTAButton
              to="/partner-driver"
              variant="driver"
              size="md"
              className={`${heroCtaClass} w-full justify-center sm:w-fit`}
            >
              Become a Partner-Driver
            </CTAButton>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full lg:flex-1 hidden md:block">
          <img
            src={aboutMain}
            alt="FastMet delivery"
            className="mx-auto aspect-[5/4] w-full max-w-xl rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </PageContainer>
    </section>
  );
}
