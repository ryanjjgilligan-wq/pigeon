"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RotateCcw, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Confetti } from "@/components/Confetti";
import { useStore } from "@/store/useStore";
import {
  spinReels,
  type Reward,
  type Category,
  CATEGORIES,
  CATEGORY_ICONS,
  TIER_LABELS,
  TIER_PROBABILITIES,
} from "@/lib/rewards";
import { cn } from "@/lib/utils";

const SPIN_DURATION = 600; // ms per reel
const REEL_STAGGER = 120; // ms between reel stops

type SpinState = "idle" | "spinning" | "result";

export function SlotMachine() {
  const [category, setCategory] = useState<Category>("Learn");
  const [spinState, setSpinState] = useState<SpinState>("idle");
  const [reward, setReward] = useState<Reward | null>(null);
  const [displaySymbols, setDisplaySymbols] = useState<[string, string, string]>(["🎯", "🎯", "🎯"]);
  const [reelsComplete, setReelsComplete] = useState([false, false, false]);
  const [showResult, setShowResult] = useState(false);
  const [currentSpinId, setCurrentSpinId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { soundEnabled, setSoundEnabled, recordSpin, markCompleted, spinHistory, session } = useStore();

  const reelSymbols = ["🎯", "⚡", "🔥", "💎", "🌟", "🎲", "🎰", "🏆", "✨", "💫"];

  const playSound = useCallback(
    (type: "spin" | "win" | "legendary" | "click") => {
      if (!soundEnabled) return;
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        if (type === "spin") {
          oscillator.frequency.setValueAtTime(200, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
        } else if (type === "win") {
          oscillator.frequency.setValueAtTime(523, ctx.currentTime);
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.4);
        } else if (type === "legendary") {
          oscillator.type = "sawtooth";
          oscillator.frequency.setValueAtTime(440, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.5);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.6);
        } else if (type === "click") {
          oscillator.frequency.setValueAtTime(600, ctx.currentTime);
          gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.05);
        }
      } catch {
        // Audio not available
      }
    },
    [soundEnabled]
  );

  const startSpin = useCallback(() => {
    if (spinState !== "idle") return;

    setSpinState("spinning");
    setShowResult(false);
    setReward(null);
    setIsCompleted(false);
    setCurrentSpinId(null);
    setReelsComplete([false, false, false]);
    playSound("spin");

    const result = spinReels(category);

    // Animate random symbols during spin
    let tick = 0;
    spinIntervalRef.current = setInterval(() => {
      tick++;
      setDisplaySymbols([
        reelSymbols[Math.floor(Math.random() * reelSymbols.length)] as string,
        reelSymbols[Math.floor(Math.random() * reelSymbols.length)] as string,
        reelSymbols[Math.floor(Math.random() * reelSymbols.length)] as string,
      ] as [string, string, string]);
      playSound("click");
    }, 80);

    // Stop reels one by one
    setTimeout(() => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
      setDisplaySymbols((prev) => [result.reelSymbols[0], prev[1], prev[2]]);
      setReelsComplete([true, false, false]);
    }, SPIN_DURATION);

    setTimeout(() => {
      setDisplaySymbols((prev) => [prev[0], result.reelSymbols[1], prev[2]]);
      setReelsComplete([true, true, false]);
    }, SPIN_DURATION + REEL_STAGGER);

    setTimeout(() => {
      setDisplaySymbols(result.reelSymbols);
      setReelsComplete([true, true, true]);
      setReward(result);
      setSpinState("result");
      setShowResult(true);

      recordSpin(result);

      // Get the spin ID from the most recent record
      setTimeout(() => {
        const latest = useStore.getState().spinHistory[0];
        if (latest) setCurrentSpinId(latest.id);
      }, 50);

      const soundType =
        result.tier === "ultra_rare" || result.tier === "legendary" ? "legendary" : "win";
      playSound(soundType);
    }, SPIN_DURATION + REEL_STAGGER * 2);
  }, [spinState, category, playSound, recordSpin, reelSymbols]);

  const handleComplete = useCallback(() => {
    if (!currentSpinId || isCompleted) return;
    markCompleted(currentSpinId);
    setIsCompleted(true);
    playSound("win");
  }, [currentSpinId, isCompleted, markCompleted, playSound]);

  const handleSpinAgain = useCallback(() => {
    setSpinState("idle");
    setShowResult(false);
    setReward(null);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && spinState === "idle") {
        e.preventDefault();
        startSpin();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [spinState, startSpin]);

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  const tierConfig = reward
    ? {
        small: { label: "Common Find", color: "text-slate-300", bg: "border-slate-600", glow: "" },
        medium: { label: "Uncommon", color: "text-blue-400", bg: "border-blue-600", glow: "glow-purple" },
        large: { label: "Rare!", color: "text-purple-400", bg: "border-purple-600", glow: "glow-purple" },
        legendary: { label: "LEGENDARY!", color: "text-amber-400", bg: "border-amber-500", glow: "glow-gold" },
        ultra_rare: { label: "ULTRA-RARE!!!!", color: "text-pink-400", bg: "border-pink-500", glow: "glow-pink" },
      }[reward.tier]
    : null;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto px-4">
      <Confetti active={showResult && !!reward} tier={reward?.tier ?? "small"} />

      {/* Sound toggle */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors no-tap-highlight"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Category tabs */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-2 pb-1 min-w-max mx-auto justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (spinState === "idle") {
                  setCategory(cat);
                  playSound("click");
                }
              }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 no-tap-highlight",
                category === cat
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{CATEGORY_ICONS[cat]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slot machine cabinet */}
      <motion.div
        className={cn(
          "w-full rounded-3xl overflow-hidden border-2 transition-all duration-500",
          reward ? tierConfig?.bg : "border-slate-700",
          reward ? tierConfig?.glow : ""
        )}
        animate={spinState === "spinning" ? { scale: [1, 1.01, 1] } : {}}
        transition={{ repeat: Infinity, duration: 0.3 }}
      >
        {/* Machine top decoration */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-2 flex items-center justify-between">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
            {CATEGORY_ICONS[category]} {category}
          </span>
          <div className="text-xs text-slate-500">{session.spinCount} spins</div>
        </div>

        {/* Reels */}
        <div
          className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-4"
          style={{ background: "linear-gradient(180deg, #0f0f23 0%, #1a0a2e 50%, #0f3460 100%)" }}
        >
          {/* Reel display line */}
          <div className="relative flex gap-3 justify-center mb-4">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
              <div className="w-full h-px bg-primary/30" />
            </div>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none translate-y-3">
              <div className="w-full h-px bg-primary/10" />
            </div>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none -translate-y-3">
              <div className="w-full h-px bg-primary/10" />
            </div>

            {displaySymbols.map((symbol, i) => (
              <ReelColumn
                key={i}
                symbol={symbol}
                isSpinning={spinState === "spinning" && !reelsComplete[i]}
                isStopped={reelsComplete[i]}
                isWinner={
                  !!reward &&
                  (reward.tier === "legendary" || reward.tier === "ultra_rare" || reward.tier === "large") &&
                  i < 2
                }
              />
            ))}
          </div>

          {/* Payline indicators */}
          <div className="flex justify-center gap-2 mt-2">
            {["◀", "⬛", "▶"].map((sym, i) => (
              <div key={i} className="text-primary/40 text-xs">{sym}</div>
            ))}
          </div>
        </div>

        {/* Score/credit area */}
        <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-t border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-500">CREDITS</div>
            <div className="text-sm font-bold text-amber-400">{useStore.getState().totalXP} XP</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">SESSION</div>
            <div className="text-sm font-bold text-slate-300">{session.spinCount}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500">WIN</div>
            <div className="text-sm font-bold text-green-400">
              {reward ? `+${reward.xp}` : "--"}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spin button / lever */}
      {spinState === "idle" && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full"
        >
          <Button
            variant="gold"
            size="xl"
            className="w-full text-xl font-black tracking-wide uppercase animate-pulse-glow"
            onClick={startSpin}
          >
            <Zap size={24} className="mr-2" />
            FORAGE
            <span className="text-xs opacity-60 ml-2">or press Space</span>
          </Button>
        </motion.div>
      )}

      {spinState === "spinning" && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="text-primary font-bold tracking-widest text-sm uppercase"
        >
          Searching...
        </motion.div>
      )}

      {/* Result card */}
      <AnimatePresence>
        {showResult && reward && tierConfig && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -10 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className={cn(
              "w-full rounded-2xl border-2 p-5 card-premium",
              tierConfig.bg,
              tierConfig.glow
            )}
          >
            {/* Tier badge */}
            <div className="flex items-center justify-between mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
                  tierConfig.color,
                  tierConfig.bg
                )}
              >
                {tierConfig.label}
              </motion.div>
              <span className={cn("text-sm font-bold", tierConfig.color)}>+{reward.xp} XP</span>
            </div>

            {/* Task */}
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl mt-0.5">{reward.emoji}</span>
              <div>
                <h3 className="font-bold text-white text-base leading-tight mb-1">{reward.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{reward.description}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              {!isCompleted ? (
                <Button
                  onClick={handleComplete}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white"
                  size="sm"
                >
                  <CheckCircle2 size={16} className="mr-1.5" />
                  Done! +{reward.xp} XP
                </Button>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-green-900/40 border border-green-700 text-green-400 text-sm font-semibold"
                >
                  <CheckCircle2 size={16} />
                  XP Earned!
                </motion.div>
              )}
              <Button
                onClick={handleSpinAgain}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                <RotateCcw size={16} className="mr-1.5" />
                Spin Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReelColumn({
  symbol,
  isSpinning,
  isStopped,
  isWinner,
}: {
  symbol: string;
  isSpinning: boolean;
  isStopped: boolean;
  isWinner: boolean;
}) {
  const symbols = ["🎯", "⚡", "🔥", "💎", "🌟", "🎲", "🏆", "✨", "💫", "🎰"];

  return (
    <div className="reel-window w-20 h-20 flex items-center justify-center rounded-xl bg-slate-950/80 border border-slate-700/50 relative">
      {isSpinning ? (
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 0.15 }}
          className="text-4xl select-none"
        >
          {symbol}
        </motion.div>
      ) : (
        <motion.div
          key={symbol}
          initial={isStopped ? { scale: 1.3, opacity: 0 } : {}}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.6, duration: 0.4 }}
          className={cn(
            "text-4xl select-none",
            isWinner && "drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          )}
        >
          {symbol}
        </motion.div>
      )}

      {/* Winner glow */}
      {isStopped && isWinner && (
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute inset-0 rounded-xl bg-amber-400/10 pointer-events-none"
        />
      )}
    </div>
  );
}
