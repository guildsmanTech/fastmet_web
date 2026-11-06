import CTAButton from "@/components/CTAButton";
import PageContainer from "@/components/PageContainer";

export default function AnoAngFastmet() {
  return (
    <section className="w-full bg-gray-50 py-10">
      <PageContainer>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
              Bakit FastMet?
            </h2>
            <p className="text-secondary text-sm font-medium mt-2">
              Be among the first to receive official FastMet updates before our
              public launch.
            </p>
            <p className="text-secondary/70 text-xs mt-1">
              Pre-registration pa lamang ito. FastMet will send official updates
              and next steps through the contact details you provide.
            </p>
          </div>

          <CTAButton
            to="/"
            variant="primary"
            className="shrink-0 self-start md:self-auto"
          >
            Pre-Register Now
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          {[
            {
              emoji: "🎟️",
              title: "Exclusive Delivery Vouchers",
              desc: "Pre-registered users may receive exclusive vouchers that can be used for eligible FastMet deliveries once the service becomes available.",
            },
            {
              emoji: "📱",
              title: "Chance to Win Mobile Load",
              desc: "Successful pre-registrants may get a chance to win mobile load worth up to ₱500.",
            },
            {
              emoji: "🔔",
              title: "Early FastMet Updates",
              desc: "Receive official announcements about our launch, service coverage, promotions, and future access to the FastMet mobile app.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow-sm p-5 flex flex-col gap-3"
            >
              <span className="text-3xl">{item.emoji}</span>
              <h3 className="text-secondary font-bold text-sm">{item.title}</h3>
              <p className="text-secondary/70 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-secondary/50 text-[11px] text-center mt-8">
          Vouchers, prizes, eligibility requirements, and redemption details are
          subject to the official promotion mechanics and FastMet terms and
          conditions.
        </p>
      </PageContainer>
    </section>
  );
}
