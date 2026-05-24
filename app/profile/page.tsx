"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Download, Star, Zap, CheckSquare, Flame, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { useStore, getEvolutionLabel } from "@/store/useStore";
import { CATEGORY_ICONS, type Category } from "@/lib/rewards";
import { formatNumber } from "@/lib/utils";

const EVOLUTION_STEPS = [
  { level: 0, emoji: "🦴", label: "Cave Person" },
  { level: 1, emoji: "🐒", label: "Early Forager" },
  { level: 2, emoji: "🚶", label: "Nomad" },
  { level: 3, emoji: "🏹", label: "Hunter" },
  { level: 4, emoji: "⚒️", label: "Craftsman" },
  { level: 5, emoji: "🎨", label: "Artisan" },
  { level: 6, emoji: "📜", label: "Scholar" },
  { level: 7, emoji: "⚗️", label: "Explorer" },
  { level: 8, emoji: "🔭", label: "Scientist" },
  { level: 9, emoji: "💡", label: "Innovator" },
  { level: 10, emoji: "🚀", label: "Modern Human" },
];

export default function ProfilePage() {
  const {
    totalXP,
    streak,
    totalSpins,
    completedTasks,
    spinHistory,
    profile,
  } = useStore();

  const evo = getEvolutionLabel(totalXP);

  // Category breakdown
  const categoryCounts = spinHistory.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)[0];

  const handleExport = () => {
    const data = {
      profile,
      totalXP,
      streak,
      totalSpins,
      completedTasks,
      spinHistory: spinHistory.slice(0, 50),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forage-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 pb-28">
      <div className="max-w-lg mx-auto px-4 pt-safe">
        {/* Header */}
        <div className="pt-6 pb-4 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">Profile</h1>
          <Button variant="outline" size="sm" onClick={handleExport} className="text-xs gap-1.5">
            <Download size={14} />
            Export
          </Button>
        </div>

        {/* Evolution avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-premium rounded-3xl p-6 text-center mb-4"
        >
          <motion.div
            key={evo.level}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-8xl mb-3"
          >
            {EVOLUTION_STEPS[evo.level]?.emoji ?? "🚀"}
          </motion.div>
          <h2 className="text-2xl font-black text-white">{profile.name}</h2>
          <p className="text-amber-400 font-semibold">{evo.label}</p>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>{formatNumber(totalXP)} XP</span>
              <span>{formatNumber(evo.nextThreshold)} XP</span>
            </div>
            <Progress value={evo.progress} className="h-3 bg-slate-800" />
            <p className="text-xs text-slate-500 mt-1.5">
              {(evo.nextThreshold - totalXP)} XP to next evolution
            </p>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: <Star size={20} className="text-amber-400" />, val: formatNumber(totalXP), label: "Total XP" },
            { icon: <Flame size={20} className="text-orange-400" />, val: streak, label: "Day Streak" },
            { icon: <Zap size={20} className="text-blue-400" />, val: totalSpins, label: "Total Spins" },
            { icon: <CheckSquare size={20} className="text-green-400" />, val: completedTasks, label: "Completed" },
          ].map((stat) => (
            <div key={stat.label} className="card-premium rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-white">{stat.val}</div>
              <div className="text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category breakdown */}
        <div className="card-premium rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <Trophy size={16} className="text-amber-400" />
            Forage Breakdown
          </h3>
          <div className="space-y-3">
            {(["Learn", "Move", "Create", "Connect", "Earn"] as Category[]).map((cat) => {
              const count = categoryCounts[cat] || 0;
              const pct = totalSpins > 0 ? (count / totalSpins) * 100 : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      {CATEGORY_ICONS[cat]} {cat}
                    </span>
                    <span className="text-slate-400">{count} spins ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full bg-amber-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evolution timeline */}
        <div className="card-premium rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-white mb-4">Evolution Path</h3>
          <div className="relative">
            {/* Track */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-700" />

            <div className="space-y-3">
              {EVOLUTION_STEPS.map((step) => {
                const isDone = evo.level > step.level;
                const isCurrent = evo.level === step.level;
                return (
                  <div key={step.level} className="flex items-center gap-3 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 flex-shrink-0 ${
                      isCurrent
                        ? "bg-amber-500/20 border-2 border-amber-500"
                        : isDone
                        ? "bg-green-900/40 border border-green-700"
                        : "bg-slate-800 border border-slate-700"
                    }`}>
                      {step.emoji}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${isCurrent ? "text-amber-400" : isDone ? "text-green-400" : "text-slate-500"}`}>
                        {step.label}
                      </div>
                      {isCurrent && (
                        <div className="text-xs text-slate-500">Current level</div>
                      )}
                    </div>
                    {isCurrent && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="ml-auto w-2 h-2 rounded-full bg-amber-400"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent completed */}
        {completedTasks > 0 && (
          <div className="card-premium rounded-2xl p-4 mb-4">
            <h3 className="font-bold text-white mb-3">Recently Completed</h3>
            <div className="space-y-2">
              {spinHistory
                .filter((s) => s.completed)
                .slice(0, 5)
                .map((s) => (
                  <div key={s.id} className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-300 flex-1 truncate">{s.reward.title}</span>
                    <span className="text-amber-400 text-xs">+{s.reward.xp} XP</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
