"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Download, Sparkles, AlertTriangle, BarChart3, Clock, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { useStore } from "@/store/useStore";
import { TIER_LABELS, TIER_PROBABILITIES, type RewardTier } from "@/lib/rewards";
import { cn } from "@/lib/utils";

const TIER_COLORS: Record<RewardTier, string> = {
  small: "bg-slate-600",
  medium: "bg-blue-600",
  large: "bg-purple-600",
  legendary: "bg-amber-500",
  ultra_rare: "bg-pink-500",
};

const TIER_VALUES: Record<RewardTier, number> = {
  small: 65,
  medium: 25,
  large: 8,
  legendary: 1.5,
  ultra_rare: 0.5,
};

export default function SettingsPage() {
  const {
    soundEnabled,
    setSoundEnabled,
    sessionTimerEnabled,
    setSessionTimerEnabled,
    sessionLimitMinutes,
    setSessionLimitMinutes,
    totalSpins,
    totalXP,
  } = useStore();

  const [showPWAHint, setShowPWAHint] = useState(false);

  const handleInstallPWA = () => {
    setShowPWAHint(true);
    // In a real PWA, we'd use the beforeinstallprompt event
    setTimeout(() => setShowPWAHint(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-28">
      <div className="max-w-lg mx-auto px-4 pt-safe">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 pb-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-xl font-black text-white">Settings</h1>
        </div>

        {/* TRANSPARENCY DASHBOARD */}
        <Section icon={<BarChart3 size={18} className="text-amber-400" />} title="Transparency Dashboard">
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Forage uses real slot machine psychology. Here are the exact odds — no tricks, no hidden numbers.
          </p>

          <div className="space-y-3">
            {(["small", "medium", "large", "legendary", "ultra_rare"] as RewardTier[]).map((tier) => (
              <div key={tier}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">{TIER_LABELS[tier]}</span>
                  <span className="text-slate-400">{TIER_PROBABILITIES[tier]}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${TIER_VALUES[tier]}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={cn("h-full rounded-full", TIER_COLORS[tier])}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-slate-800/40 border border-slate-700/40 p-3 text-xs text-slate-400 leading-relaxed">
            <strong className="text-amber-400">Why we show you this:</strong> Slot machines hide their odds because the house depends on your ignorance.
            Forage shows you exactly what you're getting into. The variable reward still works — transparency doesn't fully remove the pull — but now you're the driver, not the passenger.
          </div>
        </Section>

        {/* ADDICTION SAFEGUARDS */}
        <Section icon={<Shield size={18} className="text-green-400" />} title="Addiction Safeguards">
          <SettingRow
            label="Sound Effects"
            description="Reel spinning and win sounds"
            icon={<Volume2 size={16} className="text-slate-400" />}
          >
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </SettingRow>

          <Separator className="my-3" />

          <SettingRow
            label="Session Timer"
            description="Warn me when I've been spinning too long"
            icon={<Clock size={16} className="text-slate-400" />}
          >
            <Switch checked={sessionTimerEnabled} onCheckedChange={setSessionTimerEnabled} />
          </SettingRow>

          {sessionTimerEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3"
            >
              <div className="text-xs text-slate-400 mb-2">
                Session limit: <span className="text-white font-bold">{sessionLimitMinutes} minutes</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={sessionLimitMinutes}
                onChange={(e) => setSessionLimitMinutes(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>5m</span>
                <span>60m</span>
              </div>
            </motion.div>
          )}

          <div className="mt-3 rounded-xl bg-green-950/30 border border-green-800/30 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-green-400">The real safeguard:</strong> Forage's rewards are real-world actions. You can't spin yourself into a hole — every spin points outward.
              </p>
            </div>
          </div>
        </Section>

        {/* PWA INSTALL */}
        <Section icon={<Download size={18} className="text-blue-400" />} title="Install App">
          <p className="text-sm text-slate-300 mb-3">
            Install Forage on your home screen for instant access — no app store required.
          </p>

          <Button
            variant="glow"
            className="w-full mb-2"
            onClick={handleInstallPWA}
          >
            <Download size={18} />
            Add to Home Screen
          </Button>

          {showPWAHint && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-blue-950/50 border border-blue-800/50 p-3 text-xs text-slate-300"
            >
              <strong className="text-blue-400">On iOS:</strong> Tap Share → Add to Home Screen
              <br />
              <strong className="text-blue-400">On Android:</strong> Tap the menu (⋮) → Add to Home Screen
            </motion.div>
          )}
        </Section>

        {/* PREMIUM TEASER */}
        <Section icon={<Sparkles size={18} className="text-yellow-400" />} title="Forage Premium">
          <div className="rounded-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/20 border border-amber-700/30 p-4">
            <div className="text-lg font-black text-amber-400 mb-2">🔓 Unlock More</div>
            <div className="space-y-2 mb-4">
              {[
                "Unlimited category spins",
                "Custom reward difficulty",
                "Advanced analytics dashboard",
                "Priority community feed",
                "Weekly habit reports",
                "Team challenges",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-amber-400">✓</span>
                  {feature}
                </div>
              ))}
            </div>
            <Button variant="gold" className="w-full" disabled>
              Coming Soon — Join Waitlist
            </Button>
            <p className="text-center text-xs text-slate-500 mt-2">Stripe integration ready</p>
          </div>
        </Section>

        {/* About */}
        <Section icon={<Shield size={18} className="text-slate-400" />} title="About">
          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex justify-between">
              <span>Version</span>
              <span className="text-slate-300">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Total Spins</span>
              <span className="text-slate-300">{totalSpins.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total XP</span>
              <span className="text-amber-400 font-bold">{totalXP.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Data stored</span>
              <span className="text-slate-300">Locally (your device)</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-800/30 p-3 text-xs text-slate-500 leading-relaxed">
            Forage stores all data locally in your browser. We don't track you, sell your data, or have a server. The psychology is real; the privacy is too.
          </div>
        </Section>
      </div>

      <Navigation />
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 card-premium rounded-2xl p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function SettingRow({
  label,
  description,
  icon,
  children,
}: {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        {icon}
        <div>
          <div className="text-sm font-medium text-white">{label}</div>
          {description && <div className="text-xs text-slate-400">{description}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}
