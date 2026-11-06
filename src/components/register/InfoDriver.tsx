import { phone, phoneBG } from "@/constants/images";
import { Clock, Star, Gift, Award, ShieldCheck, Banknote } from "lucide-react";

const BENEFITS = [
  {
    icon: Banknote,
    title: "Zero Commission Program",
    desc: "Iuwi mo ang buo mong kita—until the program last!",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    desc: "Hawak mo ang oras mo — walang fixed hours, walang quotas!",
  },
  {
    icon: Star,
    title: "Early Bird Access",
    desc: "Ang mga pre-registered drivers ay priority pag-launch ng FastMet.",
  },
  {
    icon: Gift,
    title: "Win Exciting Rewards",
    desc: "Manalo ng cash prizes at FastMet exclusive merchandise!",
  },
  {
    icon: Award,
    title: "Founding Driver Badge",
    desc: "Get an exclusive badge at maging parte ng FastMet history.",
  },
  {
    icon: ShieldCheck,
    title: "You are Protected",
    desc: "Suportado ka namin sa bawat biyahe mo — laging safe.",
  },
];

export default function InfoDriver() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 lg:flex-1 lg:pr-6 xl:pr-10 md:px-14">
      {/* Wordmark + tagline */}
      <div className="space-y-1 pt-10">
        <h1 className="font-extrabold text-2xl text-center md:text-left md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight">
          Drive with us.
          <br />
          <span className="text-primary">Earn from day one.</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed pt-1 text-center md:text-left">
          Pre-registration is open for drivers in Greater Manila. Sign up now and
          be among the first to earn when FastMet goes live.
        </p>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
          >
            <div className="shrink-0 mt-0.5 size-8 rounded-lg bg-primary/8 flex items-center justify-center">
              <Icon className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800 leading-tight">
                {title}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Phone mockup — desktop only */}
      <div className="hidden lg:flex justify-center items-center mt-auto">
        <div
          className="size-56 xl:size-64 flex justify-center items-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${phoneBG})` }}
        >
          <img
            src={phone}
            alt="FastMet App"
            className="size-72 xl:size-80 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
