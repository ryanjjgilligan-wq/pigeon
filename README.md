# Forage 🎰

> **The slot-machine brain hack… but you win real life.**

Forage is a Progressive Web App that uses the exact psychology of Las Vegas slot machines — variable rewards, near-misses, quick repeatability — to make real-world productive actions addictively fun.

## What It Is

Forage implements the **Scarcity Loop** from behavioral psychology:

1. **Opportunity** — Always one tap away
2. **Unpredictable Reward** — 5 tiers, true variable ratio schedule
3. **Quick Repeatability** — Sub-second resets, 15+ spins/min

Every spin gives you a real-world task (exercise, learning, creative work, connecting with people, earning money). Complete it → earn XP → evolve from Cave Person to Modern Human.

## Features

- 🎰 **Slot Machine** — 3-reel Framer Motion slot machine with category tabs (Learn / Move / Create / Connect / Earn)
- 🎯 **Reward Engine** — 65% small / 25% medium / 8% large / 1.5% legendary / 0.5% ultra-rare
- 🐦 **Jogan Mode** — Full psychology library: scarcity loop, Zentall's pigeon study, near-miss design, Big Tech exploitation
- 📈 **Evolution Bar** — Cave Person → Modern Human XP progression (11 levels)
- 🔥 **Streaks & XP** — Daily streak tracking, total XP, session stats
- 👥 **Community Feed** — Social feed with likes, tier badges, live counters
- 🛡️ **Transparency Dashboard** — Exact reward probabilities shown in settings
- ⏱️ **Addiction Safeguards** — Session timer, cooldown, sound toggles
- 📱 **PWA** — Installable, offline-capable, app-like
- 🌙 **Dark mode** — Designed for the dark

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui components
- **Framer Motion** for all animations
- **Zustand** + localStorage for state (no backend)
- **canvas-confetti** for win celebrations
- **next-pwa** for service worker

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Production deploy
vercel --prod
```

### Option B: GitHub + Vercel Dashboard

1. Push to GitHub (see commands below)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your GitHub repo
4. Click Deploy — zero config needed

## GitHub + Deploy Commands

```bash
# 1. Create GitHub repo (install gh CLI first: https://cli.github.com)
gh repo create forage --public --source=. --push

# OR manually:
git init
git add .
git commit -m "feat: initial Forage PWA"
git branch -M main

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/forage.git
git push -u origin main

# 2. Deploy to Vercel
npx vercel --prod
```

## Project Structure

```
forage/
├── app/
│   ├── layout.tsx          # Root layout + PWA metadata
│   ├── page.tsx            # Dashboard (/)
│   ├── forage/page.tsx     # Slot machine (/forage)
│   ├── jogan/page.tsx      # Psychology library (/jogan)
│   ├── profile/page.tsx    # Stats + evolution (/profile)
│   ├── community/page.tsx  # Social feed (/community)
│   ├── settings/page.tsx   # Settings (/settings)
│   └── onboarding/page.tsx # First-time flow (/onboarding)
├── components/
│   ├── SlotMachine.tsx     # Core reel component
│   ├── Navigation.tsx      # Bottom tab bar
│   ├── OnboardingFlow.tsx  # Onboarding wizard
│   ├── Confetti.tsx        # Win celebration
│   └── ui/                 # shadcn/ui primitives
├── store/
│   └── useStore.ts         # Zustand + localStorage state
├── lib/
│   ├── rewards.ts          # Reward engine + probabilities
│   ├── jogan-facts.ts      # Psychology content
│   └── utils.ts            # Helpers
└── public/
    ├── manifest.json       # PWA manifest
    └── icons/              # App icons
```

## Psychology Notes

Forage uses — and transparently explains — these mechanisms:

- **Variable ratio schedule** (Skinner, 1957): most persistent response rate of any reward schedule
- **Near-miss effect** (Griffiths & Trenta, 2012): reels programmed to land near-misses 3x more often than chance
- **Losses disguised as wins**: celebration sounds on "partial wins"
- **Dopamine anticipation** (Schultz): dopamine fires on uncertainty, not reward
- **Zentall's pigeon study** (2016): 97% of pigeons chose variable rewards over fixed
- **Evolutionary foraging instinct**: 200,000 years of unpredictable-environment searching

The key differentiator: **total transparency**. The settings screen shows exact probabilities. Every "Jogan Mode" fact explains exactly what the app is doing to your brain. You're the driver, not the passenger.

## Premium (Stripe Placeholder)

The Settings page includes a "Forage Premium" section ready for Stripe integration. To activate:

1. Set up a Stripe account
2. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`
3. Implement `/api/create-checkout-session` route
4. Wire up the "Join Waitlist" button

## License

MIT
