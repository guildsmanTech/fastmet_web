import { servicesBg, servicesMain } from "@/constants/images";
import CTAButton from "../CTAButton";
import { getBusinessInquiryMailto } from "@/helper/constant";
import PageContainer from "../PageContainer";

const heroCtaClass: string =
  "w-full px-5 py-2.5 text-xs sm:w-auto sm:px-6 sm:py-3 sm:text-sm";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center w-full min-h-dvh bg-secondary pt-10 px-3 md:px-0"
      id="hero"
    >
      <img
        src={servicesBg}
        alt="FastMet delivery"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/20" />

      <PageContainer className="relative z-10 flex flex-col justify-between w-full py-16 sm:py-20 lg:py-24 2xl:py-28">
        {/* Main content */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-6">
          {/* Left: headline + text + CTAs */}
          <div className="flex flex-col gap-4 w-full max-w-2xl text-white pt-16 md:pt-0 sm:gap-5 md:gap-6">
            <span className="inline-flex self-start items-center px-3 py-1.5 text-[10px] font-extrabold tracking-wide rounded-full sm:px-3.5 sm:text-[11px] 2xl:text-xs bg-primary text-secondary">
              FastMet delivery benefits
            </span>

            <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.15] text-primary sm:text-4xl lg:text-[2.5rem] 2xl:text-5xl">
              May ipapadala ka? <br /> FastMet agad!
            </h1>

            <div className="flex flex-col gap-3 max-w-xl text-[13px] font-medium leading-relaxed text-white/90 sm:text-sm md:gap-4 lg:text-[15px] 2xl:text-base">
              <p>
                Mula documents at small parcels hanggang business supplies at
                malalaking cargo, may FastMet vehicle option para sa delivery
                needs mo.
              </p>
              <p>
                Register as a FastMet user and enjoy affordable delivery
                services, available 24/7 para sa personal at business deliveries
                mo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <CTAButton
                to="/user-register"
                variant="primary"
                size="md"
                className={`${heroCtaClass} text-secondary shadow-lg flex-1 basis-full sm:flex-none sm:basis-auto`}
              >
                Register now
              </CTAButton>

              <CTAButton
                href={getBusinessInquiryMailto()}
                variant="user"
                size="md"
                className={`${heroCtaClass} flex-1 basis-full sm:flex-none sm:basis-auto`}
              >
                Business inquiry
              </CTAButton>
            </div>

            <p className="max-w-xl text-[10px] leading-relaxed text-white/60 sm:text-[11px]">
              Delivery availability depends on your pickup location,
              destination, vehicle type, cargo requirements, and partner-driver
              availability.
            </p>
          </div>

          {/* Right: vehicle image */}
          <div className="mt-4 md:mt-0 hidden md:flex flex-col gap-3 w-full lg:w-1/2">
            <div className="max-w-xl w-full self-center">
              <img
                src={servicesMain}
                alt="FastMet delivery vehicles"
                className="object-contain w-full"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
