"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category, Reward, RewardTier } from "@/lib/rewards";

export interface SpinRecord {
  id: string;
  timestamp: number;
  reward: Reward;
  completed: boolean;
  category: Category;
}

export interface UserProfile {
  name: string;
  zones: Category[];
  evolutionLevel: number; // 0-10 (cave person → modern human)
}

export interface SessionStats {
  spinCount: number;
  sessionStart: number;
  totalXpThisSession: number;
}

export interface AppState {
  // Onboarding
  hasOnboarded: boolean;
  setHasOnboarded: (v: boolean) => void;

  // Profile
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;

  // Stats
  totalXP: number;
  streak: number;
  lastActiveDate: string;
  spinHistory: SpinRecord[];
  totalSpins: number;
  completedTasks: number;

  // Settings
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  sessionTimerEnabled: boolean;
  setSessionTimerEnabled: (v: boolean) => void;
  sessionLimitMinutes: number;
  setSessionLimitMinutes: (v: number) => void;

  // Active session
  session: SessionStats;
  resetSession: () => void;

  // Actions
  recordSpin: (reward: Reward) => void;
  markCompleted: (id: string) => void;
  addXP: (amount: number) => void;
  checkAndUpdateStreak: () => void;
}

const evolutionLevels = [
  { level: 0, label: "Cave Person", threshold: 0 },
  { level: 1, label: "Early Forager", threshold: 100 },
  { level: 2, label: "Tribal Hunter", threshold: 300 },
  { level: 3, label: "Nomadic Wanderer", threshold: 600 },
  { level: 4, label: "Village Settler", threshold: 1000 },
  { level: 5, label: "Skilled Artisan", threshold: 1500 },
  { level: 6, label: "Scholar", threshold: 2200 },
  { level: 7, label: "Explorer", threshold: 3000 },
  { level: 8, label: "Innovator", threshold: 4000 },
  { level: 9, label: "Visionary", threshold: 5500 },
  { level: 10, label: "Modern Human", threshold: 7500 },
];

export function getEvolutionLabel(xp: number): { label: string; level: number; nextThreshold: number; progress: number } {
  let current = evolutionLevels[0];
  let next = evolutionLevels[1];

  for (let i = 0; i < evolutionLevels.length - 1; i++) {
    if (xp >= evolutionLevels[i].threshold) {
      current = evolutionLevels[i];
      next = evolutionLevels[i + 1] ?? evolutionLevels[evolutionLevels.length - 1];
    }
  }

  const progress = next.threshold > current.threshold
    ? Math.min(100, ((xp - current.threshold) / (next.threshold - current.threshold)) * 100)
    : 100;

  return { label: current.label, level: current.level, nextThreshold: next.threshold, progress };
}

const today = () => new Date().toISOString().split("T")[0];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasOnboarded: false,
      setHasOnboarded: (v) => set({ hasOnboarded: v }),

      profile: {
        name: "Forager",
        zones: ["Learn", "Move", "Create"],
        evolutionLevel: 0,
      },
      setProfile: (p) =>
        set((state) => ({ profile: { ...state.profile, ...p } })),

      totalXP: 0,
      streak: 0,
      lastActiveDate: "",
      spinHistory: [],
      totalSpins: 0,
      completedTasks: 0,

      soundEnabled: true,
      setSoundEnabled: (v) => set({ soundEnabled: v }),
      sessionTimerEnabled: false,
      setSessionTimerEnabled: (v) => set({ sessionTimerEnabled: v }),
      sessionLimitMinutes: 20,
      setSessionLimitMinutes: (v) => set({ sessionLimitMinutes: v }),

      session: {
        spinCount: 0,
        sessionStart: Date.now(),
        totalXpThisSession: 0,
      },
      resetSession: () =>
        set({
          session: {
            spinCount: 0,
            sessionStart: Date.now(),
            totalXpThisSession: 0,
          },
        }),

      recordSpin: (reward) => {
        const record: SpinRecord = {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
          reward,
          completed: false,
          category: reward.category,
        };

        set((state) => ({
          spinHistory: [record, ...state.spinHistory].slice(0, 500),
          totalSpins: state.totalSpins + 1,
          session: {
            ...state.session,
            spinCount: state.session.spinCount + 1,
          },
        }));

        get().checkAndUpdateStreak();
      },

      markCompleted: (id) => {
        set((state) => {
          const rec = state.spinHistory.find((r) => r.id === id);
          if (!rec || rec.completed) return state;
          return {
            spinHistory: state.spinHistory.map((r) =>
              r.id === id ? { ...r, completed: true } : r
            ),
            completedTasks: state.completedTasks + 1,
          };
        });

        const rec = get().spinHistory.find((r) => r.id === id);
        if (rec) get().addXP(rec.reward.xp);
      },

      addXP: (amount) => {
        set((state) => ({
          totalXP: state.totalXP + amount,
          session: {
            ...state.session,
            totalXpThisSession: state.session.totalXpThisSession + amount,
          },
        }));
      },

      checkAndUpdateStreak: () => {
        const { lastActiveDate, streak } = get();
        const todayStr = today();

        if (lastActiveDate === todayStr) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        const newStreak = lastActiveDate === yesterdayStr ? streak + 1 : 1;
        set({ streak: newStreak, lastActiveDate: todayStr });
      },
    }),
    {
      name: "forage-storage",
      partialize: (state) => ({
        hasOnboarded: state.hasOnboarded,
        profile: state.profile,
        totalXP: state.totalXP,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        spinHistory: state.spinHistory,
        totalSpins: state.totalSpins,
        completedTasks: state.completedTasks,
        soundEnabled: state.soundEnabled,
        sessionTimerEnabled: state.sessionTimerEnabled,
        sessionLimitMinutes: state.sessionLimitMinutes,
      }),
    }
  )
);
