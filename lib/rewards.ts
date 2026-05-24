export type RewardTier = "small" | "medium" | "large" | "legendary" | "ultra_rare";
export type Category = "Learn" | "Move" | "Create" | "Connect" | "Earn";

export interface Reward {
  tier: RewardTier;
  title: string;
  description: string;
  xp: number;
  emoji: string;
  category: Category;
  reelSymbols: [string, string, string];
}

// Exact probabilities from spec
const TIER_WEIGHTS: Record<RewardTier, number> = {
  small: 0.65,
  medium: 0.25,
  large: 0.08,
  legendary: 0.015,
  ultra_rare: 0.005,
};

const REEL_SYMBOLS = {
  Learn: ["📚", "🧠", "💡", "🎓", "🔬", "📖", "🗺️"],
  Move: ["🏃", "💪", "🧘", "🚴", "🏋️", "⚡", "🌿"],
  Create: ["🎨", "✏️", "🎭", "🎵", "🖌️", "💫", "🌟"],
  Connect: ["🤝", "💬", "❤️", "🌍", "👥", "🫂", "✨"],
  Earn: ["💰", "💎", "🚀", "📈", "🏆", "🎯", "⭐"],
};

const TASKS: Record<Category, Record<RewardTier, Omit<Reward, "tier" | "reelSymbols" | "category">[]>> = {
  Learn: {
    small: [
      { title: "Read one paragraph", description: "Open any book and read exactly one paragraph. That's it.", xp: 10, emoji: "📖" },
      { title: "Learn one word", description: "Look up one word you don't know and use it once today.", xp: 10, emoji: "🔤" },
      { title: "Watch 2-min explainer", description: "Find a 2-minute YouTube explainer on any topic you're curious about.", xp: 12, emoji: "▶️" },
      { title: "Name 3 capitals", description: "Test yourself — can you name 3 country capitals?", xp: 8, emoji: "🌍" },
    ],
    medium: [
      { title: "15-min deep dive", description: "Pick one topic. Spend 15 focused minutes learning about it.", xp: 35, emoji: "🧠" },
      { title: "Teach it back", description: "Explain something you learned this week to an imaginary student.", xp: 40, emoji: "🎓" },
      { title: "Pomodoro session", description: "Do one full 25-min focused study session on your current goal.", xp: 45, emoji: "⏱️" },
    ],
    large: [
      { title: "Complete a lesson", description: "Finish one full lesson on any learning platform (Duolingo, Khan Academy, etc.).", xp: 80, emoji: "🏅" },
      { title: "Summarize a chapter", description: "Read and summarize a full chapter in your own words.", xp: 90, emoji: "📝" },
    ],
    legendary: [
      { title: "LEGENDARY: 1-Hour Master Class", description: "Commit to one hour of uninterrupted, deep learning on your chosen skill.", xp: 250, emoji: "⚡" },
    ],
    ultra_rare: [
      { title: "ULTRA-RARE: Teach Someone IRL", description: "Teach a real human being something you know. Share your knowledge.", xp: 500, emoji: "🌟" },
    ],
  },
  Move: {
    small: [
      { title: "10 jumping jacks", description: "Right now. 10 jumping jacks. Go.", xp: 10, emoji: "⚡" },
      { title: "Walk to the door", description: "Stand up, walk to the nearest door, walk back. Activate your body.", xp: 8, emoji: "🚶" },
      { title: "5 deep breaths", description: "Stop everything. 5 slow deep breaths. Expand your lungs fully.", xp: 8, emoji: "💨" },
      { title: "Neck rolls", description: "30 seconds of gentle neck rolls each direction.", xp: 10, emoji: "🌀" },
    ],
    medium: [
      { title: "10-min walk", description: "Put on shoes and walk outside for 10 minutes. No phone, just walk.", xp: 35, emoji: "🌿" },
      { title: "20 push-ups", description: "Drop and give me 20. Or whatever you can manage. Do it.", xp: 40, emoji: "💪" },
      { title: "5-min stretch routine", description: "5 full minutes of full-body stretching. Every major muscle group.", xp: 38, emoji: "🧘" },
    ],
    large: [
      { title: "30-min workout", description: "30 solid minutes of intentional physical movement. You choose the modality.", xp: 85, emoji: "🏋️" },
      { title: "Run 1km", description: "Lace up and run at least one kilometer.", xp: 80, emoji: "🏃" },
    ],
    legendary: [
      { title: "LEGENDARY: 1-Hour Active Flow", description: "One full hour of physical activity. Whatever you love — just move.", xp: 260, emoji: "🔥" },
    ],
    ultra_rare: [
      { title: "ULTRA-RARE: Sign Up for a Race", description: "Register for any physical event — 5K, obstacle course, cycling race. Commit.", xp: 500, emoji: "🏆" },
    ],
  },
  Create: {
    small: [
      { title: "Doodle for 2 minutes", description: "Grab any pen and paper. Doodle for 2 uninterrupted minutes.", xp: 10, emoji: "✏️" },
      { title: "Write one sentence", description: "Write one perfect, beautiful sentence about anything.", xp: 10, emoji: "📝" },
      { title: "Hum a melody", description: "Invent a 10-second melody. Hum it three times.", xp: 8, emoji: "🎵" },
    ],
    medium: [
      { title: "Write 150 words", description: "Stream-of-consciousness writing. 150 words, no editing, no stopping.", xp: 40, emoji: "✍️" },
      { title: "Photograph 3 things", description: "Find 3 beautiful things near you and photograph them with intention.", xp: 35, emoji: "📸" },
      { title: "Remix a song title", description: "Take a famous song title and rewrite it as a life lesson.", xp: 35, emoji: "🎭" },
    ],
    large: [
      { title: "Create a complete piece", description: "Finish something: a poem, a sketch, a short voice note, a recipe.", xp: 85, emoji: "🎨" },
      { title: "Record a 1-min video", description: "Record yourself talking about something you care about. Don't edit it.", xp: 90, emoji: "🎬" },
    ],
    legendary: [
      { title: "LEGENDARY: Publish Something", description: "Put something you made into the world — post, publish, or share it.", xp: 280, emoji: "🌍" },
    ],
    ultra_rare: [
      { title: "ULTRA-RARE: Start Your Project", description: "Begin the creative project you've been putting off. Take the first real step.", xp: 500, emoji: "💫" },
    ],
  },
  Connect: {
    small: [
      { title: "Text someone you miss", description: "Text one person you haven't spoken to in a while. Just say hey.", xp: 10, emoji: "💬" },
      { title: "Compliment a stranger", description: "Give a genuine compliment to the next person you interact with.", xp: 12, emoji: "😊" },
      { title: "Reply to an old message", description: "Find an unanswered message and reply with genuine thoughtfulness.", xp: 10, emoji: "📱" },
    ],
    medium: [
      { title: "Call someone for 10 min", description: "Call (not text) one person and have a real conversation for at least 10 minutes.", xp: 45, emoji: "📞" },
      { title: "Send a voice message", description: "Record and send a heartfelt voice note to someone you appreciate.", xp: 40, emoji: "🎤" },
      { title: "Write a thank-you note", description: "Write a genuine 3-sentence thank-you to someone who has helped you.", xp: 38, emoji: "💌" },
    ],
    large: [
      { title: "Meet up with someone", description: "Arrange and commit to meeting a friend, family member, or colleague IRL.", xp: 90, emoji: "🤝" },
      { title: "Host a micro-event", description: "Invite 2+ people over for coffee, a meal, or a game — this week.", xp: 85, emoji: "🏠" },
    ],
    legendary: [
      { title: "LEGENDARY: Mend a Relationship", description: "Reach out to someone you've drifted from or had friction with. Take one step.", xp: 300, emoji: "❤️" },
    ],
    ultra_rare: [
      { title: "ULTRA-RARE: Join a Community", description: "Join one club, group, class, or community organization you've been avoiding.", xp: 500, emoji: "🌍" },
    ],
  },
  Earn: {
    small: [
      { title: "Check your finances", description: "Open your banking app. Look at your numbers without judgment for 2 minutes.", xp: 10, emoji: "💰" },
      { title: "Write one money goal", description: "Write down one specific financial goal with a real number and date.", xp: 12, emoji: "📊" },
      { title: "Cancel one subscription", description: "Audit your subscriptions. Cancel one you haven't used in 30 days.", xp: 15, emoji: "✂️" },
    ],
    medium: [
      { title: "Research one income stream", description: "Spend 20 minutes researching one way you could earn extra money.", xp: 40, emoji: "🔍" },
      { title: "Update your resume", description: "Add or improve one thing on your resume or LinkedIn profile.", xp: 45, emoji: "📄" },
      { title: "Pitch one idea", description: "Send one email or message pitching yourself, your service, or an idea.", xp: 50, emoji: "📧" },
    ],
    large: [
      { title: "Create a side-hustle asset", description: "Build one piece of your side hustle: a draft, a prototype, a plan, a post.", xp: 90, emoji: "🚀" },
      { title: "Apply to one opportunity", description: "Apply to one job, grant, gig, or opportunity that genuinely excites you.", xp: 85, emoji: "📈" },
    ],
    legendary: [
      { title: "LEGENDARY: Make Your First Sale", description: "Sell something, offer a service, or ship a product. Get your first dollar.", xp: 300, emoji: "💎" },
    ],
    ultra_rare: [
      { title: "ULTRA-RARE: Launch It", description: "Launch the thing. Put your offer, product, or service live in the world today.", xp: 500, emoji: "🏆" },
    ],
  },
};

function pickTier(): RewardTier {
  const roll = Math.random();
  let cumulative = 0;
  for (const [tier, weight] of Object.entries(TIER_WEIGHTS)) {
    cumulative += weight;
    if (roll < cumulative) return tier as RewardTier;
  }
  return "small";
}

function pickSymbols(category: Category, tier: RewardTier): [string, string, string] {
  const symbols = REEL_SYMBOLS[category];
  const isWin = tier !== "small";

  if (tier === "legendary" || tier === "ultra_rare") {
    const s = symbols[Math.floor(Math.random() * symbols.length)];
    return [s, s, s];
  }

  if (tier === "large") {
    const s = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    return [s, s, s2]; // Two matching (near-complete)
  }

  if (tier === "medium") {
    const s = symbols[Math.floor(Math.random() * symbols.length)];
    return [s, s, symbols[Math.floor(Math.random() * symbols.length)]];
  }

  // Small wins and near-misses
  if (chance(0.3)) {
    // Near-miss: two matching, third different
    const s = symbols[Math.floor(Math.random() * symbols.length)];
    let s2 = symbols[Math.floor(Math.random() * symbols.length)];
    while (s2 === s) s2 = symbols[Math.floor(Math.random() * symbols.length)];
    return [s, s, s2];
  }

  return [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];
}

function chance(p: number): boolean {
  return Math.random() < p;
}

export function spinReels(category: Category): Reward {
  const tier = pickTier();
  const pool = TASKS[category][tier];
  const task = pool[Math.floor(Math.random() * pool.length)];
  const reelSymbols = pickSymbols(category, tier);

  return {
    ...task,
    tier,
    category,
    reelSymbols,
  };
}

export const TIER_COLORS: Record<RewardTier, string> = {
  small: "text-slate-300",
  medium: "text-blue-400",
  large: "text-purple-400",
  legendary: "text-gold-400",
  ultra_rare: "text-neon-pink",
};

export const TIER_BG: Record<RewardTier, string> = {
  small: "bg-slate-800/60",
  medium: "bg-blue-950/60",
  large: "bg-purple-950/60",
  legendary: "bg-amber-950/60",
  ultra_rare: "bg-pink-950/60",
};

export const TIER_LABELS: Record<RewardTier, string> = {
  small: "Common",
  medium: "Uncommon",
  large: "Rare",
  legendary: "Legendary",
  ultra_rare: "Ultra-Rare",
};

export const TIER_PROBABILITIES: Record<RewardTier, string> = {
  small: "65%",
  medium: "25%",
  large: "8%",
  legendary: "1.5%",
  ultra_rare: "0.5%",
};

export const CATEGORIES: Category[] = ["Learn", "Move", "Create", "Connect", "Earn"];

export const CATEGORY_ICONS: Record<Category, string> = {
  Learn: "📚",
  Move: "⚡",
  Create: "🎨",
  Connect: "🤝",
  Earn: "💰",
};
