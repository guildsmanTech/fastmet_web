import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import "./company-registration.css";
import CompanyRegistrationForm from "./CompanyRegistrationForm";

export default function CompanyRegistrationDialog() {
  const [params, setParams] = useSearchParams();
  const open = params.get("register") === "1";
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const closeInvoker = useRef<HTMLElement | null>(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  function requestClose() {
    if (busy) return;
    if (dirty) {
      closeInvoker.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setConfirmDiscard(true);
      return;
    }
    closeApplication();
  }
  function closeApplication() {
    setConfirmDiscard(false);
    setDirty(false);
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.delete("register");
        return next;
      },
      { replace: true },
    );
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) requestClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className={`fleet-registration ${success ? "fleet-registration--success" : ""}`}
        onPointerDownOutside={(event) => {
          // Only the registration backdrop should request dismissal.
          const target = event.target;
          if (!(target instanceof HTMLElement) || target.dataset.slot !== "dialog-overlay") {
            event.preventDefault();
          }
        }}
        onOpenAutoFocus={() => {
          setSuccess(false);
          const active = document.activeElement;
          trigger.current =
            active instanceof HTMLElement && active !== document.body ? active : null;
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const target = trigger.current?.isConnected
            ? trigger.current
            : document.querySelector<HTMLElement>("[data-fleet-register]");
          target?.focus();
        }}
      >
        <div className="fleet-sheet-handle" aria-hidden="true" />
        <header className={success ? "sr-only" : "fleet-registration-header"}>
          <DialogTitle className="fleet-registration-title">Register your company</DialogTitle>
          <DialogDescription className="fleet-registration-description">
            <span className="fleet-desktop-description">Add your business details and documents. We’ll review your application before creating your account. No password needed.</span>
            <span className="fleet-mobile-description">No password needed. A FastMet admin reviews your application first.</span>
          </DialogDescription>
        </header>
        <Button type="button" variant="outline" size="icon" onClick={requestClose}
          disabled={busy} aria-label="Close company registration" className="fleet-close">
          <X aria-hidden="true" />
        </Button>
        <CompanyRegistrationForm
          onClose={requestClose}
          onDirtyChange={setDirty}
          onBusyChange={setBusy}
          onSuccessChange={setSuccess}
        />
        <AlertDialog open={confirmDiscard} onOpenChange={setConfirmDiscard}>
          <AlertDialogContent
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              if (closeInvoker.current?.isConnected) closeInvoker.current.focus();
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Discard this application?</AlertDialogTitle>
              <AlertDialogDescription>
                Your entered details and selected files have not been submitted. Keep editing to
                save your progress in this dialog.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="min-h-12">Keep editing</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                className="min-h-12"
                onClick={closeApplication}
              >
                Discard application
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
}
