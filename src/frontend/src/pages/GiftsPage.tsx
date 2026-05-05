import type { GiftContent } from "@/backend";
import { GiftKind } from "@/backend";
import {
  FloatingHearts,
  RibbonDecor,
  StarSparkle,
} from "@/components/DecorElements";
import { PageWrapper } from "@/components/PageWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetGift } from "../hooks/useBackend";

const GIFTS: { kind: GiftKind; emoji: string; label: string; desc: string }[] =
  [
    {
      kind: GiftKind.loveLetter,
      emoji: "💌",
      label: "Love Letter",
      desc: "A letter just for you",
    },
    {
      kind: GiftKind.polaroidMemories,
      emoji: "📸",
      label: "Our Memories",
      desc: "Polaroids of us together",
    },
    {
      kind: GiftKind.reasonsILoveYou,
      emoji: "💕",
      label: "Why I Love You",
      desc: "All the reasons you're my everything",
    },
  ];

interface GiftsPageProps {
  onComplete: () => void;
}

function LoveLetter({ content }: { content: string }) {
  return (
    <div className="bg-card border border-primary/20 rounded-2xl p-6 shadow-warm">
      <p className="text-2xl mb-3 text-center">💌</p>
      <h3 className="font-display text-lg font-bold text-primary mb-4 text-center">
        A Letter From My Heart
      </h3>
      <div className="font-body text-sm text-foreground leading-relaxed italic whitespace-pre-line max-h-64 overflow-y-auto">
        {content ||
          "My dearest love,\n\nEvery single day with you is a gift I never deserved but am endlessly grateful for. You make my world brighter, my heart fuller, and my life more beautiful than I ever imagined possible.\n\nForever yours 🌹"}
      </div>
    </div>
  );
}

function Polaroids({
  memories,
}: { memories: { photoKey: string; dateLabel: string; caption: string }[] }) {
  const fallbacks = [
    { dateLabel: "Jan 14, 2023", caption: "Our first date 🌹", photoKey: "" },
    {
      dateLabel: "Mar 8, 2023",
      caption: "That sunset we chased 🌅",
      photoKey: "",
    },
    { dateLabel: "Jun 21, 2023", caption: "Your silly smile 😂", photoKey: "" },
  ];
  const items = memories?.length ? memories : fallbacks;
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-bold text-primary text-center mb-2">
        📸 Our Memories
      </h3>
      {items.map((m, i) => (
        <motion.div
          key={m.dateLabel ?? i}
          className="bg-card border-4 border-border shadow-warm rounded-sm p-3 mx-auto max-w-xs"
          initial={{ opacity: 0, rotate: i % 2 === 0 ? -2 : 2 }}
          animate={{ opacity: 1, rotate: i % 2 === 0 ? -2 : 2 }}
          transition={{ delay: i * 0.15 }}
          style={{ transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)` }}
          data-ocid={`gifts.memory.item.${i + 1}`}
        >
          {m.photoKey ? (
            <img
              src={m.photoKey}
              alt={m.caption}
              className="w-full h-40 object-cover rounded-sm mb-2"
            />
          ) : (
            <div className="w-full h-40 bg-muted rounded-sm mb-2 flex items-center justify-center text-4xl">
              📷
            </div>
          )}
          <p className="font-mono text-xs text-muted-foreground text-center">
            {m.dateLabel}
          </p>
          <p className="font-body text-sm text-foreground text-center italic">
            {m.caption}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function Reasons({ reasons }: { reasons: string[] }) {
  const fallbacks = [
    "The way you laugh at my terrible jokes",
    "How you always know when I need a hug",
    "Your ridiculously cute morning face",
    "The way you hold my hand",
    "You make even boring days feel magical",
  ];
  const items = reasons?.length ? reasons : fallbacks;
  return (
    <div className="space-y-3">
      <h3 className="font-display text-lg font-bold text-primary text-center">
        💕 Why I Love You
      </h3>
      {items.map((reason, i) => (
        <motion.div
          key={reason.slice(0, 30)}
          className="flex items-start gap-3 bg-card border border-primary/15 rounded-xl px-4 py-3 shadow-xs"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          data-ocid={`gifts.reason.item.${i + 1}`}
        >
          <span className="text-primary font-display font-bold text-sm shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            {i + 1}
          </span>
          <p className="font-body text-sm text-foreground">{reason}</p>
        </motion.div>
      ))}
    </div>
  );
}

function renderGiftContent(kind: GiftKind, data: GiftContent | null) {
  if (!data) return null;
  if (kind === GiftKind.loveLetter && data.__kind__ === "loveLetter") {
    return <LoveLetter content={data.loveLetter.text} />;
  }
  if (
    kind === GiftKind.polaroidMemories &&
    data.__kind__ === "polaroidMemories"
  ) {
    return <Polaroids memories={data.polaroidMemories.memories} />;
  }
  if (
    kind === GiftKind.reasonsILoveYou &&
    data.__kind__ === "reasonsILoveYou"
  ) {
    return <Reasons reasons={data.reasonsILoveYou.reasons} />;
  }
  return null;
}

export function GiftsPage({ onComplete }: GiftsPageProps) {
  const [viewedGifts, setViewedGifts] = useState<Set<GiftKind>>(new Set());
  const [activeGift, setActiveGift] = useState<GiftKind | null>(null);
  const [giftData, setGiftData] = useState<
    Partial<Record<GiftKind, GiftContent | null>>
  >({});
  const getGift = useGetGift();

  const allViewed = viewedGifts.size === 3;

  async function openGift(kind: GiftKind) {
    setActiveGift(kind);
    if (!giftData[kind]) {
      const result = await getGift.mutateAsync(kind);
      if (result) {
        setGiftData((prev) => ({ ...prev, [kind]: result }));
      }
    }
    setViewedGifts((prev) => new Set(prev).add(kind));
  }

  if (activeGift) {
    const gift = GIFTS.find((g) => g.kind === activeGift);
    const data = giftData[activeGift] ?? null;
    return (
      <PageWrapper>
        <FloatingHearts />
        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveGift(null)}
              className="font-body text-muted-foreground hover:text-foreground"
              data-ocid="gifts.back_button"
            >
              ← Back to gifts
            </Button>
            <Badge variant="secondary" className="font-display">
              {gift?.emoji} {gift?.label}
            </Badge>
          </div>

          {getGift.isPending && (
            <div
              className="text-center py-8 text-4xl animate-[teddy-bounce_2s_ease-in-out_infinite]"
              data-ocid="gifts.loading_state"
            >
              🎀
            </div>
          )}

          {renderGiftContent(activeGift, data)}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FloatingHearts />
      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col gap-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-2">
            <StarSparkle />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Your Surprises
            </h2>
            <StarSparkle />
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Choose a gift to open 🎁
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {viewedGifts.size}/3 opened
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {GIFTS.map((gift, i) => {
            const isViewed = viewedGifts.has(gift.kind);
            return (
              <motion.div
                key={gift.kind}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <button
                  type="button"
                  onClick={() => openGift(gift.kind)}
                  className={`w-full bg-card border-2 rounded-2xl p-4 shadow-warm flex items-center gap-4 transition-smooth hover:scale-[1.02] hover:shadow-lg text-left ${
                    isViewed
                      ? "border-primary/40 bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  data-ocid={`gifts.gift.item.${i + 1}`}
                >
                  <span className="text-4xl shrink-0">{gift.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-foreground text-base">
                        {gift.label}
                      </p>
                      {isViewed && (
                        <Badge className="text-xs py-0 font-body">Opened</Badge>
                      )}
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      {gift.desc}
                    </p>
                  </div>
                  <RibbonDecor />
                </button>
              </motion.div>
            );
          })}
        </div>

        {allViewed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <Button
              onClick={onComplete}
              size="lg"
              className="font-display text-base rounded-full px-8 shadow-warm"
              data-ocid="gifts.complete_button"
            >
              I've enjoyed all my gifts 💝
            </Button>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
