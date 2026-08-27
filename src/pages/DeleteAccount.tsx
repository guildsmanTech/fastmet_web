import {useMemo, useState} from "react";
import {Helmet} from "react-helmet-async";
import PhoneInput from "react-phone-input-2";
import {Loader2} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import OTPModal from "@/components/modals/OTPModal";
import {Button} from "@/components/ui/button";
import {formatPHNumber} from "@/helper/format";
import {OtpCountdown} from "@/components/ui/OtpCountdown";
import {
  cancelWebDeletion,
  fetchDeletionStatus,
  requestWebDeletion,
  sendDeletionOtp,
  verifyDeletionOtp,
  type WebDeletionAccountStatus,
  type WebDeletionAccountType,
} from "@/api/accountDeletion";

const DELETE_CONFIRM_PHRASE = "delete-my-account";

const DELETED_NOW = [
  "Account profile details (name, phone number, email, gender, saved address)",
  "Profile photo and identity documents (ID, selfie, license, OR/CR, vehicle photos) — files are removed from our storage",
  "Login sessions, refresh tokens, and push-notification tokens",
  "In-app notification records and device-link records for your account",
  "Registration and rejection records tied to your account (anonymized or removed)",
];

const DELETED_AFTER_GRACE = [
  "After the 30-day grace period, remaining personal identifiers on your User/Driver account are permanently anonymized (they cannot be restored).",
];

const RETAINED = [
  "Completed, cancelled, and historical trip/booking records (pickup/drop-off details you entered for a delivery), kept for operations, disputes, and Philippine tax/accounting requirements (typically 3–10 years)",
  "Bond ledger, refund, and reward issuance records for drivers (accounting / BIR)",
  "Safety records such as SOS alerts (liability)",
  "Chat history with the other party, with your identity shown as a deleted account (so their inbox is not wiped)",
  "Fraud-prevention records keyed to a device (not your profile), and email bounce suppression lists",
];

function formatScheduledDate(raw: string | null) {
  if (!raw) return "the scheduled date";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "the scheduled date";
  return date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function accountLabel(type: WebDeletionAccountType) {
  return type === "driver" ? "Driver account" : "User account";
}

export default function DeleteAccountPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sendRateLimit, setSendRateLimit] = useState<number | null>(null);
  const [otpOpen, setOtpOpen] = useState(false);
  const [verifyToken, setVerifyToken] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<WebDeletionAccountStatus[] | null>(
    null,
  );
  const [confirmText, setConfirmText] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  const normalizedPhone = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  const loadStatus = async (token: string) => {
    const result = await fetchDeletionStatus(token);
    if (!result.ok) {
      setError(
        result.data.message ||
          result.data.error ||
          "No FastMet account was found for this number.",
      );
      setAccounts(null);
      return;
    }
    setAccounts(result.data.accounts ?? []);
    setError("");
  };

  const sendOtp = async () => {
    setError("");
    setDoneMessage(null);
    if (!normalizedPhone || normalizedPhone.length < 10) {
      setError("Enter a valid Philippine mobile number.");
      return {error: "Enter a valid Philippine mobile number."};
    }

    setSending(true);
    try {
      const result = await sendDeletionOtp(phone);
      if (!result.ok) {
        if (result.status === 429) {
          const retry = Number(result.data.retryAfter) || 60;
          setSendRateLimit(retry);
        }
        const message =
          result.data.error ||
          result.data.message ||
          "Failed to send OTP. Please try again.";
        setError(message);
        return {error: message};
      }
      setOtpOpen(true);
      return {};
    } catch {
      const message = "Failed to send OTP. Please try again.";
      setError(message);
      return {error: message};
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (code: string) => {
    const result = await verifyDeletionOtp(phone, code);
    if (!result.ok) {
      return {
        success: false,
        error: result.data.error || "Incorrect code. Try again.",
        locked: Boolean(result.data.error?.includes("Too many failed")),
        rateLimitSeconds: result.status === 429 ? 60 : undefined,
      };
    }
    const token = result.data.verifyToken as string;
    setVerifyToken(token);
    setOtpOpen(false);
    await loadStatus(token);
    return {success: true};
  };

  const handleRequest = async (type: WebDeletionAccountType) => {
    if (!verifyToken) return;
    if ((confirmText[type] ?? "") !== DELETE_CONFIRM_PHRASE) return;
    setActionLoading(type);
    setError("");
    try {
      const result = await requestWebDeletion(verifyToken, type);
      if (!result.ok) {
        setError(result.data.message || result.data.error || "Request failed.");
        await loadStatus(verifyToken);
        return;
      }
      const when = formatScheduledDate(result.data.scheduledAt);
      setDoneMessage(
        `${accountLabel(type)} deletion is scheduled for ${when}. Log in to the app or return here within 30 days to cancel.`,
      );
      await loadStatus(verifyToken);
      setConfirmText((prev) => ({...prev, [type]: ""}));
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (type: WebDeletionAccountType) => {
    if (!verifyToken) return;
    setActionLoading(type);
    setError("");
    try {
      const result = await cancelWebDeletion(verifyToken, type);
      if (!result.ok) {
        setError(result.data.message || result.data.error || "Cancel failed.");
        return;
      }
      setDoneMessage(`${accountLabel(type)} deletion was cancelled.`);
      await loadStatus(verifyToken);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="pt-8 bg-white">
      <Helmet>
        <title>Delete Account | FastMet</title>
        <meta
          name="description"
          content="Request deletion of your FastMet account. See what personal data is deleted, what is retained for legal and accounting reasons, and how to cancel during the 30-day grace period."
        />
      </Helmet>
      <section className="py-8 bg-secondary md:py-12 lg:py-16">
        <PageContainer>
          <h1 className="mt-2 text-xl font-bold md:text-3xl text-primary md:text-4xl">
            Delete your FastMet account
          </h1>
          <p className="mt-4 max-w-3xl text-sm md:text-base text-white/80">
            Use this page to request deletion of your FastMet User or Driver
            account. Deletion is scheduled first (30-day grace period). You can
            cancel anytime during that window by verifying this number again or
            logging in on the app.
          </p>
        </PageContainer>
      </section>

      <PageContainer className="py-10 space-y-8 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="p-6 rounded-2xl border border-red-100 bg-red-50/60">
            <h2 className="text-xl font-bold text-gray-900">Data we delete</h2>
            <p className="mt-2 text-sm text-gray-600">
              After the 30-day grace period, we permanently remove or anonymize
              personal account data. This cannot be undone.
            </p>
            <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-gray-800">
              {DELETED_NOW.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {DELETED_AFTER_GRACE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-amber-100 bg-amber-50/70">
            <h2 className="text-xl font-bold text-gray-900">
              Data we retain, and why
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Some records are kept without your personal identifiers because
              Philippine law, tax, safety, or the other party’s history requires
              it. We do not keep your profile to market to you after deletion.
            </p>
            <ul className="mt-4 space-y-2 text-sm list-disc list-inside text-gray-800">
              {RETAINED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 lg:flex-1">
            <h2 className="text-xl font-bold text-gray-900">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm list-decimal list-inside text-gray-800">
              <li>
                Verify the mobile number on your FastMet account with an SMS
                OTP.
              </li>
              <li>
                If you have an active or scheduled booking, or a driver bond /
                refund still processing, deletion is blocked until that is
                finished.
              </li>
              <li>
                Confirm by typing{" "}
                <span className="font-mono font-semibold">
                  {DELETE_CONFIRM_PHRASE}
                </span>
                . We then schedule deletion for 30 days later and sign you out
                of the apps.
              </li>
              <li>
                To cancel, verify this number again on this page (or log in on
                the app) before the scheduled date and tap Cancel Deletion.
              </li>
            </ol>
          </div>

          <div className="flex flex-col justify-center p-6 rounded-2xl border border-gray-200 lg:flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              Request or cancel deletion
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We will not show your bookings, balance, or other account details
              on this page. OTP only proves you own the number.
            </p>

            {doneMessage && (
              <p className="p-3 mt-4 text-sm text-green-800 bg-green-50 rounded-lg">
                {doneMessage}
              </p>
            )}

            {error && (
              <p className="p-3 mt-4 text-sm text-red-700 bg-red-50 rounded-lg">
                {error}
              </p>
            )}

            {!accounts && (
              <form
                className="mx-auto mt-6 w-full max-w-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendOtp();
                }}
              >
                <label className="block mb-2 text-sm font-semibold text-gray-900">
                  Mobile number
                </label>

                <PhoneInput
                  country="ph"
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  onlyCountries={["ph"]}
                  countryCodeEditable={false}
                  disableDropdown
                  inputClass="!w-full !py-2.5 !px-12 !rounded-lg !text-sm !h-auto !border-gray-300"
                  buttonClass="!border !border-gray-300 !rounded-l-lg !bg-white"
                />

                <Button
                  type="submit"
                  disabled={sending || sendRateLimit !== null}
                  className="mt-4 w-full text-white"
                >
                  {sending ? (
                    <span className="flex gap-2 items-center">
                      <Loader2 className="animate-spin size-4" />
                      Sending code…
                    </span>
                  ) : sendRateLimit !== null ? (
                    <OtpCountdown
                      seconds={sendRateLimit}
                      label="Try again in {s}s"
                      onDone={() => setSendRateLimit(null)}
                    />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            )}

            {accounts && (
              <div className="mt-6 space-y-6">
                <p className="text-sm text-gray-600">
                  Verified {formatPHNumber(phone)}. Choose an account below.
                </p>

                {accounts.map((account) => (
                  <div
                    key={account.type}
                    className="p-5 rounded-xl border border-gray-200"
                  >
                    <h3 className="text-lg font-bold text-gray-900">
                      {accountLabel(account.type)}
                    </h3>

                    {account.deletionStatus === "pending_deletion" ? (
                      <>
                        <p className="mt-2 text-sm text-gray-700">
                          Scheduled for deletion on{" "}
                          <span className="font-semibold">
                            {formatScheduledDate(account.deletionScheduledAt)}
                          </span>
                          .
                        </p>

                        <Button
                          type="button"
                          className="mt-4 text-white"
                          disabled={actionLoading === account.type}
                          onClick={() => void handleCancel(account.type)}
                        >
                          {actionLoading === account.type
                            ? "Cancelling…"
                            : "Cancel Deletion"}
                        </Button>
                      </>
                    ) : account.canDelete ? (
                      <>
                        <p className="mt-2 text-sm text-gray-700">
                          Type{" "}
                          <span className="font-mono font-semibold">
                            {DELETE_CONFIRM_PHRASE}
                          </span>{" "}
                          to confirm. You have 30 days to cancel.
                        </p>

                        <input
                          value={confirmText[account.type] ?? ""}
                          onChange={(e) =>
                            setConfirmText((prev) => ({
                              ...prev,
                              [account.type]: e.target.value,
                            }))
                          }
                          autoCapitalize="none"
                          autoCorrect="off"
                          placeholder={DELETE_CONFIRM_PHRASE}
                          className="mt-3 w-full max-w-md px-4 py-2.5 text-sm rounded-lg border border-gray-300 mr-3"
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          className="mt-4"
                          disabled={
                            actionLoading === account.type ||
                            (confirmText[account.type] ?? "") !==
                              DELETE_CONFIRM_PHRASE
                          }
                          onClick={() => void handleRequest(account.type)}
                        >
                          {actionLoading === account.type
                            ? "Scheduling…"
                            : "Delete My Account"}
                        </Button>
                      </>
                    ) : (
                      <p className="mt-2 text-sm text-amber-800">
                        {account.message ||
                          "This account cannot be deleted right now."}
                      </p>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="text-sm font-semibold text-primary"
                  onClick={() => {
                    setAccounts(null);
                    setVerifyToken(null);
                    setDoneMessage(null);
                    setError("");
                  }}
                >
                  Use a different number
                </button>
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      <OTPModal
        open={otpOpen}
        onOpenChange={setOtpOpen}
        phone={phone}
        verifyButtonLabel="Verify"
        onVerifySuccess={() => undefined}
        onVerify={handleVerify}
        onResend={sendOtp}
      />
    </div>
  );
}
