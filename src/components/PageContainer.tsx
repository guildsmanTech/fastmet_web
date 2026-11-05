import {cn} from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// max-w-[85rem] mx-auto px-4 md:px-12

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn("w-full md:max-w-[90rem] mx-auto px-4", className)}
    >
      {children}
    </div>
  );
}
