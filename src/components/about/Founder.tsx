import PageContainer from "@/components/PageContainer";

const founders = [
  {name: "Joshua Estopia", quote: "Quote"},
  {name: "Dexter Junio", quote: "Quote"},
];

export default function Founders() {
  return (
    <section className="w-full">
      <PageContainer>
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 mb-10 md:mb-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
          Meet the Bright Minds Behind FastMet
        </h2>
        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
          Behind every great platform is a vision driven by people who
          understand the challenges of everyday Filipinos. Meet the founders who
          are building a faster, more reliable, and more connected delivery
          experience for customers, businesses, and partner-drivers across the
          Philippines.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-14 max-w-2xl mx-auto">
        {founders.map((founder, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 w-full max-w-[280px] mx-auto sm:mx-0"
          >
            {/* TODO: no source photo for this founder yet */}
            <div className="w-full aspect-square bg-secondary rounded-lg" />
            <div>
              <p className="font-bold text-sm text-zinc-900">{founder.name}</p>
              <p className="text-sm text-zinc-700">{founder.quote}</p>
            </div>
          </div>
        ))}
      </div>
      </PageContainer>
    </section>
  );
}
