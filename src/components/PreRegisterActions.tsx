import CTAButton, {type CTASize, type CTAVariant} from "@/components/CTAButton";
import {DRIVER_PLAY_STORE_URL} from "@/helper/constant";
import {cn} from "@/lib/utils";
import {Calculator, Smartphone} from "lucide-react";

const QUOTE_LABEL = "Get a Quote";
const DRIVER_APP_LABEL = "Download Driver App";

type PreRegisterActionsProps = {
  layout: "inline" | "stacked-mobile" | "header";
  userVariant?: CTAVariant;
  driverVariant?: CTAVariant;
  size?: CTASize;
  shortLabels?: boolean;
  className?: string;
  showMobileLabel?: boolean;
  fullWidth?: boolean;
};

export default function PreRegisterActions({
  layout,
  userVariant = "user",
  driverVariant = "driver",
  size = "sm",
  shortLabels = false,
  className,
  showMobileLabel = true,
  fullWidth = false,
}: PreRegisterActionsProps) {
  const quoteLabel = shortLabels ? "Quote" : QUOTE_LABEL;
  const driverLabel = shortLabels ? "Driver App" : DRIVER_APP_LABEL;

  if (layout === "header") {
    return (
      <div className={cn("flex items-center gap-2 xl:gap-3", className)}>
        <CTAButton
          to="/get-a-quote"
          variant="user"
          size="header"
          icon={Calculator}
          title="Get a Quote"
        >
          <span className="hidden xl:inline">Get a Quote</span>
        </CTAButton>
        <CTAButton
          href={DRIVER_PLAY_STORE_URL}
          variant="driver"
          size="header"
          icon={Smartphone}
          title="Download Driver App"
        >
          <span className="hidden xl:inline">Download Driver App</span>
        </CTAButton>
      </div>
    );
  }

  const buttons = (
    <>
      <CTAButton
        to="/get-a-quote"
        variant={userVariant}
        size={size}
        icon={Calculator}
        fullWidth={fullWidth || layout === "stacked-mobile"}
      >
        {quoteLabel}
      </CTAButton>
      <CTAButton
        href={DRIVER_PLAY_STORE_URL}
        variant={driverVariant}
        size={size}
        icon={Smartphone}
        fullWidth={fullWidth || layout === "stacked-mobile"}
      >
        {driverLabel}
      </CTAButton>
    </>
  );

  if (layout === "stacked-mobile") {
    return (
      <div
        className={cn(
          "flex flex-col justify-center items-center gap-4 w-full",
          className,
        )}
      >
        {showMobileLabel && (
          <span className="text-white/90 font-semibold text-xs uppercase tracking-wide">
            Get started:
          </span>
        )}
        <div className="flex gap-3 w-full md:w-5/6">{buttons}</div>
      </div>
    );
  }

  return <div className={cn("flex gap-3", className)}>{buttons}</div>;
}
