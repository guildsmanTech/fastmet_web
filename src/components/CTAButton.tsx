import {cn} from "@/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";
import type {LucideIcon} from "lucide-react";
import {Link} from "react-router-dom";

export const ctaButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition whitespace-nowrap",
  {
    variants: {
      variant: {
        user: "bg-white text-secondary hover:bg-zinc-200",
        driver: "bg-primary hover:bg-primary-hover text-white",
        primary: "bg-primary text-white hover:bg-primary-hover",
        outline:
          "bg-white text-secondary border-2 border-primary hover:bg-zinc-200",
        "hero-outline":
          "border border-white text-white hover:bg-gray-100 hover:text-black",
        "outline-primary":
          "border border-primary text-primary hover:bg-primary hover:text-white",
        "ghost-border":
          "border-2 border-primary hover:text-white hover:bg-primary-hover shadow-xl",
        "user-soft-border":
          "bg-white text-secondary border border-white lg:border-zinc-200 hover:bg-zinc-100",
      },
      size: {
        sm: "text-xs px-2 py-3",
        md: "text-sm px-6 py-3",
        header: "text-xs px-3 xl:px-4 py-2",
        compact: "text-xs px-3 py-2 lg:text-sm lg:py-3 lg:px-5 text-center",
        card: "text-[11px] md:text-xs px-3 py-2",
      },
      fullWidth: {
        true: "flex-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "user",
      size: "md",
      fullWidth: false,
    },
  },
);

export type CTAVariant = NonNullable<
  VariantProps<typeof ctaButtonVariants>["variant"]
>;
export type CTASize = NonNullable<
  VariantProps<typeof ctaButtonVariants>["size"]
>;

type CTAButtonProps = VariantProps<typeof ctaButtonVariants> & {
  to?: string;
  href?: string;
  icon?: LucideIcon;
  className?: string;
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function CTAButton({
  to,
  href,
  variant,
  size,
  fullWidth,
  icon: Icon,
  className,
  title,
  children,
  onClick,
}: CTAButtonProps) {
  const classes = cn(
    ctaButtonVariants({variant, size, fullWidth}),
    className,
    "cursor-pointer",
  );
  const content = (
    <>
      {Icon && <Icon className="size-4 shrink-0" />}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} title={title}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} title={title}>
        {content}
      </button>
    );
  }

  return (
    <Link to={to ?? "/"} className={classes} title={title}>
      {content}
    </Link>
  );
}
