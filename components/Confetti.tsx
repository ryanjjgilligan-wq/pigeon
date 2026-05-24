"use client";

import { useEffect, useRef } from "react";
import type { RewardTier } from "@/lib/rewards";

interface ConfettiProps {
  active: boolean;
  tier: RewardTier;
}

export function Confetti({ active, tier }: ConfettiProps) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    if (tier === "small" || tier === "medium") return;

    hasRun.current = true;

    import("canvas-confetti").then((confetti) => {
      const fire = confetti.default;

      if (tier === "ultra_rare") {
        // Full screen explosion
        const count = 300;
        const defaults = { origin: { y: 0.7 } };

        function fireConfetti(particleRatio: number, opts: Record<string, unknown>) {
          fire({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
        }

        fireConfetti(0.25, { spread: 26, startVelocity: 55, colors: ["#ff006e", "#bf00ff", "#00f5ff"] });
        fireConfetti(0.2, { spread: 60, colors: ["#fbbf24", "#f59e0b", "#fcd34d"] });
        fireConfetti(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fireConfetti(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fireConfetti(0.1, { spread: 120, startVelocity: 45 });
      } else if (tier === "legendary") {
        fire({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#fbbf24", "#f59e0b", "#fcd34d", "#ef4444"],
        });
      } else if (tier === "large") {
        fire({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#a78bfa", "#7c3aed", "#c4b5fd"],
        });
      }
    });

    return () => {
      hasRun.current = false;
    };
  }, [active, tier]);

  useEffect(() => {
    if (!active) hasRun.current = false;
  }, [active]);

  return null;
}
