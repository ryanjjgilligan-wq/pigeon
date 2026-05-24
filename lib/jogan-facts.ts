export interface JoganFact {
  id: string;
  title: string;
  body: string;
  source?: string;
  emoji: string;
}

export const JOGAN_FACTS: JoganFact[] = [
  {
    id: "scarcity-loop",
    title: "The Scarcity Loop",
    body: "Every slot machine, social feed, and dating app uses the same 3-part formula: Opportunity → Unpredictable Reward → Quick Repeatability. This is the scarcity loop. It's the most powerful behavioral engine humans have ever built — and now you're using it for yourself.",
    source: "Scarcity Brain, Michael Easter",
    emoji: "🎰",
  },
  {
    id: "zentall-pigeons",
    title: "The Pigeon Study",
    body: "Psychologist Thomas Zentall gave pigeons a choice: peck a key and always get 3 pellets, or peck another key and randomly get 1 OR 10 pellets. 97% chose the random option. The expected value was identical. Pigeons — and humans — are hardwired to prefer unpredictable rewards.",
    source: "Zentall et al., 2016",
    emoji: "🐦",
  },
  {
    id: "near-miss",
    title: "Near-Misses Are Designed",
    body: "Slot machines are legally required to stop symbols at random... but they aren't random. They are programmed to land near-misses — two matching symbols with the third just above the win line — 3x more often than pure chance. You didn't almost win. You lost. But your brain fired like you almost won.",
    source: "Griffiths & Trenta, 2012",
    emoji: "🎯",
  },
  {
    id: "losses-disguised",
    title: "Losses Disguised as Wins",
    body: "On a 30-line slot machine betting $0.50, you might land a 'win' of $0.15 — complete with lights and sounds — even though you lost $0.35. These 'Losses Disguised as Wins' trigger genuine reward responses in your brain. The machine celebrates your loss.",
    source: "Dixon et al., 2010",
    emoji: "🎭",
  },
  {
    id: "dopamine-uncertainty",
    title: "Dopamine Loves Uncertainty",
    body: "Dopamine doesn't fire when you get a reward. It fires when you anticipate an uncertain reward. A 50% chance of reward produces MORE dopamine than a 100% guarantee. This is why your phone notifications feel compelling even when they're usually boring.",
    source: "Schultz et al., Neuroscience",
    emoji: "🧠",
  },
  {
    id: "evolutionary-foraging",
    title: "You Are a Foraging Machine",
    body: "For 200,000 years, humans survived by foraging: searching unpredictable environments for food, water, and mates. The brain regions that drove this — dopamine circuits, the nucleus accumbens — are identical to what fires when you scroll Instagram or pull a slot lever. You're not weak. You're ancient.",
    source: "Easter, Scarcity Brain",
    emoji: "🌿",
  },
  {
    id: "big-tech",
    title: "Silicon Valley Knows",
    body: "Early social media engineers have openly admitted they built variable reward schedules into news feeds. 'We knew what we were doing,' one former Facebook product manager said. 'The unpredictability keeps you coming back.' The infinite scroll has no end for a reason.",
    source: "The Social Dilemma, 2020",
    emoji: "📱",
  },
  {
    id: "rge-schedule",
    title: "Variable Ratio Schedule",
    body: "B.F. Skinner discovered that variable ratio reinforcement — reward after an unpredictable number of actions — produces the highest and most persistent response rates of any reward schedule. It also produces the most resistance to extinction. You keep going even after many losses. This is not an accident.",
    source: "Skinner, 1957",
    emoji: "🔬",
  },
  {
    id: "session-length",
    title: "The 3-Second Rule",
    body: "Modern slot machines are engineered for 3 seconds per spin. At 20 spins per minute, a player can make 1,200 decisions per hour. The speed isn't incidental — it's the product. The faster the loop, the less your prefrontal cortex (rational decision-making) can intervene.",
    source: "Schüll, Addiction by Design",
    emoji: "⏱️",
  },
  {
    id: "forage-difference",
    title: "Why Forage Is Different",
    body: "Forage uses the exact same psychological mechanics as a slot machine — and tells you that it's doing so. Transparency doesn't fully remove the compulsive pull, but it shifts you from passenger to driver. You chose to use this loop. That agency is the difference between addiction and flow.",
    emoji: "🌟",
  },
  {
    id: "casino-design",
    title: "No Clocks, No Windows",
    body: "Las Vegas casinos were architecturally designed to remove all environmental time cues. No clocks. No windows. Oxygen-enriched air. The goal: make you lose track of time and keep playing. Your phone is the same casino. Forage gives you a session timer — your window and clock.",
    source: "Schüll, Addiction by Design",
    emoji: "🏛️",
  },
  {
    id: "streaks",
    title: "The Streak Mechanism",
    body: "Duolingo's streak system was so effective at driving daily engagement that even after missing a day, users would pay $0.99 to maintain their streak. You're not paying for learning. You're paying to protect a number. Forage uses streaks for real-world actions, not digital consumption.",
    emoji: "🔥",
  },
  {
    id: "random-forest",
    title: "The Forager's Paradox",
    body: "Studies of hunter-gatherer societies show they spent only 3–5 hours per day 'working' to meet all basic needs. The modern human spends 8+ hours. We traded unpredictable high-reward foraging for predictable low-reward labor — and our dopamine systems never adapted.",
    source: "Sahlins, Stone Age Economics",
    emoji: "🌍",
  },
  {
    id: "xp-psychology",
    title: "Points Are a Drug",
    body: "When games give you points, your brain treats them like real resources. fMRI studies show reward centers activate identically for digital points and real money — when the points feel meaningful. Forage's XP is designed to feel earned because it IS earned: by doing real things.",
    source: "Przybylski et al., 2010",
    emoji: "⭐",
  },
];

export const JOGAN_DAILY_TIPS = [
  "Your brain craves the hunt more than the reward. Forage is the hunt.",
  "Near-misses aren't bad luck — they're engineered. But yours lead somewhere real.",
  "The pigeon chose random. You're the pigeon. Lean into it, but aim it.",
  "There's no shame in being wired for unpredictability. It kept your ancestors alive.",
  "Every spin is your prefrontal cortex asking 'what's next?' — answer it with action.",
  "The casinos took your foraging instinct and monetized it. Take it back.",
  "Small wins beat no wins. 65% of spins are a win. Real life rarely promises that.",
  "You're not procrastinating. You're foraging for the wrong thing. Redirect.",
  "The variable reward schedule is older than civilization. You can't fight it. Ride it.",
  "Completion is overrated. Initiation is the skill. Spin and start.",
];
