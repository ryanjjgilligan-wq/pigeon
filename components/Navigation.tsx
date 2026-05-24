"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Zap, BookOpen, User, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/forage", icon: Zap, label: "Forage" },
  { href: "/jogan", icon: BookOpen, label: "Jogan" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function Navigation() {
  const pathname = usePathname();

  if (pathname === "/onboarding") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-auto max-w-lg">
        <div className="mx-2 mb-2 slot-glass rounded-2xl px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="no-tap-highlight flex flex-col items-center gap-0.5 px-3 py-1.5 relative"
                >
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 -m-1.5 rounded-xl bg-primary/20"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                      />
                    )}
                    <Icon
                      size={20}
                      className={cn(
                        "relative z-10 transition-colors duration-200",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  </motion.div>
                  <span
                    className={cn(
                      "text-[10px] font-medium transition-colors duration-200",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
