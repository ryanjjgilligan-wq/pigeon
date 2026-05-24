"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Trophy, Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { CATEGORY_ICONS } from "@/lib/rewards";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  user: string;
  avatar: string;
  action: string;
  category: string;
  xp: number;
  tier: string;
  timeAgo: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const INITIAL_POSTS: Post[] = [
  { id: "1", user: "Maria K.", avatar: "👩", action: "Ran 3km before breakfast", category: "Move", xp: 85, tier: "Rare", timeAgo: "2m", likes: 24, comments: 3 },
  { id: "2", user: "Alex T.", avatar: "🧑", action: "Completed 25-min deep focus session", category: "Learn", xp: 45, tier: "Uncommon", timeAgo: "5m", likes: 11, comments: 1 },
  { id: "3", user: "Sam J.", avatar: "👨", action: "Published a short story!", category: "Create", xp: 280, tier: "Legendary", timeAgo: "12m", likes: 67, comments: 14 },
  { id: "4", user: "Priya L.", avatar: "👩‍🦱", action: "Called my dad for the first time in months", category: "Connect", xp: 300, tier: "Legendary", timeAgo: "18m", likes: 89, comments: 22 },
  { id: "5", user: "Josh R.", avatar: "🧔", action: "Sent a cold email pitch", category: "Earn", xp: 50, tier: "Uncommon", timeAgo: "24m", likes: 8, comments: 2 },
  { id: "6", user: "Lin W.", avatar: "👩‍💻", action: "Meditated for 10 minutes", category: "Move", xp: 38, tier: "Uncommon", timeAgo: "31m", likes: 15, comments: 0 },
  { id: "7", user: "Raj M.", avatar: "👨‍🎨", action: "Drew a portrait from memory", category: "Create", xp: 90, tier: "Rare", timeAgo: "45m", likes: 33, comments: 5 },
  { id: "8", user: "Emma S.", avatar: "👩‍🚀", action: "Got a reply from dream employer!", category: "Earn", xp: 500, tier: "Ultra-Rare", timeAgo: "1h", likes: 142, comments: 31 },
  { id: "9", user: "Carlos D.", avatar: "🧑‍🎤", action: "Read 30 pages of a philosophy book", category: "Learn", xp: 80, tier: "Rare", timeAgo: "1h", likes: 19, comments: 4 },
  { id: "10", user: "Yuki A.", avatar: "👩‍🔬", action: "Hosted a dinner party for 6 people", category: "Connect", xp: 85, tier: "Rare", timeAgo: "2h", likes: 52, comments: 11 },
];

const TIER_BADGE: Record<string, string> = {
  Common: "bg-slate-700 text-slate-300",
  Uncommon: "bg-blue-900/60 text-blue-400",
  Rare: "bg-purple-900/60 text-purple-400",
  Legendary: "bg-amber-900/60 text-amber-400",
  "Ultra-Rare": "bg-pink-900/60 text-pink-400",
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [filter, setFilter] = useState<string>("All");

  const filters = ["All", "Learn", "Move", "Create", "Connect", "Earn"];

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked }
          : p
      )
    );
  };

  const filtered = filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-28">
      <div className="max-w-lg mx-auto px-4 pt-safe">
        {/* Header */}
        <div className="pt-6 pb-4">
          <h1 className="text-2xl font-black text-white mb-1">Community</h1>
          <p className="text-sm text-slate-400">Real humans doing real things</p>
        </div>

        {/* Live counter */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <span className="text-green-400 font-medium">2,847 foragers active now</span>
        </div>

        {/* Top performers banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-2xl bg-gradient-to-r from-amber-900/40 to-orange-900/30 border border-amber-700/30 p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-amber-400" />
            <span className="text-sm font-bold text-amber-400">Today's Top Foragers</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {[
              { user: "Emma S.", xp: 1240, avatar: "👩‍🚀" },
              { user: "Priya L.", xp: 890, avatar: "👩‍🦱" },
              { user: "Sam J.", xp: 720, avatar: "👨" },
            ].map((u, i) => (
              <div key={u.user} className="flex flex-col items-center gap-1 min-w-[60px]">
                <div className="relative">
                  <span className="text-3xl">{u.avatar}</span>
                  <span className="absolute -top-1 -right-1 text-xs font-black text-amber-400">
                    {["🥇", "🥈", "🥉"][i]}
                  </span>
                </div>
                <span className="text-xs text-slate-300 font-medium">{u.user.split(" ")[0]}</span>
                <span className="text-xs text-amber-400 font-bold">{u.xp} XP</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all no-tap-highlight",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground"
              )}
            >
              {f !== "All" && <span>{CATEGORY_ICONS[f as keyof typeof CATEGORY_ICONS]}</span>}
              {f}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-premium rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{post.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-white text-sm">{post.user}</span>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", TIER_BADGE[post.tier] ?? "bg-slate-700 text-slate-300")}>
                      {post.tier}
                    </span>
                  </div>

                  <p className="text-slate-200 text-sm leading-snug mb-2">
                    {CATEGORY_ICONS[post.category as keyof typeof CATEGORY_ICONS]}{" "}
                    {post.action}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-amber-400 font-bold">+{post.xp} XP</span>
                    <span className="text-xs text-slate-500">{post.timeAgo} ago</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700/30">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={cn(
                    "flex items-center gap-1.5 text-sm transition-colors no-tap-highlight",
                    post.isLiked ? "text-red-400" : "text-slate-400 hover:text-red-400"
                  )}
                >
                  <motion.div whileTap={{ scale: 1.4 }}>
                    <Heart size={16} fill={post.isLiked ? "currentColor" : "none"} />
                  </motion.div>
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-slate-400 no-tap-highlight">
                  <MessageCircle size={16} />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-slate-400 ml-auto no-tap-highlight">
                  <Share2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <Button variant="outline" className="w-full mt-4 mb-4 text-sm" size="sm">
          Load more
        </Button>
      </div>

      <Navigation />
    </div>
  );
}
