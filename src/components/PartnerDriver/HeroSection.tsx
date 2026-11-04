import { partnerBg, partnerMain } from "@/constants/images";
import PageContainer from "../PageContainer";
import { DRIVER_PLAY_STORE_URL } from "@/helper/constant";
import CTAButton from "../CTAButton";
import { BadgeCheck, Smartphone } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-dvh flex items-center bg-secondary pt-10 md:pt-0"
      id="hero"
    >
      <img
        src={partnerBg}
        alt="FastMet delivery"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <PageContainer className="relative z-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: headline */}
        <div className="flex flex-col gap-5 text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight">
            May Sasakyan Ka? <br /> FastMet Agad!
          </h1>

          <p className="text-white font-semibold text-base md:text-lg">
            Maging FastMet partner-driver at gamitin ang iyong sasakyan para sa
            mga delivery earning opportunities.
          </p>

          {/* Highlight */}
          <div>
            <p className="text-primary font-extrabold text-xl md:text-2xl">
              Zero Commission. For Life.
            </p>
            <p className="text-white/90 text-sm md:text-base mt-1">
              Sa FastMet, walang commission na ibabawas sa bawat delivery.
              Through our subscription-based model, you keep 100% of your
              delivery earnings.
            </p>
          </div>

          {/* Desktop CTAs */}
          <div className="mt-2 hidden lg:flex gap-3">
            <CTAButton
              href={DRIVER_PLAY_STORE_URL}
              variant="driver"
              size="sm"
              icon={Smartphone}
              className="px-10"
            >
              Become a Partner-Driver
            </CTAButton>
            <CTAButton
              to="/subscription"
              variant="user"
              size="md"
              icon={BadgeCheck}
              className="px-6"
            >
              Get Subscription
            </CTAButton>
          </div>

          {/* Small note */}
          <p className="hidden md:block text-white/70 text-xs md:text-sm mt-1 max-w-md">
            Subscription fees and applicable terms and conditions apply.
            Partner-driver applications are subject to review and verification.
          </p>
        </div>

        <img
          src={partnerMain}
          alt="FastMet delivery"
          className="w-full md:w-1/2 object-cover hidden md:block"
        />

        {/* Mobile CTAs */}
        <div className="mt-2 w-full lg:hidden flex flex-col items-center gap-3">
          <CTAButton
            href={DRIVER_PLAY_STORE_URL}
            variant="driver"
            size="sm"
            icon={Smartphone}
            className="w-full"
          >
            Become a Partner-Driver
          </CTAButton>
          <CTAButton
            to="/subscription"
            variant="user"
            size="md"
            icon={BadgeCheck}
            className="px-6 w-full"
          >
            Get Subscription
          </CTAButton>

          <p className="text-white/70 text-xs text-center max-w-sm mt-1">
            Subscription fees and applicable terms and conditions apply.
            Partner-driver applications are subject to review and verification.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
