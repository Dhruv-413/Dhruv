"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileImageProps {
  avatarUrl?: string;
}

export function ProfileImage({ avatarUrl }: ProfileImageProps) {
  return (
    <motion.div
      className="relative mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      {/* Animated Border Effect */}
      <motion.div
        className="absolute -inset-4 bg-linear-to-r from-primary via-purple-500 to-accent rounded-full blur-2xl opacity-30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/20">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Dhruv Gupta"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-7xl font-bold text-primary">DG</span>
          </div>
        )}
      </div>

      {/* Floating Badge */}
      <motion.div
        className="absolute -bottom-4 -right-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <div className="bg-card border-2 border-primary px-4 py-2 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono font-semibold">
              Open to Work
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
