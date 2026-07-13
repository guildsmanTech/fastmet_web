import {useState, useEffect} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {gift_open, gift_close, reward_bg} from "@/constants/images";
import {CheckCheck, Lock, Gift, ArrowLeft} from "lucide-react";

import {useRegistrationCounts} from "@/hooks/useRegistrationQueries";
import {useRafflePrizes, useRewardTiers} from "@/hooks/useRewardQueries";
import type {IRafflePrize, IRewardTier} from "@/types/reward";

const getCurrentLevelIndex = (count: number, levels: IRewardTier[]) => {
  const idx = levels.findIndex((l) => count >= l.min && count <= l.max);
  if (idx !== -1) return idx;
  return count > levels[levels.length - 1].max ? levels.length - 1 : 0;
};

const getLevelProgress = (count: number, level: IRewardTier) => {
  if (count < level.min) return 0;
  if (count > level.max) return 100;
  return Math.round(
    ((count - level.min + 1) / (level.max - level.min + 1)) * 100,
  );
};

// Presentation-only — swap/extend when data comes from DB
const rankStyles = [
  {num: "01", accent: "text-amber-400", dot: "bg-amber-400"},
  {num: "02", accent: "text-slate-400", dot: "bg-slate-400"},
  {num: "03", accent: "text-orange-400", dot: "bg-orange-400"},
];

function RaffleView({
  onBack,
  prizes,
}: {
  onBack: () => void;
  prizes: IRafflePrize[];
}) {
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center cursor-pointer gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back
      </button>

      <div className="flex flex-col justify-center items-center">
        <p className="text-lg font-bold tracking-tight text-gray-900">
          Raffle Prizes
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Pre-register in Levels 1–3 for a raffle entry
        </p>
      </div>

      <div className="divide-y px-4 divide-gray-100">
        {prizes.map(({rank, winners, perks}, i) => {
          const style = rankStyles[i] ?? {
            num: `0${i + 1}`,
            accent: "text-gray-400",
            dot: "bg-gray-400",
          };

          return (
            <div key={rank} className="py-4 flex items-start gap-4">
              <span
                className={`text-2xl font-black tabular-nums leading-none pt-0.5 w-7 shrink-0 ${style.accent}`}
              >
                {style.num}
              </span>
              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-gray-900">{rank}</p>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {winners} {winners === 1 ? "winner" : "winners"}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {perks.map(({label, value}) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-1.5 rounded-full shrink-0 ${style.dot}`}
                        />
                        <span className="text-xs text-gray-500">{label}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-center text-gray-400 border-t border-gray-100 pt-4">
        All vouchers are for{" "}
        <span className="font-semibold text-gray-500">one-time use only</span>.
      </p>
    </div>
  );
}

function RewardPanel({
  levelData,
  count,
  isFilled,
  isCurrent,
}: {
  levelData: IRewardTier;
  count: number;
  isFilled: boolean;
  isCurrent: boolean;
}) {
  const progress = getLevelProgress(count, levelData);
  const allRewards = levelData.rewards.filter((r) => r.vehicle === "all");
  const twoWheel = levelData.rewards.filter((r) => r.vehicle === "2-wheel");
  const fourWheel = levelData.rewards.filter((r) => r.vehicle === "4-6-wheel");
  const hasVehicleSplit = twoWheel.length > 0 || fourWheel.length > 0;
  const isUpcoming = !isFilled && !isCurrent;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
            Level {levelData.level}
          </p>
          <p className="text-base font-bold text-gray-800 leading-tight">
            {levelData.label}
          </p>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            isFilled
              ? "bg-green-100 text-green-700"
              : isCurrent
                ? "bg-primary/10 text-primary"
                : "bg-gray-100 text-gray-400"
          }`}
        >
          {isFilled
            ? "✓ Filled"
            : isCurrent
              ? `${count} / ${levelData.max}`
              : `${levelData.max - levelData.min + 1} slots`}
        </span>
      </div>

      {(isCurrent || isFilled) && (
        <div className="space-y-1">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${isFilled ? "bg-green-500" : "bg-primary"}`}
              style={{width: `${isFilled ? 100 : progress}%`}}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>{isFilled ? "Level complete" : "Slots being filled"}</span>
            <span>{isFilled ? "100%" : `${progress}%`}</span>
          </div>
        </div>
      )}

      {isUpcoming && (
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Lock className="size-3.5 text-gray-400 shrink-0" />
          <p className="text-xs text-gray-400">
            This level unlocks after Level {levelData.level - 1} is filled
          </p>
        </div>
      )}

      <div className="space-y-3">
        {allRewards.length > 0 && (
          <div className="space-y-2">
            {allRewards.map((r, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 shrink-0 size-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isFilled
                      ? "bg-green-500 text-white"
                      : isCurrent
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  ✓
                </span>
                <p
                  className={`text-sm leading-snug ${isUpcoming ? "text-gray-400" : "text-gray-700"}`}
                >
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {hasVehicleSplit && (
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`rounded-xl border p-3 space-y-2 ${isUpcoming ? "opacity-40" : ""} bg-sky-50 border-sky-100`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-lg leading-none">🏍️</span>
                <div>
                  <p className="text-[11px] font-bold text-sky-700 leading-tight">
                    2-Wheel
                  </p>
                  <p className="text-[9px] text-sky-500 leading-tight">
                    Motorcycle
                  </p>
                </div>
              </div>
              <div className="w-full h-px bg-sky-100" />
              <ul className="space-y-1.5">
                {twoWheel.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-xs text-sky-800"
                  >
                    <span className="text-sky-400 shrink-0 mt-0.5 font-bold">
                      +
                    </span>
                    {r.text}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`rounded-xl border p-3 space-y-2 ${isUpcoming ? "opacity-40" : ""} bg-amber-50 border-amber-100`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-lg leading-none">🚛</span>
                <div>
                  <p className="text-[11px] font-bold text-amber-700 leading-tight">
                    4–6 Wheel
                  </p>
                  <p className="text-[9px] text-amber-500 leading-tight">
                    Sedan, Van & up
                  </p>
                </div>
              </div>
              <div className="w-full h-px bg-amber-100" />
              <ul className="space-y-1.5">
                {fourWheel.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-xs text-amber-800"
                  >
                    <span className="text-amber-400 shrink-0 mt-0.5 font-bold">
                      +
                    </span>
                    {r.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function RewardTab({
  levels,
  count,
  showRaffle = false,
  rafflePrizes = [],
}: {
  levels: IRewardTier[];
  count: number;
  showRaffle?: boolean;
  rafflePrizes?: IRafflePrize[];
}) {
  const currentLevelIndex = getCurrentLevelIndex(count, levels);
  const [selectedIndex, setSelectedIndex] = useState(currentLevelIndex);
  const [view, setView] = useState<"rewards" | "raffle">("rewards");

  useEffect(() => {
    setSelectedIndex(currentLevelIndex);
  }, [currentLevelIndex]);

  const selected = levels[selectedIndex];
  const isFilled = count > selected.max;
  const isCurrent = currentLevelIndex === selectedIndex;

  return (
    <div className="space-y-5">
      {/* ── Raffle view replaces everything below ────────────────────────── */}
      {view === "raffle" ? (
        <RaffleView onBack={() => setView("rewards")} prizes={rafflePrizes} /> // ← pass prizes
      ) : (
        <>
          {/* ── Raffle banner ──────────────────────────────────────────────── */}
          {showRaffle && (
            <button
              type="button"
              onClick={() => setView("raffle")}
              className="w-full flex items-center cursor-pointer justify-between gap-3 bg-gradient-to-r from-primary/10 to-orange-100 border border-primary/20 rounded-xl px-4 py-3 hover:from-primary/15 hover:to-orange-200 transition-all duration-200 group"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl leading-none select-none">🎉</span>
                <div className="text-left">
                  <p className="md:text-sm text-xs font-bold text-gray-900 leading-tight">
                    Launch Raffle Prizes
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Pre-register in Levels 1–3 for a raffle entry
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary font-semibold text-xs shrink-0 group-hover:translate-x-0.5 transition-transform">
                <Gift className="size-4" />
                View prizes
              </div>
            </button>
          )}

          {/* ── Summary row ──────────────────────────────────────────────── */}
          <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                Registered so far
              </p>
              <p className="text-2xl font-bold text-primary leading-tight">
                {count.toLocaleString()}
              </p>
            </div>
            <div className="h-8 w-px bg-gray-100" />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">
                You are at
              </p>
              <p className="text-sm font-bold text-gray-800">
                Level {levels[currentLevelIndex].level}
              </p>
              <p className="text-[11px] text-gray-400">
                {levels[currentLevelIndex].label}
              </p>
            </div>
          </div>

          {/* ── Station stepper ──────────────────────────────────────────── */}
          <div className="relative flex items-center justify-between px-2">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded-full" />
            <div
              className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-500"
              style={{
                width: `calc(${(currentLevelIndex / (levels.length - 1)) * 100}% * (100% - 3rem) / 100%)`,
                maxWidth: `calc(100% - 3rem)`,
              }}
            />
            {levels.map((level, i) => {
              const filled = count > level.max;
              const current = currentLevelIndex === i;
              const selected_ = selectedIndex === i;
              return (
                <button
                  key={level.level}
                  type="button"
                  onClick={() => setSelectedIndex(i)}
                  className="relative z-10 flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`
                      size-9 rounded-full flex items-center justify-center
                      border-2 font-bold text-sm transition-all duration-200
                      ${
                        filled
                          ? "bg-green-500 border-green-500 text-white"
                          : current
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/30"
                            : selected_
                              ? "bg-white border-primary text-primary"
                              : "bg-white border-gray-300 text-gray-400"
                      }
                      ${selected_ ? "scale-110 ring-2 ring-primary/20" : "group-hover:scale-105"}
                    `}
                  >
                    {filled ? <CheckCheck className="size-4" /> : level.level}
                  </div>
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight max-w-[56px] transition-colors ${
                      selected_ ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    {level.level === 1
                      ? `≤${level.max}`
                      : level.level === levels.length
                        ? `${level.min}+`
                        : `${level.min}–${level.max}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Reward panel ─────────────────────────────────────────────── */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm min-h-[160px]">
            <RewardPanel
              levelData={selected}
              count={count}
              isFilled={isFilled}
              isCurrent={isCurrent}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function RewardModal() {
  const [open, setOpen] = useState(false);

  const {data: counts} = useRegistrationCounts();
  const driverCount = counts?.drivers ?? 0;
  const userCount = counts?.users ?? 0;

  const {
    data: driverTiers,
    isLoading: loadingDriverTiers,
    isError: errorDriverTiers,
  } = useRewardTiers("driver");

  const {
    data: userTiers,
    isLoading: loadingUserTiers,
    isError: errorUserTiers,
  } = useRewardTiers("user");

  const {
    data: rafflePrizes,
    isLoading: loadingRaffle,
    isError: errorRaffle,
  } = useRafflePrizes();

  const isLoading = loadingDriverTiers || loadingUserTiers || loadingRaffle;
  const isError = errorDriverTiers || errorUserTiers || errorRaffle;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center gap-1 flex-col fixed bottom-2 right-2 z-[100] cursor-pointer">
          <img
            src={open ? gift_open : gift_close}
            alt="Gift box"
            className={`lg:size-30 size-15 object-contain md:size-20 transition-transform duration-300 ease-in-out ${open ? "scale-110" : ""}`}
          />
          <p
            className="hidden md:block text-white text-xs xl:text-sm font-bold"
            style={{
              textShadow:
                "0 1px 0 rgba(0,0,0,0.85), 0 -1px 0 rgba(0,0,0,0.85), 1px 0 0 rgba(0,0,0,0.85), -1px 0 0 rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            Pre-Registered Rewards
          </p>
        </div>
      </DialogTrigger>

      <DialogContent
        className="
          p-0 w-[95vw] max-w-md md:max-w-lg
          z-[9999] border-none overflow-hidden rounded-2xl
          [&>button]:absolute [&>button]:top-3 [&>button]:right-3 [&>button]:z-20
          [&>button]:bg-black/30 [&>button]:hover:bg-black/50
          [&>button]:text-white [&>button]:rounded-full [&>button]:p-1 [&>button]:transition-colors
        "
      >
        <DialogDescription className="sr-only">
          Pre-Registration Rewards
        </DialogDescription>

        {/* Hero header */}
        <div
          className="relative w-full h-24 flex items-center justify-center shrink-0"
          style={{
            backgroundImage: `url(${reward_bg})`,
            backgroundSize: "contain",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <DialogHeader className="relative z-10 text-center px-6">
            <DialogTitle className="text-lg md:text-2xl font-bold text-white drop-shadow-lg">
              Pre-Registration Rewards
            </DialogTitle>
            <p className="text-white/75 text-xs mt-0.5">
              Register early · Claim exclusive rewards at launch
            </p>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="bg-gray-50 px-4 pb-6 pt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : isError ? (
            <p className="text-sm text-red-400 text-center py-12">
              Failed to load rewards. Please try again later.
            </p>
          ) : (
            <Tabs defaultValue="driver">
              <TabsList className="w-full bg-white border border-gray-200 rounded-lg p-1 mb-5 h-auto">
                <TabsTrigger
                  value="driver"
                  className="flex-1 text-xs font-semibold py-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all"
                >
                  🚗 Driver Rewards
                </TabsTrigger>
                <TabsTrigger
                  value="user"
                  className="flex-1 text-xs font-semibold py-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all"
                >
                  📦 User Rewards
                </TabsTrigger>
              </TabsList>
              <TabsContent value="driver">
                <RewardTab levels={driverTiers ?? []} count={driverCount} />
              </TabsContent>
              <TabsContent value="user">
                <RewardTab
                  levels={userTiers ?? []}
                  count={userCount}
                  showRaffle
                  rafflePrizes={rafflePrizes ?? []}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
