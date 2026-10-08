import {useEffect, useMemo, useRef, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {Loader2, Route} from "lucide-react";
import PageContainer from "@/components/PageContainer";
import {Button} from "@/components/ui/button";
import BookingTypeTabs from "@/components/quote/BookingTypeTabs";
import ItemTypeSelect from "@/components/quote/ItemTypeSelect";
import PlaceAutocompleteInput, {
  type SelectedPlace,
} from "@/components/quote/PlaceAutocompleteInput";
import VehicleQuoteCard from "@/components/quote/VehicleQuoteCard";
import {fetchPublicQuote, QuoteApiError} from "@/api/quote";
import {pickRecommended} from "@/helper/itemTypes";
import {getRecaptchaV3Token, preloadRecaptchaV3} from "@/lib/recaptchaV3";
import type {PublicQuoteResponse, QuoteTab} from "@/types/quote";

const RECAPTCHA_ACTION = "get_quote";
// Stops double-click / rapid re-submits after each response.
const COOLDOWN_MS = 3000;
// Matches the server's response cache; older results are re-requested.
const MEMORY_TTL_MS = 2 * 60 * 1000;
const TAB_ORDER: QuoteTab[] = ["asap", "schedule", "pooling"];

const coordKey = (p: SelectedPlace) =>
  `${p.coords.lat.toFixed(4)},${p.coords.lng.toFixed(4)}`;

const tripKeyOf = (pickup: SelectedPlace, dropoff: SelectedPlace) =>
  `${coordKey(pickup)}|${coordKey(dropoff)}`;

export default function GetQuotePage() {
  const [pickup, setPickup] = useState<SelectedPlace | null>(null);
  const [dropoff, setDropoff] = useState<SelectedPlace | null>(null);
  const [itemType, setItemType] = useState<string | null>(null);

  const [quote, setQuote] = useState<PublicQuoteResponse | null>(null);
  const [tab, setTab] = useState<QuoteTab>("asap");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{message: string; code?: string} | null>(
    null,
  );
  const [coolingDown, setCoolingDown] = useState(false);
  /** Trip key locked after a successful quote (button stays off until inputs change or TTL). */
  const [lockedTrip, setLockedTrip] = useState<{
    key: string;
    until: number;
  } | null>(null);

  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const scrollToResults = useRef(false);

  useEffect(() => {
    preloadRecaptchaV3();
    return () => {
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
      if (lockTimer.current) clearTimeout(lockTimer.current);
    };
  }, []);

  // Mobile: after a successful quote, scroll the results into view.
  useEffect(() => {
    if (!quote || !scrollToResults.current) return;
    scrollToResults.current = false;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    resultsRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
  }, [quote]);

  const availableTabs = useMemo(
    () => (quote ? TAB_ORDER.filter((t) => quote.bookingTypes[t]) : []),
    [quote],
  );

  const recommended = useMemo(
    () => (quote ? pickRecommended(quote.vehicles, itemType) : null),
    [quote, itemType],
  );

  const tripKey = pickup && dropoff ? tripKeyOf(pickup, dropoff) : null;
  const alreadyQuoted = Boolean(
    quote &&
    lockedTrip &&
    tripKey &&
    lockedTrip.key === tripKey &&
    Date.now() < lockedTrip.until,
  );

  const canSubmit =
    Boolean(pickup && dropoff) && !loading && !coolingDown && !alreadyQuoted;

  const lockTrip = (key: string) => {
    if (lockTimer.current) clearTimeout(lockTimer.current);
    const until = Date.now() + MEMORY_TTL_MS;
    setLockedTrip({key, until});
    lockTimer.current = setTimeout(() => setLockedTrip(null), MEMORY_TTL_MS);
  };

  const handleGetPrice = async () => {
    if (!pickup || !dropoff || loading || coolingDown) return;
    setError(null);

    const key = tripKeyOf(pickup, dropoff);
    if (
      quote &&
      lockedTrip &&
      lockedTrip.key === key &&
      Date.now() < lockedTrip.until
    ) {
      return; // same trip already on screen: no captcha, no request
    }

    setLoading(true);
    try {
      const recaptchaToken = await getRecaptchaV3Token(RECAPTCHA_ACTION);
      const result = await fetchPublicQuote({
        pickUp: {
          coords: pickup.coords,
          placeId: pickup.placeId,
          address: pickup.label,
        },
        dropOff: {
          coords: dropoff.coords,
          placeId: dropoff.placeId,
          address: dropoff.label,
        },
        recaptchaToken,
      });
      const tabs = TAB_ORDER.filter((t) => result.bookingTypes[t]);
      scrollToResults.current = true;
      setQuote(result);
      setTab((current) =>
        tabs.includes(current) ? current : (tabs[0] ?? "asap"),
      );
      lockTrip(key);
    } catch (err) {
      setQuote(null);
      setLockedTrip(null);
      if (lockTimer.current) clearTimeout(lockTimer.current);
      if (err instanceof QuoteApiError) {
        setError({message: err.message, code: err.code});
      } else {
        setError({
          message:
            "Verification failed. Please refresh the page and try again.",
        });
      }
    } finally {
      setLoading(false);
      setCoolingDown(true);
      cooldownTimer.current = setTimeout(
        () => setCoolingDown(false),
        COOLDOWN_MS,
      );
    }
  };

  return (
    <div className="pt-8 bg-gray-50 min-h-dvh">
      <Helmet>
        <title>Get a Quote | FastMet</title>
        <meta
          name="description"
          content="Enter your pickup and drop-off to see FastMet delivery prices for every vehicle and load size."
        />
      </Helmet>

      <section className="py-8 bg-secondary md:py-12">
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

      <PageContainer className="py-8 md:py-12 lg:py-14">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-8">
          <form
            className="w-full p-5 space-y-5 bg-white border border-gray-200 shadow-sm rounded-2xl sm:p-6 md:p-8 lg:sticky lg:top-24"
            onSubmit={(e) => {
              e.preventDefault();
              void handleGetPrice();
            }}
          >
            <div>
              <h2 className="text-base font-bold text-secondary md:text-lg">
                Trip details
              </h2>
              <p className="mt-1 text-xs text-gray-500 md:text-sm">
                Enter pickup and drop-off to see prices.
              </p>
            </div>

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
              <div
                role="alert"
                className="p-3 text-xs text-red-700 rounded-lg md:text-sm bg-red-50 space-y-1.5"
              >
                <p>
                  {error.code === "PICKUP_AREA"
                    ? "Pickup is outside our service area. We only accept pickups in Greater Manila (see supported cities)."
                    : error.code === "DROPOFF_AREA"
                      ? "Drop-off is outside our delivery area. Destinations must be reachable by continuous land travel (no ferry)."
                      : error.message}
                </p>
                {(error.code === "PICKUP_AREA" ||
                  error.code === "DROPOFF_AREA") && (
                  <p>
                    <Link
                      to={
                        error.code === "PICKUP_AREA"
                          ? "/#service-areas"
                          : "/#coverage"
                      }
                      className="font-medium underline underline-offset-2 hover:text-red-900"
                    >
                      {error.code === "PICKUP_AREA"
                        ? "View supported pickup cities"
                        : "View delivery coverage"}
                    </Link>
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={!canSubmit}
              className="py-5 w-full text-white cursor-pointer"
            >
              {loading ? (
                <span className="flex gap-2 items-center">
                  <Loader2 className="animate-spin size-4" />
                  Getting price…
                </span>
              ) : alreadyQuoted ? (
                "Price ready"
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

          <section
            ref={resultsRef}
            className="w-full min-w-0 scroll-mt-24"
            aria-live="polite"
          >
            {quote ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 p-4 bg-white border border-gray-200 shadow-sm rounded-2xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div>
                    <h2 className="text-base font-bold text-secondary md:text-lg">
                      Available vehicles
                    </h2>
                    <p className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Route className="size-4 text-primary shrink-0" />
                      About {quote.distanceKm} km
                    </p>
                  </div>
                  {availableTabs.length > 1 && (
                    <BookingTypeTabs
                      tabs={availableTabs}
                      active={tab}
                      onChange={setTab}
                    />
                  )}
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  {quote.vehicles.map((vehicle) => {
                    const isRecommended =
                      recommended?.vehicleTypeId === vehicle.vehicleTypeId;
                    return (
                      <VehicleQuoteCard
                        // Remount so the recommended card opens when the item changes.
                        key={`${vehicle.vehicleTypeId}-${isRecommended}`}
                        vehicle={vehicle}
                        tab={tab}
                        recommendedVariantId={
                          isRecommended ? recommended.variantId : null
                        }
                        defaultOpen={isRecommended}
                      />
                    );
                  })}
                </div>

                <p className="px-1 text-xs text-center text-gray-500">
                  Delivery fee only. Prices are estimates and may change with
                  demand at the time of booking.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center bg-white border border-dashed border-gray-200 rounded-2xl sm:py-16 lg:min-h-[28rem]">
                <div className="flex items-center justify-center rounded-full size-12 bg-primary/10">
                  <Route className="size-6 text-primary" />
                </div>
                <p className="text-sm font-semibold text-secondary md:text-base">
                  Your prices will show here
                </p>
                <p className="max-w-xs text-xs text-gray-500 md:text-sm">
                  Add pickup and drop-off, then tap Get price to compare
                  vehicles and load sizes.
                </p>
              </div>
            )}
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
