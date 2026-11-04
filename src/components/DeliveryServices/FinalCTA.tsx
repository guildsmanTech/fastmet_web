import PageContainer from "../PageContainer";
import CTAButton from "../CTAButton";
import { getBusinessInquiryMailto } from "@/helper/constant";

export default function FinalCTA() {
  return (
    <section className="w-full bg-primary py-20 lg:py-24">
      <PageContainer className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Ready ka na sa FastMet?
          </h2>
          <div className="text-sm leading-relaxed text-secondary/80 sm:text-base space-y-2">
            <p>
              Register now and enjoy affordable delivery services, available
              24/7. Maliit na parcel man o malaking cargo, piliin ang FastMet
              vehicle option na angkop sa padala mo.
            </p>
            <p>
              May business delivery requirements? Send us an inquiry para
              mapag-usapan natin ang delivery needs mo.
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          {/* Primary action: solid dark so it stands out on the yellow-orange background */}
          <CTAButton
            to="/user-register"
            variant="outline"
            className="justify-center border-secondary bg-secondary px-7 py-3 text-white hover:bg-secondary/90 hover:text-white"
          >
            Pre-Register as a User
          </CTAButton>

          {/* Secondary action: outlined, same height */}
          <CTAButton
            href={getBusinessInquiryMailto()}
            variant="outline"
            className="justify-center border-secondary bg-transparent px-7 py-3 text-secondary hover:bg-secondary/10 hover:text-secondary"
          >
            Send a Business Inquiry
          </CTAButton>
        </div>
      </PageContainer>
    </section>
  );
}
