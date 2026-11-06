import PageContainer from "@/components/PageContainer";
import { mission, vision } from "@/constants/images";

type BlockProps = {
  readonly title: string;
  readonly paragraphs: string[];
  readonly imageFirst?: boolean;
  readonly image?: string;
};

function MissionVisionBlock({
  title,
  paragraphs,
  imageFirst = true,
  image,
}: BlockProps) {
  return (
    <div
      className={`flex px-3 md:px-0 flex-col items-center gap-8 md:gap-12 ${
        imageFirst ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image */}
      {image && (
        <div className="w-full md:max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:w-[38%] md:shrink-0 order-2 md:order-1">
          <img
            src={image}
            alt={`FastMet ${title.toLowerCase()}`}
            loading="lazy"
            className="aspect-[5/4] w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex w-full flex-col gap-5 md:w-1/2 order-1 md:order-2">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            FastMet
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            {title}
            <span className="ml-2 text-primary">.</span>
          </h2>
        </div>

        {/* English Statement */}
        <p className="text-base font-medium leading-8 text-slate-700 sm:text-lg">
          {paragraphs[0]}
        </p>

        {/* Filipino Translation */}
        {paragraphs[1] && (
          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm leading-7 text-slate-500 sm:text-base">
              {paragraphs[1]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <PageContainer className="flex flex-col gap-16 md:gap-24">
        <MissionVisionBlock
          title="Our Vision"
          imageFirst
          image={vision}
          paragraphs={[
            "To become one of the Philippines’ most trusted delivery platforms, where customers, businesses, and partner-drivers grow together through convenient, fair, and reliable service.",
            "Maging isa sa mga pinakapinagkakatiwalaang delivery platforms sa Pilipinas, kung saan ang customers, negosyo, at partner-drivers ay sama-samang umuunlad sa pamamagitan ng maginhawa, patas, at maaasahang serbisyo.",
          ]}
        />

        <MissionVisionBlock
          title="Our Mission"
          imageFirst={false}
          image={mission}
          paragraphs={[
            "To make delivery easier and more reliable for individuals and businesses by connecting them with suitable vehicles and partner-drivers, while creating fairer earning opportunities through our subscription-based, zero-commission model.",
            "Gawing mas madali at mas maaasahan ang pagpapadala para sa mga tao at negosyo, habang nagbibigay ng mas patas na pagkakataong kumita ang partner-drivers sa pamamagitan ng subscription-based na sistemang walang commission sa bawat delivery.",
          ]}
        />
      </PageContainer>
    </section>
  );
}
