import {
  FloatingHearts,
  TeddyAngry,
  TeddyCute,
} from "@/components/DecorElements";
import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState } from "react";

interface ReadyPageProps {
  onYes: () => void;
}

export function ReadyPage({ onYes }: ReadyPageProps) {
  const [showDare, setShowDare] = useState(false);

  if (showDare) {
    return (
      <PageWrapper>
        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center">
          <motion.div
            className="w-48 h-48 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TeddyAngry size="" className="w-full h-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display text-2xl font-extrabold text-destructive mb-2">
              How dare you, Bitchhh? 😡
            </h2>
            <p className="text-muted-foreground font-body">
              The teddy is NOT happy with you right now.
            </p>
            <p className="text-3xl mt-2">💢🗡️💢</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => setShowDare(false)}
              variant="outline"
              className="font-display border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              data-ocid="dare.try_again_button"
            >
              Okay okay, try again 🥺
            </Button>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-8 text-center">
        <motion.div
          className="w-40 h-40 mx-auto"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <TeddyCute size="" className="w-full h-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            Are you ready for
          </h2>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary mt-1">
            the surprise? 🎉
          </h2>
        </motion.div>

        <motion.div
          className="flex gap-4 w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onYes}
            size="lg"
            className="flex-1 font-display text-lg py-4 rounded-full shadow-warm"
            data-ocid="ready.yes_button"
          >
            Yes! 💗
          </Button>
          <Button
            onClick={() => setShowDare(true)}
            size="lg"
            variant="outline"
            className="flex-1 font-display text-lg py-4 rounded-full border-2 border-muted-foreground text-muted-foreground hover:border-destructive hover:text-destructive"
            data-ocid="ready.no_button"
          >
            No 🙁
          </Button>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
