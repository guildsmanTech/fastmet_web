import {
  Truck, // wide range of vehicles
  MapPin, // real-time tracking / location
  Clock, // secured & fast / timely delivery
  Calendar, // flexible hours / scheduling
  Award, // early user badge / achievement
  Gift, // rewards / prizes
} from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Wide Range of Vehicles",
    desc: "Maliit man o malaki ang delivery, kayang-kaya ng FastMet!",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    desc: "Makikita mo ang exact location ng delivery mo — peace of mind, 24/7!",
  },
  {
    icon: Clock,
    title: "Secured and Fast Deliveries Always",
    desc: "Laging safe at on-time—together, we keep your deliveries running smoothly.",
  },
  {
    icon: Calendar,
    title: "Flexible Hours",
    desc: "Available ang deliveries depende sa oras at availability ng aming drivers. Layunin naming maghatid ng mabilis at maaasahang serbisyo kapag kailangan mo.",
  },
  {
    icon: Award,
    title: "Early User Badge",
    desc: "Kumuha ng exclusive badge at maging bahagi ng FastMet history!",
  },
  {
    icon: Gift,
    title: "Win Exciting Rewards",
    desc: "Manalo ng mobile load at FastMet exclusive delivery vouchers!",
  },
];

export default function InfoUser() {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 lg:flex-1 lg:pr-6 xl:pr-10 md:px-10">
      {/* Wordmark + tagline */}
      <div className="space-y-1 pt-10">
        <h1 className="font-extrabold text-2xl text-center md:text-left md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight">
          Deliver anything.
          <br />
          <span className="text-primary">Book in seconds.</span>
        </h1>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed pt-1 text-center md:text-left">
          Pre-registration is open for users in Greater Manila. Sign up now and be
          among the first to book when FastMet goes live — with exclusive early
          rewards waiting for you.
        </p>
      </div>
      {/* Benefits grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BENEFITS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
          >
            <div className="shrink-0 mt-0.5 size-8 rounded-lg bg-orange-50 flex items-center justify-center">
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
    </div>
  );
}
