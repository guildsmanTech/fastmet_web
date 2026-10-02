import {useCallback, useState} from "react";
import {Helmet} from "react-helmet-async";
import PageContainer from "@/components/PageContainer";
import SubscriptionDashboard from "@/components/subscription/SubscriptionDashboard";
import SubscriptionFaq from "@/components/subscription/SubscriptionFaq";
import SubscriptionLogin from "@/components/subscription/SubscriptionLogin";
import {useSubscriptionSession} from "@/hooks/useSubscriptionSession";

export default function SubscriptionPage() {
  const {session, save, clear} = useSubscriptionSession();
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

      <section className="py-8 bg-secondary md:py-12 lg:py-16">
        <PageContainer>
          <h1 className="mt-2 text-xl font-bold text-primary md:text-4xl">
            Driver Subscription
          </h1>
          <p className="mt-4 max-w-3xl text-sm md:text-base text-white/80">
            Manage your FastMet partner-driver plan, see when it ends, and
            subscribe or renew in just a few steps.
          </p>
        </PageContainer>
      </section>

      <PageContainer className="py-10 md:py-14">
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
      </PageContainer>

      <div className="pb-16 md:pb-20">
        <SubscriptionFaq />
      </div>
    </div>
  );
}
