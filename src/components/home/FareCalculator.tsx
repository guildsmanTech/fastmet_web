// components/fare-calculator.tsx
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import PageContainer from "../PageContainer";
import CTAButton from "../CTAButton";
import { homeUser } from "@/constants/images";

export default function FareCalculator({ className }: { className?: string }) {
  return (
    <PageContainer
      className={cn("w-full max-w-6xl mx-auto px-4 py-16", className)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-secondary px-8 py-12 sm:px-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Magkano ang
              <br />
              Delivery?
              <br />
              <span className="text-primary">Check Mo Muna!</span>
            </h2>

            <div className="max-w-md space-y-3 text-slate-400 text-base leading-relaxed">
              <p>Gustong malaman kung magkano ang delivery bago mag-book?</p>
              <p>
                With the FastMet Fare Calculator, you can check the estimated
                delivery cost based on your pickup location, destination, and
                preferred vehicle.
              </p>
              <p>
                Para may idea ka na sa presyo at mas madaling makapag-plan ng
                delivery budget mo.
              </p>
            </div>

            <div className="space-y-6">
              <CTAButton
                to="/get-a-quote"
                variant="user-soft-border"
                size="md"
                icon={Calculator}
                fullWidth
              >
                Get a Quote
              </CTAButton>

              <p className="max-w-md text-xs text-slate-500">
                Estimated fares may vary depending on the route, vehicle type,
                delivery requirements, and applicable charges.
              </p>
            </div>
          </div>

          {/* Right illustration */}
          <img
            src={homeUser}
            alt="FastMet delivery coverage map across Greater Manila"
            className="aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-white/10"
          />
        </div>
      </div>
    </PageContainer>
  );
}
