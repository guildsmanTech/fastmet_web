import AvailableVehicles from "@/components/DeliveryServices/AvailableVehicles";
import BusinessDeliveryNeeds from "@/components/DeliveryServices/BusinessDeliveryNeeds";
import Documents from "@/components/DeliveryServices/Documents";
import AnoAngFastmet from "@/components/DeliveryServices/Fastmet";
import PaanoMagPreRegister from "@/components/DeliveryServices/PaanoMagPreRegister";
import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {getBusinessInquiryMailto} from "@/helper/constant";
import {servicesBg, servicesMain} from "@/constants/images";

export default function DeliveryServices() {
  return (
    <div className="w-full flex flex-col md:gap-10">
      <section
        className="relative w-full min-h-dvh flex items-center bg-secondary"
        id="hero"
      >
        <img
          src={servicesBg}
          alt="FastMet delivery"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <PageContainer className="relative z-10 py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: headline */}
          <div className="flex flex-col gap-5 text-white max-w-xl">
            <h1 className="text-4xl text-primary md:text-5xl font-extrabold leading-tight">
              May Ipapadala Ka? FastMet Agad!
            </h1>
            <p className="text-white font-semibold text-base md:text-lg">
              Pre-register as a FastMet user and receive official updates about
              our launch, service availability, coverage, promotions, and future
              platform access.
            </p>
            <div className="gap-3 mt-2 hidden lg:flex">
              <CTAButton to="/user-register" variant="user" size="sm" fullWidth>
                Pre-Register as a User
              </CTAButton>
              <CTAButton
                href={getBusinessInquiryMailto()}
                variant="hero-outline"
                size="sm"
                fullWidth
              >
                Send a Business Inquiry
              </CTAButton>
            </div>
          </div>

          <img
            src={servicesMain}
            alt="Fastmet Delivery"
            className="w-full scale-110 md:scale-100 lg:w-1/2"
          />

          <div className="flex flex-col justify-center items-center gap-4 mt-2 w-full lg:hidden">
            <div className="flex gap-1 w-full md:w-5/6">
              <CTAButton
                to="/user-register"
                variant="hero-outline"
                size="sm"
                fullWidth
                className="hover:bg-zinc-200"
              >
                Pre-Register as User
              </CTAButton>
              <CTAButton
                href={getBusinessInquiryMailto()}
                variant="hero-outline"
                size="sm"
                fullWidth
              >
                Business Inquiry
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </section>

      <AnoAngFastmet />
      <Documents />
      <AvailableVehicles />
      <PaanoMagPreRegister />
      <BusinessDeliveryNeeds />

      <section className="w-full bg-white py-12 md:pt-0">
        <PageContainer className="flex flex-col md:flex-row items-center md:justify-between justify-center gap-6">
          <div>
            <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
              Ready ka na sa FastMet?
            </p>
            <p className="text-secondary text-sm mt-3 max-w-md">
              Pre-register today to receive official FastMet updates, exclusive
              delivery vouchers, and a chance to win mobile load worth up to
              ₱500. For business delivery requirements, send us an inquiry and
              let our team learn more about your needs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <CTAButton to="/user-register" variant="outline">
              Pre-Register as a User
            </CTAButton>
            <CTAButton href={getBusinessInquiryMailto()} variant="outline">
              Send a Business Inquiry
            </CTAButton>
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
