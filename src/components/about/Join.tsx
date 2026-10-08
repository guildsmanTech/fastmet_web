import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";
import {Calculator, Smartphone} from "lucide-react";

export default function JoinFastMet() {
  return (
    <section className="w-full md:pt-20 py-16 md:py-20 bg-primary mb-5">
      <PageContainer>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-1 mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            Maging Bahagi ng FastMet
          </h2>
          <p className="text-white/90 text-sm font-semibold">
            Whether you need delivery services or want to become a
            partner-driver, get a quote or download the FastMet Driver app
            today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10 max-w-md mx-auto">
          <CTAButton
            to="/get-a-quote"
            variant="user-soft-border"
            size="sm"
            icon={Calculator}
            fullWidth
          >
            Get a Quote
          </CTAButton>
          <CTAButton
            href={DRIVER_PLAY_STORE_URL}
            variant="user-soft-border"
            size="sm"
            icon={Smartphone}
            fullWidth
          >
            Download Driver App
          </CTAButton>
        </div>
      </PageContainer>
    </section>
  );
}
