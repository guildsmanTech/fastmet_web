import {Truck} from "lucide-react";
import {Link} from "react-router-dom";
import PageContainer from "@/components/PageContainer";

export function Commission() {
  return (
    <section
      className="w-full border-b-2 border-primary pb-10"
      id="greater-manila"
    >
      <PageContainer className="flex flex-col md:gap-10 md:flex-row gap-4 justify-center items-center">
      {/* TODO: no source image for this block yet */}
      <div className="w-full md:w-1/2 aspect-[3/2] sm:aspect-video md:aspect-square max-w-sm bg-gray-300 rounded-lg shrink-0" />

      <div className="w-full md:w-1/2 flex flex-col gap-3 justify-center items-center md:items-start">
        <h1 className="text-lg font-bold md:text-2xl">
          Mas Maraming Kita. Walang Commission
        </h1>
        <p className="text-xs text-gray-600 md:text-sm ">
          During FastMet’s introductory zero-commission period, eligible
          partner-drivers can keep 100% of their delivery earnings. No
          commission deduction during the introductory period
        </p>
        <h3 className="text-xs font-semibold">
          Delivery Earnings →{" "}
          <span className="font-bold text-primary text-sm">100%</span> for the
          Driver
        </h3>
        <Link
          to="/driver-register"
          className="flex-2 flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-center text-white font-semibold text-xs hover:from-yellow-500 hover:to-orange-600 transition md:py-3 lg:text-sm"
        >
          <Truck className="size-4 hidden lg:block" />
          Pre-Register as a Driver
        </Link>
      </div>
      </PageContainer>
    </section>
  );
}
