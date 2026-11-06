import CTAButton, {type CTASize, type CTAVariant} from "@/components/CTAButton";
import {cn} from "@/lib/utils";
import {Truck, UserRound} from "lucide-react";

const USER_LABEL = "Pre-Register as a User";
const DRIVER_LABEL = "Pre-Register as a Driver";

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
  const userLabel = shortLabels ? "User" : USER_LABEL;
  const driverLabel = shortLabels ? "Driver" : DRIVER_LABEL;

  if (layout === "header") {
    return (
      <div className={cn("flex items-center gap-2 xl:gap-3", className)}>
        <CTAButton
          to="/user-register"
          variant="user"
          size="header"
          icon={UserRound}
          title="Pre-Register as User"
        >
          <span className="hidden xl:inline">Pre-Register as User</span>
        </CTAButton>
        <CTAButton
          to="/driver-register"
          variant="driver"
          size="header"
          icon={Truck}
          title="Pre-Register as Driver"
        >
          <span className="hidden xl:inline">Pre-Register as Driver</span>
        </CTAButton>
      </div>
    );
  }

  const buttons = (
    <>
      <CTAButton
        to="/user-register"
        variant={userVariant}
        size={size}
        icon={UserRound}
        fullWidth={fullWidth || layout === "stacked-mobile"}
      >
        {userLabel}
      </CTAButton>
      <CTAButton
        to="/driver-register"
        variant={driverVariant}
        size={size}
        icon={Truck}
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
            Pre-Register as a:
          </span>
        )}
        <div className="flex gap-3 w-full md:w-5/6">{buttons}</div>
      </div>
    );
  }

  return <div className={cn("flex gap-3", className)}>{buttons}</div>;
}
