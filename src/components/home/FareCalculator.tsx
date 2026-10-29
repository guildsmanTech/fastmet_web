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
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 sm:px-12 sm:py-16">
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

            <p className="max-w-md text-slate-400 text-base leading-relaxed">
              Alamin ang tinatayang bayad bago ka mag-book, para walang sorpresa
              sa dulo ng biyahe.
            </p>

            <CTAButton
              to="/get-a-quote"
              variant="user-soft-border"
              size="md"
              icon={Calculator}
              fullWidth
            >
              Get a Quote
            </CTAButton>
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
