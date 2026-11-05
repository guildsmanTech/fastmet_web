import { Fragment } from "react";
import PageContainer from "../PageContainer";
import ConnectNeeds from "./ConnectNeeds";

export default function BetterRoute() {
  return (
    <Fragment>
      <section className="w-full py-10 bg-zinc-50">
        <PageContainer>
          <div className="w-full text-center flex flex-col gap-4">
            <div className="space-y-4 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl">
                Bagong Sistema.{" "}
                <span className="block text-primary">
                  Sama-samang Pag-unlad.
                </span>
              </h2>

              <div className="flex max-w-3xl flex-col items-center gap-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>
                  Sa araw-araw na takbo ng buhay at negosyo, mahalaga ang maayos
                  na delivery. Customers need a convenient way to send items,
                  businesses need reliable delivery support, and partner-drivers
                  need flexible earning opportunities gamit ang kanilang
                  sasakyan.
                </p>

                <p>
                  <span className="font-semibold text-secondary">FastMet</span>{" "}
                  was created to bring these needs together. Bilang isang
                  Pinoy-made platform, layunin naming gawing mas madali ang
                  pagpapadala through a subscription-based model for
                  partner-drivers. Walang percentage-based commission na
                  ibinabawas sa kanilang delivery earnings — that's zero
                  commission for life. Sama-sama kaming bumubuo ng delivery
                  community where everyone has the opportunity to grow.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <ConnectNeeds />
    </Fragment>
  );
}
