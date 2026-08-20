import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {
  servicesDocu,
  servicesDocu2,
  servicesDocu3,
  servicesDocu4,
  servicesDocu5,
  servicesDocu6,
  servicesDocu7,
} from "@/constants/images";

export default function Documents() {
  return (
    <section className="w-full py-10 bg-white">
      <PageContainer className="text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
          Mula Documents Hanggang Lipat-Bahay
        </h2>
        <p className="text-secondary text-sm mt-3">
          FastMet is designed for different personal, business, and bulk
          delivery needs.
        </p>
        <p className="text-secondary/70 text-xs mt-1">
          Depending on the cargo size, destination, service coverage, and
          vehicle availability, users may request deliveries for:
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {[
            {
              img: servicesDocu7,
              caption: "Documents and important papers",
            },
            {
              img: servicesDocu,
              caption: "Small parcels and personal items",
            },
            {
              img: servicesDocu2,
              caption: "Gifts and online shop orders",
            },
            {
              img: servicesDocu3,
              caption: "Appliances and household items",
            },
            {
              img: servicesDocu4,
              caption: "Business supplies and equipment",
            },
            {
              img: servicesDocu5,
              caption: "Furniture and lipat-bahay items",
            },
            {
              img: servicesDocu6,
              caption: "Larger cargo and bulk deliveries",
            },
          ].map((item) => (
            <div
              key={item.caption}
              className="flex flex-col text-left w-[calc(50%-0.75rem)] sm:w-[calc(25%-1.125rem)]"
            >
              <img
                src={item.img}
                alt=""
                className="w-full aspect-square object-cover rounded-md"
              />
              <p className="text-secondary text-xs font-medium mt-2">
                {item.caption}
              </p>
            </div>
          ))}
        </div>

        <CTAButton to="/" variant="primary" className="mt-10">
          Pre-Register Now
        </CTAButton>
      </PageContainer>
    </section>
  );
}
