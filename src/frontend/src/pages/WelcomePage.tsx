import {
  FloatingHearts,
  RibbonDecor,
  TeddyCute,
} from "@/components/DecorElements";
import { PageWrapper } from "@/components/PageWrapper";
import { Delete } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useVerifyPasscode } from "../hooks/useBackend";
import type { BirthdayData } from "../types";

interface WelcomePageProps {
  boyfriendName: string;
  couplePhotoKey: string;
  onVerified: (data: BirthdayData) => void;
}

export function WelcomePage({
  boyfriendName,
  couplePhotoKey,
  onVerified,
}: WelcomePageProps) {
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const verify = useVerifyPasscode();
  const PASSCODE_LENGTH = 4;

  const photoSrc =
    couplePhotoKey || "/assets/generated/couple-photo.dim_600x500.png";

  async function handleSubmit(code: string) {
    setError("");
    const result = await verify.mutateAsync(code);
    if (result) {
      onVerified(result);
    } else {
      setError("Hmm, that's not right! Try again 🥺");
      setShake(true);
      setTimeout(() => {
        setDigits([]);
        setShake(false);
      }, 600);
    }
  }

  function pressDigit(d: string) {
    if (digits.length >= PASSCODE_LENGTH || verify.isPending) return;
    const next = [...digits, d];
    setDigits(next);
    setError("");
    if (next.length === PASSCODE_LENGTH) {
      handleSubmit(next.join(""));
    }
  }

  function pressBackspace() {
    setDigits((prev) => prev.slice(0, -1));
    setError("");
  }

  function pressClear() {
    setDigits([]);
    setError("");
  }

  const keyRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["clear", "0", "back"],
  ];

  return (
    <PageWrapper>
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-6">
        {/* Header greeting */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <RibbonDecor />
            <h1 className="font-display text-4xl font-bold text-primary">
              Hello, {boyfriendName || "My Love"}
            </h1>
            <RibbonDecor />
          </div>
          <p className="text-muted-foreground font-body text-sm">
            Something special is waiting for you ✨
          </p>
        </motion.div>

        {/* Couple photo with ribbon */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="relative rounded-2xl overflow-hidden border-4 border-primary/20 shadow-warm">
            <img
              src={photoSrc}
              alt="Us together"
              className="w-full h-64 object-cover"
              data-ocid="welcome.couple_photo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </div>
          {/* Ribbon on top */}
          <motion.div
            className="absolute -top-5 left-1/2 -translate-x-1/2 text-5xl"
            animate={{ y: [0, -4, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            aria-hidden="true"
          >
            🎀
          </motion.div>
          {/* Teddy at bottom right */}
          <div className="absolute -bottom-8 -right-4 w-20 h-20">
            <TeddyCute size="" className="w-20 h-20" />
          </div>
        </motion.div>

        {/* PIN pad card */}
        <motion.div
          className="w-full bg-card border border-border rounded-2xl p-5 shadow-warm mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-display text-base font-semibold text-foreground text-center mb-4">
            🔒 Enter your secret passcode
          </p>

          {/* Dot indicators */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-5"
            animate={shake ? { x: [-6, 6, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
            data-ocid="welcome.passcode_dots"
          >
            {Array.from({ length: PASSCODE_LENGTH }).map((_, i) => (
              <motion.div
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length PIN dots, order never changes
                key={`dot-${i}`}
                className={[
                  "w-4 h-4 rounded-full border-2 transition-all duration-200",
                  i < digits.length
                    ? "bg-primary border-primary shadow-[0_0_8px_oklch(var(--primary)/0.5)]"
                    : "bg-transparent border-primary/40",
                ].join(" ")}
                animate={
                  i < digits.length ? { scale: [1, 1.3, 1] } : { scale: 1 }
                }
                transition={{ duration: 0.2 }}
              />
            ))}
          </motion.div>

          {/* Error message */}
          {error && (
            <p
              className="text-destructive text-sm text-center mb-3 font-body"
              data-ocid="welcome.passcode_error"
            >
              {error}
            </p>
          )}

          {/* Loading indicator */}
          {verify.isPending && (
            <p
              className="text-muted-foreground text-sm text-center mb-3 font-body"
              data-ocid="welcome.loading_state"
            >
              Checking... 💗
            </p>
          )}

          {/* Number pad */}
          <div className="grid grid-cols-3 gap-3" data-ocid="welcome.numpad">
            {keyRows.map((row) =>
              row.map((key) => {
                if (key === "clear") {
                  return (
                    <motion.button
                      key="clear"
                      type="button"
                      onClick={pressClear}
                      disabled={verify.isPending || digits.length === 0}
                      whileTap={{ scale: 0.9 }}
                      className="h-16 rounded-2xl bg-muted text-muted-foreground font-display text-sm font-semibold border border-border transition-all duration-150 disabled:opacity-30 hover:bg-primary/10 hover:text-primary active:shadow-inner focus-visible:ring-2 focus-visible:ring-ring"
                      data-ocid="welcome.clear_button"
                      aria-label="Clear"
                    >
                      CLR
                    </motion.button>
                  );
                }
                if (key === "back") {
                  return (
                    <motion.button
                      key="back"
                      type="button"
                      onClick={pressBackspace}
                      disabled={verify.isPending || digits.length === 0}
                      whileTap={{ scale: 0.9 }}
                      className="h-16 rounded-2xl bg-muted text-muted-foreground border border-border flex items-center justify-center transition-all duration-150 disabled:opacity-30 hover:bg-primary/10 hover:text-primary active:shadow-inner focus-visible:ring-2 focus-visible:ring-ring"
                      data-ocid="welcome.backspace_button"
                      aria-label="Backspace"
                    >
                      <Delete className="w-5 h-5" />
                    </motion.button>
                  );
                }
                return (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => pressDigit(key)}
                    disabled={
                      verify.isPending || digits.length >= PASSCODE_LENGTH
                    }
                    whileTap={{ scale: 0.88 }}
                    className="h-16 rounded-2xl bg-primary/10 text-primary border border-primary/25 font-display text-2xl font-bold transition-all duration-150 disabled:opacity-40 hover:bg-primary/20 hover:shadow-md active:bg-primary/30 active:shadow-inner focus-visible:ring-2 focus-visible:ring-ring"
                    data-ocid={`welcome.numpad_key.${key}`}
                    aria-label={key}
                  >
                    {key}
                  </motion.button>
                );
              }),
            )}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
