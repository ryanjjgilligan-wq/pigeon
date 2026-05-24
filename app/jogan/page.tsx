"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { JOGAN_FACTS, type JoganFact } from "@/lib/jogan-facts";
import { cn } from "@/lib/utils";

export default function JoganPage() {
  const [expanded, setExpanded] = useState<string | null>(JOGAN_FACTS[0].id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 pb-28">
      <div className="max-w-lg mx-auto px-4 pt-safe">
        {/* Header */}
        <div className="pt-6 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center">
              <BookOpen size={20} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Jogan Mode</h1>
              <p className="text-xs text-indigo-400">The psychology behind the slot machine</p>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            Joe Rogan, Michael Easter, and behavioral scientists unpack the scarcity loop —
            and why 97% of pigeons (and humans) choose unpredictable rewards.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: "97%", label: "Pigeons choose random", emoji: "🐦" },
            { val: "3s", label: "Avg slot machine cycle", emoji: "⏱️" },
            { val: "200K", label: "Years of foraging DNA", emoji: "🧬" },
          ].map((stat) => (
            <div key={stat.label} className="card-premium rounded-2xl p-3 text-center">
              <div className="text-xl mb-0.5">{stat.emoji}</div>
              <div className="text-lg font-black text-amber-400">{stat.val}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* The Scarcity Loop explainer */}
        <div className="mb-6 rounded-3xl bg-gradient-to-b from-indigo-900/40 to-purple-900/20 border border-indigo-800/30 p-5">
          <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
            🎰 The Scarcity Loop
          </h2>
          <div className="space-y-3">
            {[
              { n: "1", title: "Opportunity", desc: "A slot machine is always available. Your phone is always in your pocket. Forage is always one tap away.", color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
              { n: "2", title: "Unpredictable Reward", desc: "You don't know what you'll get. That uncertainty creates more dopamine anticipation than any guaranteed reward.", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
              { n: "3", title: "Quick Repeatability", desc: "3 seconds per spin. 20 spins per minute. The faster the loop, the less your rational brain can intervene.", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
            ].map((step) => (
              <div key={step.n} className={cn("flex gap-3 p-3 rounded-xl border", step.color)}>
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5 border", step.color)}>
                  {step.n}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{step.title}</div>
                  <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fact library */}
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
          Deep Dives
        </h2>
        <div className="space-y-2 pb-4">
          {JOGAN_FACTS.map((fact) => (
            <FactCard
              key={fact.id}
              fact={fact}
              isExpanded={expanded === fact.id}
              onToggle={() => setExpanded(expanded === fact.id ? null : fact.id)}
            />
          ))}
        </div>

        {/* Sources */}
        <div className="mt-4 mb-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 p-4">
          <h3 className="text-sm font-bold text-slate-300 mb-3">Sources & Further Reading</h3>
          <div className="space-y-2 text-xs text-slate-400">
            {[
              { title: "Scarcity Brain — Michael Easter", sub: "The book that inspired Forage" },
              { title: "Addiction by Design — Natasha Dow Schüll", sub: "The definitive account of slot machine design" },
              { title: "Zentall et al. (2016)", sub: "The pigeon variable reward study" },
              { title: "The Social Dilemma (2020)", sub: "Netflix documentary on Big Tech variable rewards" },
            ].map((src) => (
              <div key={src.title} className="flex items-start gap-2">
                <ExternalLink size={12} className="mt-0.5 flex-shrink-0 text-slate-500" />
                <div>
                  <div className="text-slate-300 font-medium">{src.title}</div>
                  <div className="text-slate-500">{src.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

function FactCard({
  fact,
  isExpanded,
  onToggle,
}: {
  fact: JoganFact;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className={cn(
        "rounded-2xl border transition-all duration-200 overflow-hidden",
        isExpanded
          ? "border-indigo-600/50 bg-indigo-950/40"
          : "border-slate-700/40 bg-slate-800/20"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left no-tap-highlight"
      >
        <span className="text-2xl flex-shrink-0">{fact.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-sm">{fact.title}</div>
          {fact.source && (
            <div className="text-xs text-slate-500 mt-0.5">{fact.source}</div>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-sm text-slate-300 leading-relaxed border-t border-indigo-800/30 pt-3">
              {fact.body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
