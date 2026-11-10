import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";

export default function JoinFastMet() {
  return (
    <section className="w-full bg-primary py-20 lg:py-24">
      <PageContainer className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Content */}
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
            Maging bahagi ng FastMet
          </h2>

          <div className="space-y-2 text-sm leading-relaxed text-secondary/80 sm:text-base">
            <p>
              May ipapadala ka o may sasakyang puwedeng gamitin sa delivery?
            </p>
            <p>
              Join FastMet for convenient delivery options and partner-driver
              earning opportunities with{" "}
              <span className="font-semibold text-secondary">
                zero commission for life through our subscription-based model.
              </span>
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <CTAButton
            to="/user-register"
            variant="outline"
            className="justify-center border-secondary bg-secondary px-7 py-3 text-white hover:bg-secondary/90 hover:text-white"
          >
            Pre-register as user
          </CTAButton>

          {/* Subscription access is temporarily disabled.
<CTAButton
            href="/subscription"
            variant="outline"
            className="justify-center border-secondary bg-transparent px-7 py-3 text-secondary hover:bg-secondary/10 hover:text-secondary"
          >
            Become a partner-driver
          </CTAButton>
*/}
        </div>
      </PageContainer>
    </section>
  );
}
