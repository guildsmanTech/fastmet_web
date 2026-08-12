import {partnerDriverBG, partnerDriverPhoto} from "@/constants/images";
import {Truck} from "lucide-react";
import {Link} from "react-router-dom";

export function GreaterManilaBanner() {
  return (
    <section className="relative w-full py-10" id="greater-manila">
      <img
        src={partnerDriverBG}
        alt="FastMet delivery route"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 px-4 md:px-12 xl:px-20 flex flex-col md:flex-row gap-4 items-stretch lg:items-center md:gap-6 max-w-6xl mx-auto">
        {/* Left: text card */}
        <div className="bg-white/70 backdrop-blur-xs rounded-lg p-5 md:p-6 flex flex-col gap-3 md:w-1/2">
          <h2 className="text-secondary font-extrabold text-xl md:text-2xl leading-snug">
            Greater Manila Requests. Nationwide Land Delivery.
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            During FastMet's introductory zero-commission period, eligible
            partner-drivers can keep 100% of their delivery earnings. No
            commission deduction during the introductory period.
          </p>
          <div className="flex gap-3 mt-1">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-full bg-secondary font-semibold text-xs hover:bg-[#031624] text-white transition lg:py-3 lg:text-sm"
            >
              Learn More
            </Link>
            <Link
              to="/driver-register"
              className="flex-2 flex items-center justify-center gap-2 px-2 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-center text-white font-semibold text-xs hover:from-yellow-500 hover:to-orange-600 transition lg:py-3 lg:text-sm"
            >
              <Truck className="size-4 hidden lg:block" />
              Pre-Register as a Driver
            </Link>
          </div>
          <p className="text-gray-500 text-[10px] md:text-xs mt-1">
            NOTE: Full terms, duration, and eligibility details will be shared
            through official FastMet updates.
          </p>
        </div>

        {/* Right: driver photo */}
        <div className="md:w-1/2 rounded-lg relative overflow-hidden">
          <img
            src={partnerDriverPhoto}
            alt="FastMet partner-driver"
            className="w-full h-48 md:h-full lg:max-h-76 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
