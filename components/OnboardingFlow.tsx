"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { CATEGORIES, CATEGORY_ICONS, type Category } from "@/lib/rewards";
import { cn } from "@/lib/utils";

type Step = "intro" | "story" | "zones" | "ready";

const STORY_SLIDES = [
  {
    emoji: "🎰",
    title: "Vegas cracked the code",
    body: "In the 1970s, slot machines ran on mechanical reels. Wins were truly random. But in the 1980s, computers took over — and everything changed.",
  },
  {
    emoji: "🐦",
    title: "Even pigeons get hooked",
    body: "Psychologist Thomas Zentall gave pigeons a choice: peck for guaranteed food, or peck for random food. 97% of pigeons chose random. Your brain is the same.",
  },
  {
    emoji: "🧠",
    title: "Dopamine loves uncertainty",
    body: "Dopamine doesn't fire when you get a reward. It fires in anticipation of an uncertain reward. This is why you can't put down your phone — or leave a slot machine.",
  },
  {
    emoji: "🌿",
    title: "You're wired to forage",
    body: "For 200,000 years, humans survived by searching unpredictable environments for food. That ancient foraging instinct is exactly what Vegas exploits. Forage reclaims it.",
  },
  {
    emoji: "🚀",
    title: "The Forage difference",
    body: "Forage uses the exact same psychology as a slot machine — and tells you it's doing so. Variable rewards. Near-misses. Quick repeatability. But every spin leads to real-world action.",
  },
];

export function OnboardingFlow() {
  const router = useRouter();
  const { setHasOnboarded, setProfile } = useStore();
  const [step, setStep] = useState<Step>("intro");
  const [storyIndex, setStoryIndex] = useState(0);
  const [selectedZones, setSelectedZones] = useState<Category[]>([]);

  const handleNextStory = () => {
    if (storyIndex < STORY_SLIDES.length - 1) {
      setStoryIndex((i) => i + 1);
    } else {
      setStep("zones");
    }
  };

  const toggleZone = (zone: Category) => {
    setSelectedZones((prev) =>
      prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
    );
  };

  const handleFinish = () => {
    const zones = selectedZones.length >= 1 ? selectedZones : (["Learn", "Move", "Create"] as Category[]);
    setProfile({ zones });
    setHasOnboarded(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="text-center max-w-sm"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-8xl mb-6"
            >
              🎰
            </motion.div>
            <h1 className="text-4xl font-black text-white mb-3">
              Forage
            </h1>
            <p className="text-xl text-amber-400 font-semibold mb-2">
              The slot-machine brain hack…
            </p>
            <p className="text-xl text-slate-300 mb-8">
              but you win real life.
            </p>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              A 60-second story about how Vegas cracked your brain — and how you're going to take it back.
            </p>
            <Button
              variant="gold"
              size="xl"
              className="w-full"
              onClick={() => setStep("story")}
            >
              Let's go
              <ArrowRight size={20} />
            </Button>
          </motion.div>
        )}

        {step === "story" && (
          <motion.div
            key={`story-${storyIndex}`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            className="w-full max-w-sm"
          >
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {STORY_SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === storyIndex ? 24 : 8,
                    backgroundColor: i <= storyIndex ? "#f59e0b" : "#334155",
                  }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>

            <div className="card-premium rounded-3xl p-8 text-center mb-6">
              <motion.div
                key={`emoji-${storyIndex}`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-7xl mb-6"
              >
                {STORY_SLIDES[storyIndex].emoji}
              </motion.div>
              <h2 className="text-2xl font-black text-white mb-4">
                {STORY_SLIDES[storyIndex].title}
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                {STORY_SLIDES[storyIndex].body}
              </p>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full"
              onClick={handleNextStory}
            >
              {storyIndex < STORY_SLIDES.length - 1 ? (
                <>Next <ArrowRight size={18} /></>
              ) : (
                <>Choose your zones <ArrowRight size={18} /></>
              )}
            </Button>
          </motion.div>
        )}

        {step === "zones" && (
          <motion.div
            key="zones"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-black text-white mb-2">
                Your Forage Zones
              </h2>
              <p className="text-slate-400 text-sm">
                Choose at least 1 area where you want to level up
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {CATEGORIES.map((zone) => {
                const isSelected = selectedZones.includes(zone);
                return (
                  <motion.button
                    key={zone}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleZone(zone)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 no-tap-highlight",
                      isSelected
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-slate-700 bg-slate-800/40"
                    )}
                  >
                    <span className="text-3xl">{CATEGORY_ICONS[zone]}</span>
                    <div className="text-left flex-1">
                      <div className={cn(
                        "font-bold",
                        isSelected ? "text-amber-400" : "text-white"
                      )}>
                        {zone}
                      </div>
                      <div className="text-xs text-slate-400">
                        {
                          {
                            Learn: "Skills, knowledge, growth",
                            Move: "Exercise, movement, health",
                            Create: "Art, writing, making things",
                            Connect: "Relationships, community",
                            Earn: "Income, career, money",
                          }[zone]
                        }
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        scale: isSelected ? 1 : 0.8,
                        opacity: isSelected ? 1 : 0.3,
                      }}
                      className="w-6 h-6 rounded-full border-2 border-amber-500 flex items-center justify-center"
                    >
                      {isSelected && <Check size={14} className="text-amber-500" />}
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            <Button
              variant="gold"
              size="xl"
              className="w-full"
              onClick={handleFinish}
              disabled={selectedZones.length === 0}
            >
              Start Foraging
              <ArrowRight size={20} />
            </Button>
            {selectedZones.length === 0 && (
              <p className="text-center text-xs text-slate-500 mt-2">
                Select at least one zone to continue
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
