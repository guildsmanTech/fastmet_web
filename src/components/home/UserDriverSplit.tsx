import CTAButton from "@/components/CTAButton";
import {homeUser, homeDriver} from "@/constants/images";
import {UserRound, Truck, ChevronRight} from "lucide-react";
import PageContainer from "@/components/PageContainer";

export default function UserDriverSplit() {
  return (
    <section className="w-full">
      <PageContainer className="flex flex-col md:flex-row gap-10 md:gap-3">
        {/* User card */}
        <div className="flex-1 flex flex-col gap-4">
          <img
            className="w-full aspect-[4/3] lg:aspect-auto rounded-2xl "
            src={homeUser}
            alt="User"
          />
          <h3 className="text-primary font-bold text-lg">May ipapadala ka?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Pre-register as a FastMet user para makatanggap ng official updates
            tungkol sa service availability, coverage, promos, at future
            platform access.
          </p>
          <CTAButton
            to="/user-register"
            variant="primary"
            icon={UserRound}
            className="w-fit px-5 py-2.5"
          >
            Pre-Register as a User
          </CTAButton>
        </div>

        {/* Driver card */}
        <div className="flex-1 flex flex-col gap-4">
          <img
            className="w-full aspect-[4/3] lg:aspect-auto rounded-2xl"
            src={homeDriver}
            alt="Driver"
          />
          <h3 className="text-primary font-bold text-lg">May Sasakyan Ka?</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Pre-register as a FastMet partner-driver para makatanggap ng updates
            tungkol sa onboarding, activation, at future delivery opportunities.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <CTAButton
              to="/driver-register"
              variant="primary"
              icon={Truck}
              className="w-fit px-5 py-2.5"
            >
              Pre-Register as a Driver
            </CTAButton>
            <ChevronRight className="text-primary size-4 shrink-0" />
            <span className="leading-tight">
              <span className="block text-[10px] text-gray-500">
                Introductory
              </span>
              <span className="text-primary font-bold text-2xl">
                0%{" "}
                <span className="font-semibold text-gray-700 text-sm">
                  Commission
                </span>
              </span>
            </span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
