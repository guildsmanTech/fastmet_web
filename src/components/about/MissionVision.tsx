import PageContainer from "@/components/PageContainer";
import {mission, vision} from "@/constants/images";

type BlockProps = {
  title: string;
  paragraphs: string[];
  imageFirst?: boolean;
  image?: string;
};

function MissionVisionBlock({
  title,
  paragraphs,
  imageFirst = true,
  image,
}: BlockProps) {
  return (
    <div
      className={`flex flex-col gap-6 md:gap-10 items-center ${
        imageFirst ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {image && (
        <img
          src={image}
          alt="FastMet delivery"
          className="w-96 object-cover rounded-lg"
        />
      )}

      <div className="w-full md:w-1/2 flex flex-col gap-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
          {title}
        </h2>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={`text-sm text-zinc-700 leading-relaxed ${i === 0 ? "font-semibold" : ""}`}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className="w-full">
      <PageContainer className="flex flex-col gap-16 md:gap-20">
        <MissionVisionBlock
          title="Our Vision"
          imageFirst
          image={vision}
          paragraphs={[
            "To become one of the Philippines' most trusted on-demand delivery platforms by building a delivery community where users, businesses, and partner-drivers grow together through fast, fair, and reliable service.",
            "Maging isa sa mga pinaka-pinagkakatiwalaang on-demand delivery platforms sa Pilipinas sa pamamagitan ng pagbuo ng isang komunidad kung saan ang mga user, negosyo, at partner-drivers ay sabay-sabay na umuunlad sa pamamagitan ng mabilis, patas, at maaasahang serbisyo.",
          ]}
        />
        <MissionVisionBlock
          title="Our Mission"
          imageFirst={false}
          image={mission}
          paragraphs={[
            "To make every delivery faster, easier, and more reliable by connecting people and businesses with the right delivery solutions while creating better opportunities for our partner-drivers.",
            "Gawing mas mabilis, mas madali, at mas maasahan ang bawat pagpapadala sa pamamagitan ng tamang delivery solutions para sa mga tao at negosyo, habang lumilikha ng mas magandang oportunidad para sa aming mga partner-driver.",
          ]}
        />
      </PageContainer>
    </section>
  );
}
