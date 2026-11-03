import PageContainer from "@/components/PageContainer";
import CTAButton from "../CTAButton";
import { ArrowUpRight, Calculator } from "lucide-react";

export default function ClosingCTA() {
  return (
    <section className="w-full bg-primary">
      <PageContainer className="py-12 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-center text-center gap-10">
          {/* Left side – Text + Buttons */}
          <div className="flex flex-col gap-5 max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
              Tara Na, FastMet Na!
            </h2>

            <p className="text-sm font-semibold text-zinc-900 bg-secondary/10 rounded-full px-4 py-2 w-fit self-center">
              Gawang Pinoy. Para sa Pinoy.
            </p>

            <p className="text-zinc-800 text-sm sm:text-base leading-relaxed">
              May ipapadala ka ba o gusto mong kumita gamit ang iyong sasakyan?
              <br />
              FastMet brings together convenient delivery options for customers
              and zero-commission earning opportunities for partner-drivers.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2">
              <CTAButton
                to="/user-register"
                className="bg-secondary text-white hover:bg-secondary/90 transition whitespace-nowrap px-6 py-3.5 text-sm font-semibold"
              >
                Mag-book ng pickup
                <ArrowUpRight className="ml-1" size={16} />
              </CTAButton>
              <CTAButton
                variant="outline"
                to="/get-a-quote"
                className="whitespace-nowrap px-6 py-3.5 text-sm font-semibold"
              >
                Check rates
                <Calculator className="text-secondary ml-1" size={16} />
              </CTAButton>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
