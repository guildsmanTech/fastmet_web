import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loader2, Route } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import BookingTypeTabs from "@/components/quote/BookingTypeTabs";
import ItemTypeSelect from "@/components/quote/ItemTypeSelect";
import PlaceAutocompleteInput, {
  type SelectedPlace,
} from "@/components/quote/PlaceAutocompleteInput";
import VehicleQuoteCard from "@/components/quote/VehicleQuoteCard";
import { fetchPublicQuote, QuoteApiError } from "@/api/quote";
import { pickRecommended } from "@/helper/itemTypes";
import { getRecaptchaV3Token, preloadRecaptchaV3 } from "@/lib/recaptchaV3";
import type { PublicQuoteResponse, QuoteTab } from "@/types/quote";

const RECAPTCHA_ACTION = "get_quote";
// Stops double-click / rapid re-submits after each response.
const COOLDOWN_MS = 3000;
// Matches the server's response cache; older results are re-requested.
const MEMORY_TTL_MS = 2 * 60 * 1000;
const TAB_ORDER: QuoteTab[] = ["asap", "schedule", "pooling"];

const coordKey = (p: SelectedPlace) =>
  `${p.coords.lat.toFixed(4)},${p.coords.lng.toFixed(4)}`;

export default function GetQuotePage() {
  const [pickup, setPickup] = useState<SelectedPlace | null>(null);
  const [dropoff, setDropoff] = useState<SelectedPlace | null>(null);
  const [itemType, setItemType] = useState<string | null>(null);

  const [quote, setQuote] = useState<PublicQuoteResponse | null>(null);
  const [tab, setTab] = useState<QuoteTab>("asap");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coolingDown, setCoolingDown] = useState(false);

  // Key + time of the quote currently on screen (to avoid duplicate requests).
  const lastQuoted = useRef<{ key: string; at: number } | null>(null);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    preloadRecaptchaV3();
    return () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, []);

  const availableTabs = useMemo(
    () => (quote ? TAB_ORDER.filter((t) => quote.bookingTypes[t]) : []),
    [quote],
  );

  const recommended = useMemo(
    () => (quote ? pickRecommended(quote.vehicles, itemType) : null),
    [quote, itemType],
  );

  const canSubmit = Boolean(pickup && dropoff) && !loading && !coolingDown;

  const handleGetPrice = async () => {
    if (!pickup || !dropoff || loading || coolingDown) return;
    setError("");

    const key = `${coordKey(pickup)}|${coordKey(dropoff)}`;
    const last = lastQuoted.current;
    if (quote && last && last.key === key && Date.now() - last.at < MEMORY_TTL_MS) {
      return; // same trip already on screen: no new captcha, no request
    }

    setLoading(true);
    try {
      // Fresh single-use token on every click.
      const recaptchaToken = await getRecaptchaV3Token(RECAPTCHA_ACTION);
      const result = await fetchPublicQuote({
        pickUp: { coords: pickup.coords },
        dropOff: { coords: dropoff.coords },
        recaptchaToken,
      });
      const tabs = TAB_ORDER.filter((t) => result.bookingTypes[t]);
      setQuote(result);
      setTab((current) => (tabs.includes(current) ? current : (tabs[0] ?? "asap")));
      lastQuoted.current = { key, at: Date.now() };
    } catch (err) {
      setQuote(null);
      lastQuoted.current = null;
      if (err instanceof QuoteApiError) {
        setError(err.message);
      } else {
        setError("Verification failed. Please refresh the page and try again.");
      }
    } finally {
      setLoading(false);
      setCoolingDown(true);
      cooldownTimer.current = setTimeout(() => setCoolingDown(false), COOLDOWN_MS);
    }
  };

  return (
    <div className="pt-8 bg-white">
      <Helmet>
        <title>Get a Quote | FastMet</title>
        <meta
          name="description"
          content="Enter your pickup and drop-off to see FastMet delivery prices for every vehicle and load size."
        />
      </Helmet>

      <section className="py-8 bg-secondary md:py-12 lg:py-16">
        <PageContainer>
          <h1 className="mt-2 text-xl font-bold text-primary md:text-4xl">
            Get a Quote
          </h1>
          <p className="mt-4 max-w-3xl text-sm md:text-base text-white/80">
            See the delivery price for every FastMet vehicle and load size. No
            account needed.
          </p>
        </PageContainer>
      </section>

      <PageContainer className="py-10 md:py-14">
        <form
          className="w-full max-w-2xl p-5 mx-auto space-y-5 bg-white border border-gray-200 shadow-sm rounded-2xl md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            void handleGetPrice();
          }}
        >
          <PlaceAutocompleteInput
            label="Pickup"
            placeholder="Enter pickup address"
            onChange={setPickup}
            disabled={loading}
          />
          <PlaceAutocompleteInput
            label="Drop-off"
            placeholder="Enter drop-off address"
            onChange={setDropoff}
            disabled={loading}
          />
          <ItemTypeSelect value={itemType} onChange={setItemType} />

          {error && (
            <p
              role="alert"
              className="p-3 text-xs text-red-700 rounded-lg md:text-sm bg-red-50"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-5 text-white cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin size-4" />
                Getting price…
              </span>
            ) : (
              "Get price"
            )}
          </Button>

          <p className="text-[11px] leading-snug text-center text-gray-400">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>

        {quote && (
          <section className="w-full max-w-2xl mx-auto mt-10 space-y-4" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <Route className="size-4 text-primary" />
                About {quote.distanceKm} km
              </p>
              {availableTabs.length > 1 && (
                <BookingTypeTabs tabs={availableTabs} active={tab} onChange={setTab} />
              )}
            </div>

            <div className="space-y-3">
              {quote.vehicles.map((vehicle) => {
                const isRecommended = recommended?.vehicleTypeId === vehicle.vehicleTypeId;
                return (
                  <VehicleQuoteCard
                    // Remount so the recommended card opens when the item changes.
                    key={`${vehicle.vehicleTypeId}-${isRecommended}`}
                    vehicle={vehicle}
                    tab={tab}
                    recommendedVariantId={isRecommended ? recommended.variantId : null}
                    defaultOpen={isRecommended}
                  />
                );
              })}
            </div>

            <p className="text-xs text-center text-gray-500">
              Delivery fee only. Prices are estimates and may change with demand
              at the time of booking.
            </p>
          </section>
        )}
      </PageContainer>
    </div>
  );
}
