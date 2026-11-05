import PhSunIcon from "@/assets/home/PhSunIcon";
import type { IHeroBadge } from "@/types/home";
import { Coins, Download, Truck, UserRound, UsersRound } from "lucide-react";
import PageContainer from "../PageContainer";
import CTAButton from "../CTAButton";
import { DRIVER_PLAY_STORE_URL } from "@/helper/constant";

interface IWhyFastMet extends Omit<IHeroBadge, "caption"> {
  description: string;
}

const whyFastmet: IWhyFastMet[] = [
  {
    title: "Gawang Pinoy, para sa Pinoy",
    description:
      "A homegrown delivery app built to serve Filipino individuals, businesses, and communities.",
    icon: PhSunIcon,
  },
  {
    title: "Zero commission for life",
    description:
      "Sa FastMet, walang percentage-based commission deductions. Partner-drivers keep 100% of their delivery earnings under our subscription-based model.",
    icon: Coins,
  },
  {
    title: "May sasakyan para sa bawat delivery",
    description:
      "From motorcycles to wing vans, choose the right vehicle for your parcels, supplies, equipment, or larger cargo.",
    icon: Truck,
  },
  {
    title: "Personal man o pang-business",
    description:
      "Whether it's a personal package or business inventory, FastMet offers delivery options for different needs.",
    icon: UsersRound,
  },
];

export default function WhyFastMet() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white py-20 lg:py-28 px-3 md:px-0">
      <PageContainer className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {whyFastmet.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-primary/30 hover:bg-orange-50/40 sm:p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-primary">
                <Icon className="size-5" strokeWidth={1.8} aria-hidden />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold leading-snug text-secondary sm:text-lg">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Right: sticky intro + CTAs */}
        <div className="flex flex-col gap-8 lg:col-span-5 lg:sticky lg:top-28">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Bakit FastMet?
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
              Mas convenient na delivery.
              <br />
              Mas sulit na <span className="text-primary">biyahe.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              FastMet is a proudly Filipino-made delivery platform for
              customers, businesses, and partner-drivers. From small packages to
              larger cargo, may FastMet vehicle option para sa delivery needs
              mo. At para sa ating drivers,{" "}
              <span className="font-semibold text-primary">
                walang commission na ibabawas
              </span>{" "}
              sa bawat completed delivery thanks to our subscription model.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton
              to="/user-register"
              variant="driver"
              size="md"
              icon={UserRound}
              className="w-full justify-center sm:w-fit"
            >
              Pre-register as a user
            </CTAButton>
            <CTAButton
              href={DRIVER_PLAY_STORE_URL}
              variant="outline-primary"
              size="md"
              icon={Download}
              className="w-full justify-center sm:w-fit"
            >
              Download driver app
            </CTAButton>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}