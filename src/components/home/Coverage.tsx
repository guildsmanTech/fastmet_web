import {coverage} from "@/constants/images";
import {CheckCheck, X} from "lucide-react";
import PageContainer from "@/components/PageContainer";

export default function CoverageExplainer() {
  return (
    <section className="w-full bg-white">
      <PageContainer className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-primary font-bold text-2xl md:text-3xl leading-tight">
            Greater Manila Requests.
            <br />
            Nationwide Land Delivery.
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            FastMet accepts delivery requests within Greater Manila.
            <br />
            From Greater Manila, deliveries may be sent to destinations across
            the Philippines that are accessible through continuous land travel.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="border-2 border-green-500 p-3 rounded-full w-fit">
                <CheckCheck className="text-green-500 size-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 uppercase">
                Request Area
              </span>
              <span className="text-[11px] text-gray-500 leading-snug">
                Greater Manila
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="border-2 border-green-500 p-3 rounded-full w-fit">
                <CheckCheck className="text-green-500 size-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 uppercase">
                Delivery Area
              </span>
              <span className="text-[11px] text-gray-500 leading-snug">
                Nationwide through land-accessible routes
              </span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="border-2 border-red-500 p-3 rounded-full w-fit">
                <X className="text-red-500 size-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 uppercase">
                Not Yet Covered
              </span>
              <span className="text-[11px] text-gray-500 leading-snug">
                Routes requiring ferry or sea transport
              </span>
            </div>
          </div>
        </div>

        <img
          className="flex-1 w-full aspect-[4/3] md:w-[400px] bg-gray-300 "
          src={coverage}
          alt="Coverage"
        />
      </PageContainer>
    </section>
  );
}
