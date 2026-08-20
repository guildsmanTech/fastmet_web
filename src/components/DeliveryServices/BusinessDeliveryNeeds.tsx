import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";
import {servicesNeeds} from "@/constants/images";
import {getBusinessInquiryMailto} from "@/helper/constant";
import {Check} from "lucide-react";

export default function BusinessDeliveryNeeds() {
  const checklist = [
    "On-demand business deliveries",
    "Scheduled or recurring deliveries",
    "Online shop and customer order deliveries",
    "Documents, supplies, and equipment transport",
    "Bulk and larger cargo deliveries",
    "Customized delivery arrangements",
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-secondary">
      <PageContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <img
          src={servicesNeeds}
          alt="Fastmet delivery"
          className="w-full lg:w-5/6 rounded-lg object-cover mx-auto"
        />

        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            May Delivery Needs ang Business Mo?
          </h2>

          <p className="text-white/80 text-sm mt-4">
            FastMet is open to working with businesses that need convenient
            delivery support for customer orders, parcels, supplies, equipment,
            and larger cargo.
          </p>
          <p className="text-white/80 text-sm mt-3">
            Whether you manage an online shop, restaurant, retail store, office,
            or growing local brand, our team would be happy to learn more about
            your delivery requirements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-6">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <div className="shrink-0 size-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center">
                  <Check className="text-green-500 size-4" />
                </div>
                <span className="text-white text-sm">{item}</span>
              </div>
            ))}
          </div>

          <CTAButton
            href={getBusinessInquiryMailto()}
            variant="user"
            className="mt-6"
          >
            Send a Business Inquiry
          </CTAButton>

          <p className="text-white/60 text-xs mt-4">
            Our team will review your inquiry and contact you regarding possible
            delivery arrangements, service availability, and next steps.
          </p>
        </div>
      </PageContainer>
    </section>
  );
}
