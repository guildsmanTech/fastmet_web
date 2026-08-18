import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {UserRound, Truck} from "lucide-react";

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
            partner-driver, pre-register today and receive official FastMet
            updates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10 max-w-md mx-auto">
          <CTAButton
            to="/user-register"
            variant="user-soft-border"
            size="sm"
            icon={UserRound}
            fullWidth
          >
            Pre-Register as a User
          </CTAButton>
          <CTAButton
            to="/driver-register"
            variant="user-soft-border"
            size="sm"
            icon={Truck}
            fullWidth
          >
            Pre-Register as a Driver
          </CTAButton>
        </div>
      </PageContainer>
    </section>
  );
}
