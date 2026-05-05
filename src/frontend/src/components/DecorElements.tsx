import { motion } from "motion/react";

export function FloatingHearts() {
  const hearts = ["💕", "💗", "💖", "🩷", "💝"];
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((heart, i) => (
        <motion.span
          key={heart}
          className="absolute text-xl select-none"
          style={{
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -18, 0],
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {heart}
        </motion.span>
      ))}
    </div>
  );
}

export function RibbonDecor({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`inline-block select-none ${className}`}
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      🎀
    </motion.span>
  );
}

export function TeddyCute({
  size = "text-6xl",
  className = "",
}: { size?: string; className?: string }) {
  return (
    <motion.div
      className={`${size} ${className} select-none`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <img
        src="/assets/generated/teddy-cute.dim_400x400.png"
        alt="Cute teddy bear"
        className="w-full h-full object-contain drop-shadow-md"
      />
    </motion.div>
  );
}

export function TeddyAngry({
  size = "text-6xl",
  className = "",
}: { size?: string; className?: string }) {
  return (
    <motion.div
      className={`${size} ${className} select-none`}
      animate={{ rotate: [-3, 3, -3], x: [-2, 2, -2] }}
      transition={{
        duration: 0.3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <img
        src="/assets/generated/teddy-angry.dim_400x400.png"
        alt="Angry teddy bear"
        className="w-full h-full object-contain drop-shadow-md"
      />
    </motion.div>
  );
}

export function StarSparkle({ className = "" }: { className?: string }) {
  return (
    <motion.span
      className={`inline-block select-none ${className}`}
      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      ✨
    </motion.span>
  );
}
