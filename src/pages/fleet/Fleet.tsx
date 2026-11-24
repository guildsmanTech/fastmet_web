import { Building2, Truck, Users, ShieldCheck, ClipboardList } from "lucide-react";
import ClosingCallToAction from "@/components/ClosingCallToAction";
import PageContainer from "@/components/PageContainer";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CompanyRegistrationDialog from "@/components/fleet/CompanyRegistrationDialog";
import fleetBackground from "@/assets/fleet/fleet_bg.jpg";
import FleetMeta from "@/components/fleet/FleetMeta";
const benefits = [
  [Building2, "One company account", "Keep your company's fleet operations together."],
  [Truck, "Vehicle management", "Add and manage your company's vehicles."],
  [Users, "Driver management", "Manage drivers registered through the FastMet driver app."],
  [ShieldCheck, "Admin verification", "Vehicles and drivers go through FastMet admin checks."],
  [
    ClipboardList,
    "Bookings and dispatch",
    "Receive bookings and coordinate your vehicles and drivers.",
  ],
] as const;
const applicationSteps = [
  ["Apply", "Submit your company details and business documents."],
  ["Admin review", "FastMet admins check your application and documents."],
  [
    "Get approved",
    "After approval, an admin creates your company account and sends login details to your company email.",
  ],
  [
    "Add vehicles and drivers",
    "Submit vehicles for admin verification. Drivers register through the FastMet driver app and are processed by admins.",
  ],
  [
    "Start receiving bookings",
    "Begin fleet operations once the required company, vehicle and driver approvals are complete.",
  ],
] as const;

export default function Fleet() {
  const [, setParams] = useSearchParams();
  const registerButton = (hero = false) => (
    <Button
      data-fleet-register
      type="button"
      onClick={() =>
        setParams(
          (previous) => {
            const next = new URLSearchParams(previous);
            next.set("register", "1");
            return next;
          },
          { replace: true },
        )
      }
      className={
        hero
          ? "h-auto min-h-12 w-full rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground shadow-lg hover:bg-primary-hover sm:w-auto sm:px-6"
          : "h-auto min-h-12 rounded-full bg-secondary px-7 py-3 text-sm font-semibold text-white hover:bg-secondary/90 focus-visible:ring-secondary"
      }
    >
      Register your company
    </Button>
  );
  return (
    <div className="text-foreground">
      <FleetMeta
        title="FastMet Fleet"
        description="A company account for trucking and logistics businesses managing their own vehicles, drivers, bookings and dispatch."
        path="/fleet"
      />
      <section
        id="hero"
        className="relative flex min-h-dvh w-full items-center overflow-hidden bg-secondary pt-10 md:pt-0 px-3 md:px-0"
      >
        <img
          src={fleetBackground}
          alt=""
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0f2535]/85" />
        <PageContainer className="relative z-10 flex flex-col items-center justify-between gap-10 py-16 md:py-20 lg:flex-row lg:gap-12">
          <div className="flex w-full max-w-2xl flex-col gap-6 text-white lg:min-w-0 lg:flex-1">
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Manage your company’s fleet with FastMet.
              </h1>
              <div className="flex flex-col gap-3 max-w-xl text-base font-medium leading-relaxed text-white/90 md:gap-4">
                <p>
                  FastMet Fleet brings your vehicles, drivers, bookings and dispatch into one
                  company account.
                </p>
                <p>
                  Apply as a trucking or logistics company. FastMet admins review your application
                  before you get access.
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {registerButton(true)}
            </div>
          </div>
          <picture className="hidden w-full max-w-2xl overflow-clip md:block lg:min-w-0 lg:flex-[1.3]">
            <source media="(min-width: 48rem)" srcSet="/laptop_pic-transparent.webp" />
            <img
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              alt="Laptop displaying the FastMet Fleet dashboard"
              width={1679}
              height={937}
              fetchPriority="high"
              className="h-auto w-full scale-[1.2] object-contain drop-shadow-xl"
            />
          </picture>
        </PageContainer>
      </section>
      <section className="border-b border-border bg-background">
        <PageContainer className="grid gap-8 py-16 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-20">
          <h2 className="max-w-lg border-l-4 border-primary pl-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Built for companies that run their own fleet.
          </h2>
          <div className="max-w-xl space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Whether you operate a trucking business or a logistics company, bring your vehicles
              and drivers into a company account.
            </p>
            <p>
              Once approved, add your vehicles for verification and connect drivers who register
              through the FastMet driver app. Vehicle and driver approval are handled separately by
              FastMet admins.
            </p>
          </div>
        </PageContainer>
      </section>
      <section className="border-b border-border bg-muted/60">
        <PageContainer className="space-y-10 py-16 md:py-24">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            A clearer way to manage fleet work
          </h2>
          <dl className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
            {benefits.map(([Icon, title, text]) => (
              <div
                key={title}
                className="w-full space-y-2 rounded-2xl border border-border bg-card p-6 md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
              >
                <dt className="flex items-center gap-3 text-lg font-semibold">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary-foreground dark:text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {title}
                </dt>
                <dd className="leading-relaxed text-muted-foreground">{text}</dd>
              </div>
            ))}
          </dl>
        </PageContainer>
      </section>
      <section className="bg-secondary text-white">
        <PageContainer className="grid gap-10 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How it works
            </p>
            <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              From application to <span className="text-primary">first booking</span>
            </h2>
          </div>
          <ol className="list-decimal divide-y divide-white/15 pl-6 marker:font-semibold marker:text-primary">
            {applicationSteps.map(([title, text]) => (
              <li key={title} className="py-5 pl-3 first:pt-0 last:pb-0">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-white/85">{text}</p>
              </li>
            ))}
          </ol>
        </PageContainer>
      </section>
      <ClosingCallToAction
        title="Bring your company to FastMet."
        description="Have your business documents ready. Start with a company application."
        note="Fleet applications are subject to FastMet review and approval."
        action={registerButton()}
      />
      <CompanyRegistrationDialog />
    </div>
  );
}
