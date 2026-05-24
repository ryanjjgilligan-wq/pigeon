"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Flame, Star, BookOpen, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { useStore, getEvolutionLabel } from "@/store/useStore";
import { JOGAN_DAILY_TIPS } from "@/lib/jogan-facts";
import { CATEGORY_ICONS } from "@/lib/rewards";
import { formatNumber, cn } from "@/lib/utils";

const EVOLUTION_EMOJIS = ["🦴", "🐒", "🚶", "🏹", "⚒️", "🎨", "📜", "⚗️", "🔭", "💡", "🚀"];

export default function DashboardPage() {
  const router = useRouter();
  const {
    hasOnboarded,
    totalXP,
    streak,
    totalSpins,
    completedTasks,
    spinHistory,
    profile,
    session,
    checkAndUpdateStreak,
  } = useStore();

  useEffect(() => {
    if (!hasOnboarded) {
      router.replace("/onboarding");
    }
    checkAndUpdateStreak();
  }, [hasOnboarded, router, checkAndUpdateStreak]);

  if (!hasOnboarded) return null;

  const evo = getEvolutionLabel(totalXP);
  const dailyTip = JOGAN_DAILY_TIPS[Math.floor(Date.now() / 86400000) % JOGAN_DAILY_TIPS.length];
  const recentSpins = spinHistory.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-safe">
        {/* Header */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <div>
            <h1 className="text-2xl font-black text-white">
              Forage <span className="text-amber-400">🎰</span>
            </h1>
            <p className="text-xs text-slate-400">Win real life</p>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <Settings size={20} />
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mt-4"
        >
          <StatCard
            icon={<Flame size={18} className="text-orange-400" />}
            value={streak}
            label="Streak"
            highlight={streak >= 3}
          />
          <StatCard
            icon={<Star size={18} className="text-amber-400" />}
            value={formatNumber(totalXP)}
            label="Total XP"
          />
          <StatCard
            icon={<Zap size={18} className="text-blue-400" />}
            value={totalSpins}
            label="Spins"
          />
        </motion.div>

        {/* Evolution bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 card-premium rounded-2xl p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{EVOLUTION_EMOJIS[evo.level]}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{evo.label}</span>
                <span className="text-xs text-slate-400">
                  {formatNumber(totalXP)} / {formatNumber(evo.nextThreshold)} XP
                </span>
              </div>
              <Progress
                value={evo.progress}
                className="mt-1.5 h-2 bg-slate-800"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp size={12} />
            <span>{evo.progress.toFixed(0)}% to next evolution</span>
          </div>
        </motion.div>

        {/* FORAGE NOW hero button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
          className="mt-6"
        >
          <Link href="/forage">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-3xl overflow-hidden no-tap-highlight"
            >
              <div
                className="relative py-8 px-6 text-center"
                style={{
                  background: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24, #f59e0b, #b45309)",
                  backgroundSize: "200% 200%",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
                  className="text-6xl mb-3"
                >
                  🎰
                </motion.div>
                <div className="text-3xl font-black text-black tracking-wider">
                  FORAGE NOW
                </div>
                <div className="text-sm text-black/70 mt-1 font-medium">
                  Your next reward is waiting
                </div>

                {/* Lever visual */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-3 h-12 rounded-full bg-black/20 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-black/30" />
                  </div>
                </div>
              </div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Your zones quick launch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
            Your Zones
          </h2>
          <div className="flex gap-2 flex-wrap">
            {profile.zones.map((zone) => (
              <Link key={zone} href={`/forage?cat=${zone}`}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl card-premium text-sm font-medium no-tap-highlight hover:border-amber-500/40 transition-colors"
                >
                  <span>{CATEGORY_ICONS[zone]}</span>
                  <span>{zone}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Jogan daily tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 rounded-2xl bg-indigo-950/60 border border-indigo-800/40 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={14} className="text-indigo-400" />
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Jogan Mode</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{dailyTip}"
          </p>
          <Link href="/jogan" className="text-xs text-indigo-400 mt-2 block hover:underline">
            Learn the psychology →
          </Link>
        </motion.div>

        {/* Session stats */}
        {session.spinCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded-2xl bg-slate-800/40 border border-slate-700/40 p-4"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              This Session
            </h3>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-white font-bold">{session.spinCount}</span>
                <span className="text-slate-400 ml-1">spins</span>
              </div>
              <div>
                <span className="text-amber-400 font-bold">+{session.totalXpThisSession}</span>
                <span className="text-slate-400 ml-1">XP earned</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent activity */}
        {recentSpins.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 mb-4"
          >
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              Recent Finds
            </h2>
            <div className="space-y-2">
              {recentSpins.map((spin) => (
                <motion.div
                  key={spin.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/30"
                >
                  <span className="text-xl">{spin.reward.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {spin.reward.title}
                    </div>
                    <div className="text-xs text-slate-400">{spin.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {spin.completed && (
                      <span className="text-green-400 text-xs font-bold">✓</span>
                    )}
                    <span className="text-xs text-amber-400 font-bold">
                      +{spin.reward.xp}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Navigation />
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  highlight,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className={cn(
        "card-premium rounded-2xl p-3 text-center",
        highlight && "border-orange-500/40 glow-gold"
      )}
    >
      <div className="flex justify-center mb-1">{icon}</div>
      <div className={cn(
        "text-xl font-black",
        highlight ? "text-orange-400" : "text-white"
      )}>
        {value}
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </motion.div>
  );
}
