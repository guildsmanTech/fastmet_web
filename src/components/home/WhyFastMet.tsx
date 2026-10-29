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
    title: "Gawang Pinoy, Para sa Pinoy",
    description:
      "A homegrown delivery app built to serve Filipino individuals, businesses, and communities.",
    icon: PhSunIcon,
  },
  {
    title: "Zero Commission for Life",
    description:
      "Sa FastMet, walang percentage-based commission deductions. Partner-drivers keep 100% of their delivery earnings under our subscription-based model.",
    icon: Coins,
  },
  {
    title: "May Sasakyan Para sa Bawat Delivery",
    description:
      "From motorcycles to wing vans, choose the right vehicle for your parcels, supplies, equipment, or larger cargo.",
    icon: Truck,
  },
  {
    title: "Personal Man o Pang-Business",
    description:
      "Whether it's a personal package or business inventory, FastMet offers delivery options for different needs.",
    icon: UsersRound,
  },
];

export default function WhyFastMet() {
  return (
    <section className="px-2 md:px-0 mb-12 relative isolate w-full overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* <div
          aria-hidden="true"
          className="absolute -right-24 -top-28 -z-10 size-72 rounded-full bg-[#fff0d9]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-24 -z-10 size-80 rounded-full bg-[#fff0d9]"
        /> */}

      <PageContainer className="flex flex-col gap-7 sm:gap-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-[#fff0d9] px-4 py-2 text-sm font-bold text-primary uppercase">
              Bakit FastMet?
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-secondary sm:text-4xl lg:text-5xl">
              Mas Convenient na Delivery.
              <br />
              Mas Sulit na <span className="text-primary">Biyahe.</span>
            </h2>
            <div className="flex flex-col gap-3 max-w-xl mt-4 text-base leading-relaxed text-slate-600 sm:text-lg font-medium md:gap-4 lg:text-[15px] 2xl:text-base">
              <p>
                FastMet is a proudly Filipino-made delivery platform designed
                for the everyday needs of Filipino customers, businesses, and
                partner-drivers.
              </p>
              <p>
                Whether you're sending a small package or transporting larger
                cargo, may FastMet vehicle option para sa delivery needs mo.
              </p>
              <p>
                At para sa ating partner-drivers, iba ang sistema ng FastMet.
                With our subscription-based model,{" "}
                <span className="font-extrabold text-primary">
                  walang commission na ibabawas sa bawat completed delivery.
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <CTAButton
              to="/user-register"
              variant="driver"
              size="md"
              icon={UserRound}
            >
              Pre-Register as a User
            </CTAButton>
            <CTAButton
              href={DRIVER_PLAY_STORE_URL}
              variant="outline-primary"
              size="md"
              icon={Download}
            >
              Download Driver App
            </CTAButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {whyFastmet.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="relative min-h-60 overflow-hidden rounded-2xl border border-orange-100 bg-white/80 py-10 px-8 shadow-sm"
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-16 -right-8 size-36 rotate-[-28deg] rounded-[45%] bg-gradient-to-br from-orange-50 to-orange-100/80"
              />
              <div className="relative z-10">
                <h3 className="max-w-[14rem] text-xl font-bold leading-tight text-secondary sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
              <Icon
                aria-hidden="true"
                className="absolute bottom-4 right-4 z-10 size-12 text-orange-300"
                strokeWidth={1.8}
              />
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
