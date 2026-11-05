import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {
  servicesDocu2,
  servicesDocu3,
  servicesDocu5,
  servicesDocu7,
} from "@/constants/images";

interface IServices {
  readonly img: string;
  readonly caption: string;
  readonly description: string;
}

const SERVICES: IServices[] = [
  {
    img: servicesDocu7,
    caption: "Documents and small parcels",
    description:
      "Para sa documents, contracts, gifts, at iba pang magagaang na padala.",
  },
  {
    img: servicesDocu2,
    caption: "Online orders and business supplies",
    description:
      "Para sa customer orders, stocks, supplies, at araw-araw na business deliveries.",
  },
  {
    img: servicesDocu3,
    caption: "Appliances and household items",
    description:
      "Para sa appliances, furniture, equipment, at iba pang bulky items.",
  },
  {
    img: servicesDocu5,
    caption: "Lipat-bahay and larger cargo",
    description:
      "Para sa lipat-bahay, maramihang padala, at mas malalaking cargo.",
  },
];

export default function Documents() {
  return (
    <section className="w-full bg-white py-20 lg:py-28 border-t border-slate-200">
      <PageContainer className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: visual cards + vehicles */}
        <div className="flex flex-col gap-10 lg:col-span-7">
          {/* 4-card grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {SERVICES.map(({ img, caption, description }) => (
              <figure key={caption} className="group flex flex-col gap-3">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={img}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="flex flex-col gap-1">
                  <span className="text-sm font-semibold leading-snug text-secondary">
                    {caption}
                  </span>
                  <span className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                    {description}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Right: sticky intro + CTA */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Services
              </p>
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-5xl">
                Mula documents hanggang{" "}
                <span className="text-primary">lipat-bahay</span>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
                FastMet offers delivery options para sa iba’t ibang personal,
                business, at bulk delivery needs.
              </p>
              <p className="max-w-md text-xs leading-relaxed text-slate-500 sm:text-sm">
                Depende sa cargo size, destination, service coverage, at vehicle
                availability, puwede kang magpadala ng documents, parcels,
                appliances, furniture, at mas malalaking cargo.
              </p>
            </div>

            <CTAButton
              to="/user-register"
              variant="primary"
              className="w-full justify-center px-7 py-3 sm:w-fit"
            >
              Register now
            </CTAButton>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
