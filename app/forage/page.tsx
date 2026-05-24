"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { SlotMachine } from "@/components/SlotMachine";
import { useStore } from "@/store/useStore";
import { formatNumber } from "@/lib/utils";
import { Suspense } from "react";

function ForageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasOnboarded, session, sessionTimerEnabled, sessionLimitMinutes, resetSession } = useStore();
  const sessionStartRef = useRef(Date.now());

  useEffect(() => {
    if (!hasOnboarded) {
      router.replace("/onboarding");
    }
  }, [hasOnboarded, router]);

  useEffect(() => {
    resetSession();
    sessionStartRef.current = Date.now();
  }, [resetSession]);

  // Session timer check
  const elapsedMs = Date.now() - session.sessionStart;
  const elapsedMin = Math.floor(elapsedMs / 60000);
  const limitReached = sessionTimerEnabled && elapsedMin >= sessionLimitMinutes;

  if (!hasOnboarded) return null;

  return (
    <div className="min-h-screen pb-28" style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      <div className="max-w-lg mx-auto pt-safe">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-black text-white flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              Forage
            </h1>
          </div>
          {sessionTimerEnabled && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock size={12} />
              <span>{elapsedMin}m</span>
            </div>
          )}
          <div className="text-xs text-amber-400 font-bold">
            {formatNumber(useStore.getState().totalXP)} XP
          </div>
        </div>

        {/* Session limit warning */}
        {limitReached && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 rounded-xl bg-orange-900/40 border border-orange-700 p-3 text-sm"
          >
            <div className="font-bold text-orange-400 mb-1">Session limit reached</div>
            <p className="text-slate-300 text-xs">
              You set a {sessionLimitMinutes}-minute limit. Take a break — real foragers rest too.
            </p>
            <div className="flex gap-2 mt-2">
              <Link href="/">
                <Button size="sm" variant="outline" className="text-xs">Take a break</Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-orange-400"
                onClick={() => useStore.setState((s) => ({ session: { ...s.session, sessionStart: Date.now() } }))}
              >
                Keep going
              </Button>
            </div>
          </motion.div>
        )}

        {/* Spin count motivation */}
        {session.spinCount > 0 && session.spinCount % 10 === 0 && (
          <motion.div
            key={session.spinCount}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mx-4 mb-4 rounded-xl bg-indigo-950/60 border border-indigo-800/50 p-3 text-center text-sm"
          >
            <div className="text-indigo-300 font-semibold mb-1">
              🧠 Jogan Fact #{Math.floor(session.spinCount / 10)}
            </div>
            <p className="text-xs text-slate-400">
              You just hit {session.spinCount} spins. Zentall's pigeons would be proud.
              <Link href="/jogan" className="text-indigo-400 ml-1 underline">Learn why.</Link>
            </p>
          </motion.div>
        )}

        <SlotMachine />
      </div>

      <Navigation />
    </div>
  );
}

export default function ForagePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <ForageContent />
    </Suspense>
  );
}
