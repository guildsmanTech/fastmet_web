import {
  aboutMotor,
  aboutRider,
  aboutTruck2,
  aboutTruck3,
} from "@/constants/images";
import {UserRound, Truck} from "lucide-react";
import {Link} from "react-router-dom";

const partners = [
  {image: aboutMotor, title: "Lorem Ipsum industry"},
  {image: aboutRider, title: "Lorem Ipsum industry"},
  {image: aboutTruck2, title: "Lorem Ipsum industry"},
  {image: aboutTruck3, title: "Lorem Ipsum industry"},
];

export default function JoinFastMet() {
  return (
    <section className="w-full px-4 sm:px-8 md:px-12 xl:px-20 pt-16 md:pt-20 pb-16 md:pb-20 bg-gradient-to-r from-yellow-400 to-orange-500 lg:bg-[image:linear-gradient(to_bottom,transparent_0%,transparent_46%,white_46%,white_100%),linear-gradient(to_right,#fbbf24,#f97316)]">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-1 mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
          Maging Bahagi ng FastMet
        </h2>
        <p className="text-white/90 text-sm font-semibold">
          Whether you need delivery services or want to become a partner-driver,
          pre-register today and receive official FastMet updates.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {partners.map((p, i) => (
          <div key={i} className="flex flex-col gap-2">
            <img
              src={p.image}
              alt={p.title}
              className="w-full aspect-[3/4] object-cover rounded-lg"
            />
            <p className="font-bold text-xs sm:text-sm text-zinc-900">
              {p.title}
            </p>
            <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10 max-w-md mx-auto">
        <Link
          to="/user-register"
          className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-white text-secondary font-semibold text-sm border border-white lg:border-zinc-200 hover:bg-zinc-100 transition"
        >
          <UserRound className="size-4" />
          Pre-Register as a User
        </Link>
        <Link
          to="/driver-register"
          className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-secondary text-white font-semibold text-sm hover:bg-secondary/90 transition lg:bg-gradient-to-r lg:from-yellow-400 lg:to-orange-500 lg:hover:from-yellow-500 lg:hover:to-orange-600"
        >
          <Truck className="size-4" />
          Pre-Register as a Driver
        </Link>
      </div>
    </section>
  );
}
