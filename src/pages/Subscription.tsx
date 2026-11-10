import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageContainer from "@/components/PageContainer";
import SubscriptionDashboard from "@/components/subscription/SubscriptionDashboard";
import SubscriptionFaq from "@/components/subscription/SubscriptionFaq";
import SubscriptionLogin from "@/components/subscription/SubscriptionLogin";
import { useSubscriptionSession } from "@/hooks/useSubscriptionSession";

export default function SubscriptionPage() {
  const { session, save, clear } = useSubscriptionSession();
  const [notice, setNotice] = useState("");

  const handleLoggedIn = useCallback(
    (token: string, expiresInSeconds: number, firstName: string) => {
      setNotice("");
      save(token, expiresInSeconds, firstName);
    },
    [save],
  );

  const handleSessionExpired = useCallback(() => {
    setNotice("Your session expired. Please log in again.");
    clear();
  }, [clear]);

  return (
    <div className="pt-8 bg-white">
      <Helmet>
        <title>Driver Subscription | FastMet</title>
        <meta
          name="description"
          content="Log in with your mobile number to view your FastMet driver subscription and choose a plan."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="pb-8 pt-6 bg-slate-50 md:py-12 lg:py-16 px-8 md:px-0">
        <PageContainer className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start py-20 px-0">
          {/* Left column – Login / Dashboard */}
          <div className="lg:col-span-6 order-2">
            {session ? (
              <SubscriptionDashboard
                token={session.token}
                firstName={session.firstName}
                onLogout={clear}
                onSessionExpired={handleSessionExpired}
              />
            ) : (
              <SubscriptionLogin notice={notice} onLoggedIn={handleLoggedIn} />
            )}
          </div>

          {/* Right column – CTA text */}
          <div className="order-1 lg:col-span-6 lg:pt-4">
            <h1 className="text-3xl font-bold text-secondary md:text-4xl lg:text-5xl leading-tight">
              Get started with your{" "}
              <span className="text-primary">Driver Subscription</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
              Manage your FastMet partner-driver plan, see when it ends, and
              subscribe or renew in just a few steps. Log in with the mobile
              number linked to your driver account to view your active plan,
              check remaining days, and choose a new subscription whenever
              you’re ready.
            </p>
          </div>
        </PageContainer>
      </section>

      <div className="pb-16 md:pb-20">
        <SubscriptionFaq />
      </div>
    </div>
  );
}
