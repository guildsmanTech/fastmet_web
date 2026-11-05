// components/fare-calculator.tsx
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import PageContainer from "../PageContainer";
import CTAButton from "../CTAButton";
import { homeFareCalcu } from "@/constants/images";

export default function FareCalculator({ className }: { className?: string }) {
  return (
    <PageContainer
      className={cn("w-full max-w-6xl mx-auto px-6 py-16", className)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-10 md:py-12 sm:px-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center md:px-2">
          {/* Left illustration */}
          <img
            src={homeFareCalcu}
            alt="FastMet delivery coverage map across Greater Manila"
            className="aspect-[3/3] md:aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-white/10 order-1 bg-primary"
          />

          {/* Right content */}
          <div className="space-y-6 order-2">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Magkano ang
              <br />
              delivery?
              <br />
              <span className="text-primary">Check mo muna!</span>
            </h2>

            <div className="max-w-md space-y-3 text-slate-400 text-base leading-relaxed">
              <p>Gustong malaman kung magkano ang delivery bago mag-book?</p>
              <p>
                With the FastMet fare calculator, you can check the estimated
                delivery cost based on your pickup location, destination, and
                preferred vehicle.
              </p>
              <p>
                Para may idea ka na sa presyo at mas madaling makapag-plan ng
                delivery budget mo.
              </p>
            </div>

            <div className="space-y-6 flex flex-col items-center justify-center md:items-start">
              <CTAButton
                to="/get-a-quote"
                variant="user-soft-border"
                size="md"
                icon={Calculator}
                className="w-full sm:w-auto"
              >
                Get a quote
              </CTAButton>

              <p className="max-w-md text-xs text-slate-500">
                Estimated fares may vary depending on the route, vehicle type,
                delivery requirements, and applicable charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}