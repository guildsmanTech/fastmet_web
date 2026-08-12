import {zero} from "@/constants/images";
import {Link} from "react-router-dom";

export function FinalCTA() {
  return (
    <section
      className="w-full px-4 md:px-12 xl:px-20 flex flex-col py-10 items-center text-center gap-6"
      id="final-cta"
    >
      <h2 className="text-primary font-bold text-2xl md:text-3xl max-w-md">
        Be One of the First FastMet Partner-Drivers
      </h2>

      <div className="flex items-center gap-3 md:gap-4">
        <img
          src={zero}
          alt="0% commission"
          className="size-30 lg:size-40 object-contain xl:size-50"
        />
        <p className="text-secondary font-bold text-xl md:text-2xl text-left leading-tight">
          Introductory 0%
          <br />
          Commission
        </p>
      </div>

      <p className="text-gray-600 text-xs md:text-sm max-w-md">
        Pre-register now and receive updates about onboarding, activation,
        accepted vehicles, and future delivery opportunities.
      </p>

      <Link
        to="/driver-register"
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold text-sm hover:from-yellow-500 hover:to-orange-600 transition"
      >
        Pre-Register as a Driver
      </Link>
    </section>
  );
}
