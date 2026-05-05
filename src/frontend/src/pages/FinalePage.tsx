import {
  FloatingHearts,
  RibbonDecor,
  StarSparkle,
  TeddyCute,
} from "@/components/DecorElements";
import { PageWrapper } from "@/components/PageWrapper";
import { motion } from "motion/react";

export function FinalePage() {
  return (
    <PageWrapper>
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center">
        <motion.div
          className="w-44 h-44 mx-auto"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <TeddyCute size="" className="w-full h-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <StarSparkle />
            <RibbonDecor />
            <StarSparkle />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary leading-snug">
            Hope you enjoyed it,
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-accent mt-1">
            my love 💕
          </h2>
        </motion.div>

        <motion.p
          className="font-body text-base text-muted-foreground max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          Every little thing in this was made with all of my heart, just for
          you. Happy Birthday, baby 🎂✨
        </motion.p>

        {/* Decorative hearts row */}
        <motion.div
          className="flex gap-3 text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {["💕", "💗", "💖", "💓", "🩷"].map((h, i) => (
            <motion.span
              key={h}
              className="animate-[heart-float_3s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.3}s` }}
              aria-hidden="true"
            >
              {h}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
