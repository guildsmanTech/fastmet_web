import {cn} from "@/lib/utils";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn("w-full max-w-[85rem] mx-auto px-4 md:px-12", className)}
    >
      {children}
    </div>
  );
}
