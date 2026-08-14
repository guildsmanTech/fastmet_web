import {UserRound, Truck} from "lucide-react";
import {Link} from "react-router-dom";
import PageContainer from "@/components/PageContainer";

export default function JoinFastMet() {
  return (
    <section className="w-full md:pt-20 pb-16 md:pb-20 bg-primary mb-5">
      <PageContainer>
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-1 mb-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
          Maging Bahagi ng FastMet
        </h2>
        <p className="text-white/90 text-sm font-semibold">
          Whether you need delivery services or want to become a partner-driver,
          pre-register today and receive official FastMet updates.
        </p>
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
          className="flex-1 flex items-center justify-center gap-2 px-2 py-3 rounded-full bg-white text-secondary font-semibold text-sm border border-white lg:border-zinc-200 hover:bg-zinc-100 transition"
        >
          <Truck className="size-4" />
          Pre-Register as a Driver
        </Link>
      </div>
      </PageContainer>
    </section>
  );
}
