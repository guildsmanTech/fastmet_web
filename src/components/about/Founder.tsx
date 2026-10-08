import PageContainer from "@/components/PageContainer";
import { dex, josh } from "@/constants/images";

const founders = [
  {
    name: "Joshua Estopia",
    photo: josh,
    quote:
      "I believe technology matters most when it makes everyday life easier and creates real opportunities for people.",
    bio: "Para sa akin, hindi sapat na mabilis o makabago ang teknolohiya. Dapat may tunay itong naitutulong sa buhay ng tao. Sa FastMet, gusto naming gamitin ito para gawing mas simple ang delivery, makalikha ng oportunidad, at makatulong sa mas maraming Pilipino.",
  },
  {
    name: "Dexter Junio",
    photo: dex,
    quote:
      "I believe Filipino delivery drivers deserve more than opportunities to earn. They deserve to be valued, respected, and supported.",
    bio: "Sa bawat delivery ay may rider na nagsisikap para sa pamilya at pangarap niya. Gusto naming bumuo ng platform na nagbibigay sa kanila hindi lang ng kita, kundi ng respeto, patas na pagkakataon, at mas magandang kinabukasan.",
  },
];

export default function Founders() {
  return (
    <section className="w-full bg-secondary py-14 md:py-20">
      <PageContainer>
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-3 mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
            Meet the Bright Minds Behind FastMet
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Behind every great platform is a vision driven by people who
            understand the challenges of everyday Filipinos. Meet the founders
            who are building a faster, more reliable, and more connected
            delivery experience for customers, businesses, and partner-drivers
            across the Philippines.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10 sm:gap-8 lg:gap-16 max-w-4xl mx-auto">
          {founders.map((founder, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 w-full sm:w-[45%] max-w-[320px] mx-auto"
            >
              <div className="w-40 sm:w-full max-w-[220px] h-48 md:h-60 rounded-lg overflow-hidden border-2 border-primary">
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="object-cover w-full"
                />
              </div>

              <div>
                <p className="font-bold text-white text-base sm:text-lg">
                  {founder.name}
                </p>
                <div className="w-full h-px bg-primary mx-auto my-1" />
                <p className="text-xs sm:text-sm text-white/70">Co-founder</p>
              </div>

              <p className="text-primary italic font-semibold text-sm sm:text-base leading-relaxed">
                “{founder.quote}”
              </p>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
