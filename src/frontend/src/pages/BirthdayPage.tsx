import { FloatingHearts, StarSparkle } from "@/components/DecorElements";
import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import type { BirthdayData } from "../types";

interface BirthdayPageProps {
  data: BirthdayData;
  boyfriendName: string;
  onNext: () => void;
}

export function BirthdayPage({
  data,
  boyfriendName,
  onNext,
}: BirthdayPageProps) {
  const photoSrc =
    data.birthdayPhotoKey || "/assets/generated/birthday-photo.dim_500x600.png";

  return (
    <PageWrapper>
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center">
        {/* Happy Birthday Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <StarSparkle />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary leading-tight">
              Happy Birthday,
            </h1>
            <StarSparkle />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-accent mt-1">
            {boyfriendName || "My Love"}
          </h2>
          <p className="text-4xl mt-2">🎂🎉💕</p>
        </motion.div>

        {/* Birthday photo */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="rounded-3xl overflow-hidden border-4 border-primary/30 shadow-warm mx-auto max-w-xs">
            <img
              src={photoSrc}
              alt={`${boyfriendName} birthday portrait`}
              className="w-full h-72 object-cover"
              data-ocid="birthday.photo"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
          </div>
          {/* Sparkles around photo */}
          <span
            className="absolute -top-3 -left-3 text-2xl animate-[heart-float_2s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            ✨
          </span>
          <span
            className="absolute -bottom-3 -right-3 text-2xl animate-[heart-float_2.5s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            💖
          </span>
        </motion.div>

        {/* Love message */}
        <motion.div
          className="bg-card border border-primary/20 rounded-2xl p-5 shadow-warm w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <p className="font-body text-base text-foreground leading-relaxed italic whitespace-pre-line">
            {data.loveMessage ||
              "Wishing you the most beautiful birthday ever, my love. Today is all about you! 🌹"}
          </p>
        </motion.div>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="font-display text-base px-8 py-3 rounded-full shadow-warm"
            data-ocid="birthday.next_button"
          >
            Continue 💗
          </Button>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
