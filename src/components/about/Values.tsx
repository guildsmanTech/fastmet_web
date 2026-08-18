import {
  Zap,
  ShieldCheck,
  Smile,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";
import PageContainer from "@/components/PageContainer";

const values = [
  {
    icon: Zap,
    title: "Fast",
    desc: "We value your time. We make every delivery quick, efficient, and reliable because every minute matters.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable",
    desc: "We build trust through consistent service that customers, businesses, and partner-drivers can depend on.",
  },
  {
    icon: Smile,
    title: "Easy",
    desc: "We make delivery simple, convenient, and accessible for everyone.",
  },
  {
    icon: TrendingUp,
    title: "Empower",
    desc: "We create opportunities that help Filipino partner-drivers earn and grow.",
  },
  {
    icon: HeartHandshake,
    title: "Together",
    desc: "We believe growth is better when we grow together.",
  },
];

export default function OurValues() {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
      <PageContainer>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-1 mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Our Values
          </h2>
          <p className="text-white/90 text-sm font-semibold">
            What moves us forward.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {values.map(({icon: Icon, title, desc}) => (
            <div
              key={title}
              className="bg-white rounded-lg p-4 flex flex-col gap-2 shadow-sm"
            >
              <div className="size-9 md:size-11 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shrink-0 lg:self-center">
                <Icon className="size-4 md:size-6 text-white" />
              </div>
              <h3 className="font-bold text-sm text-zinc-900 lg:self-center">
                {title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed lg:text-center">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
