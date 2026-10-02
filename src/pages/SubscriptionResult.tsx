import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Link, useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {CircleCheck, CircleX, Clock, Loader2, ShieldAlert} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import {fetchCheckout, SubscriptionApiError} from "@/api/subscription";
import {SUPPORT_EMAIL} from "@/helper/constant";
import {formatDay} from "@/helper/subscription";
import {useSubscriptionSession} from "@/hooks/useSubscriptionSession";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 40; // ~2 minutes, then the driver can refresh manually

function Panel({
  icon,
  title,
  children,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  tone: string;
}) {
  return (
    <div className="flex flex-col items-center max-w-lg gap-3 p-6 mx-auto text-center bg-white border border-gray-200 md:p-10 rounded-2xl shadow-sm">
      <div
        className={`flex items-center justify-center rounded-full size-14 ${tone}`}
      >
        {icon}
      </div>
      <h2 className="text-lg font-bold md:text-xl text-secondary">{title}</h2>
      <div className="text-xs leading-relaxed text-gray-600 md:text-sm">
        {children}
      </div>
    </div>
  );
}

function BackLink({label = "Back to my subscription"}: {label?: string}) {
  return (
    <Link
      to="/subscription"
      className="inline-block px-5 py-2.5 mt-2 text-sm font-semibold text-white rounded-full bg-primary hover:bg-primary-hover"
    >
      {label}
    </Link>
  );
}

export default function SubscriptionResultPage() {
  const [params] = useSearchParams();
  const id = params.get("id") ?? "";
  const {session, clear} = useSubscriptionSession();
  const [polls, setPolls] = useState(0);

  const query = useQuery({
    queryKey: ["subscription", "checkout", id],
    queryFn: async () => {
      setPolls((n) => n + 1);
      return fetchCheckout(session!.token, id);
    },
    enabled: Boolean(session && id),
    staleTime: 0,
    retry: false,
    // The webhook can lag behind the redirect: keep asking until it settles.
    refetchInterval: (q) =>
      q.state.data?.status === "pending" && q.state.dataUpdateCount < MAX_POLLS
        ? POLL_INTERVAL_MS
        : false,
  });

  const expired =
    query.error instanceof SubscriptionApiError && query.error.sessionExpired;
  useEffect(() => {
    if (expired) clear();
  }, [expired, clear]);

  const state = query.data;
  const stillWaiting = state?.status === "pending" && polls >= MAX_POLLS;

  let body: React.ReactNode;
  if (!id || !session || expired) {
    body = (
      <Panel
        icon={<ShieldAlert className="size-7" />}
        tone="bg-amber-100 text-amber-700"
        title="Log in to see your payment status"
      >
        <p>
          For your security, please log in again on the subscription page to
          check the status of your payment.
        </p>
        <BackLink label="Go to subscription page" />
      </Panel>
    );
  } else if (query.isPending) {
    body = (
      <Panel
        icon={<Loader2 className="size-7 animate-spin" />}
        tone="bg-primary/10 text-primary"
        title="Checking your payment…"
      >
        <p>This only takes a moment.</p>
      </Panel>
    );
  } else if (query.isError || !state) {
    body = (
      <Panel
        icon={<CircleX className="size-7" />}
        tone="bg-red-100 text-red-700"
        title="We couldn't check your payment"
      >
        <p>{query.error?.message ?? "Please try again."}</p>
        <p className="mt-2">
          If you already paid, please don&apos;t pay again — your plan will
          appear on your subscription page once the payment is confirmed.
        </p>
        <button
          type="button"
          onClick={() => void query.refetch()}
          className="px-5 py-2.5 mt-3 text-sm font-semibold text-white rounded-full cursor-pointer bg-primary hover:bg-primary-hover"
        >
          Try again
        </button>
      </Panel>
    );
  } else if (state.status === "completed") {
    body = (
      <Panel
        icon={<CircleCheck className="size-7" />}
        tone="bg-green-100 text-green-700"
        title="Payment confirmed"
      >
        <p>
          Your <span className="font-semibold">{state.label}</span> plan is
          active.
        </p>
        {state.startsOn && state.endsOn && (
          <p className="mt-2 font-semibold text-secondary">
            {formatDay(state.startsOn)} – {formatDay(state.endsOn)}
          </p>
        )}
        <BackLink />
      </Panel>
    );
  } else if (state.status === "under_review") {
    body = (
      <Panel
        icon={<ShieldAlert className="size-7" />}
        tone="bg-blue-100 text-blue-700"
        title="Your payment is under review"
      >
        <p>
          We received your payment but need to verify it before activating your
          plan. Please don&apos;t pay again.
        </p>
        {SUPPORT_EMAIL && (
          <p className="mt-2">
            Questions? Email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-primary hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        )}
        <BackLink />
      </Panel>
    );
  } else if (state.status === "closed") {
    body = (
      <Panel
        icon={<CircleX className="size-7" />}
        tone="bg-gray-100 text-gray-600"
        title="Payment was not completed"
      >
        <p>You were not charged for this checkout. You can try again anytime.</p>
        <BackLink label="Choose a plan" />
      </Panel>
    );
  } else {
    body = (
      <Panel
        icon={
          stillWaiting ? (
            <Clock className="size-7" />
          ) : (
            <Loader2 className="size-7 animate-spin" />
          )
        }
        tone="bg-primary/10 text-primary"
        title={stillWaiting ? "Still confirming your payment" : "Confirming your payment…"}
      >
        <p>
          {stillWaiting
            ? "It's taking longer than usual. Please don't pay again — refresh this page in a few minutes or check your subscription page."
            : "Please keep this page open while we confirm your payment."}
        </p>
        {stillWaiting && (
          <button
            type="button"
            onClick={() => void query.refetch()}
            className="px-5 py-2.5 mt-3 mr-2 text-sm font-semibold border rounded-full cursor-pointer text-secondary border-gray-300 hover:bg-gray-50"
          >
            Check again
          </button>
        )}
        {stillWaiting && <BackLink />}
      </Panel>
    );
  }

  return (
    <div className="pt-8 bg-white">
      <Helmet>
        <title>Payment status | FastMet</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="py-8 bg-secondary md:py-12">
        <PageContainer>
          <h1 className="text-xl font-bold text-primary md:text-4xl">
            Payment status
          </h1>
        </PageContainer>
      </section>
      <PageContainer className="py-10 md:py-16">{body}</PageContainer>
    </div>
  );
}
