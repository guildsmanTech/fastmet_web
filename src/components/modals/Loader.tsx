import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { logo } from "@/constants/images";

interface LoaderModalProps {
  open: boolean;
}

export default function LoaderModal({ open }: LoaderModalProps) {
  return (
    <Dialog open={open}>
      <DialogContent
        className="flex flex-col items-center z-[9999] justify-center bg-transparent border-none shadow-none outline-none"
        showCloseButton={false}
      >
        <DialogDescription className="sr-only">
          This is a loading spinner
        </DialogDescription>
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute animate-spin rounded-full size-24 lg:size-40 border-t-3 border-b-3 border-primary/80" />
          <img
            src={logo}
            alt="FastMet logo"
            className="size-12 z-10 lg:size-20"
          />
        </div>
        <DialogTitle className="mt-5 lg:text-lg lg:mt-12 text-sm font-medium text-white">
          Loading...
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
