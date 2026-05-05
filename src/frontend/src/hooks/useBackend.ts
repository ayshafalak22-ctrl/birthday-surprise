import { createActor } from "@/backend";
import type { GiftContent, GiftKind, PolaroidMemory } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { BirthdayData, GreetingData } from "../types";

export type { GiftContent, GiftKind };

export function useGreeting() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GreetingData>({
    queryKey: ["greeting"],
    queryFn: async () => {
      if (!actor) return { name: "", couplePhotoKey: "" };
      const result = await actor.getGreeting();
      return result as GreetingData;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVerifyPasscode() {
  const { actor } = useActor(createActor);
  return useMutation<BirthdayData | null, Error, string>({
    mutationFn: async (attempt: string) => {
      if (!actor) return null;
      const result = await actor.verifyPasscode(attempt);
      return result ?? null;
    },
  });
}

export function useGetGift() {
  const { actor } = useActor(createActor);
  return useMutation<GiftContent | null, Error, GiftKind>({
    mutationFn: async (kind: GiftKind) => {
      if (!actor) return null;
      return actor.getGift(kind);
    },
  });
}

export function useAdminSetters() {
  const { actor } = useActor(createActor);

  const setName = useMutation({
    mutationFn: async (name: string) => {
      if (actor) await actor.setBoyfriendName(name);
    },
  });
  const setPasscode = useMutation({
    mutationFn: async (code: string) => {
      if (actor) await actor.setPasscode(code);
    },
  });
  const setLoveMessage = useMutation({
    mutationFn: async (msg: string) => {
      if (actor) await actor.setLoveMessage(msg);
    },
  });
  const setCouplePhotoKey = useMutation({
    mutationFn: async (key: string) => {
      if (actor) await actor.setCouplePhotoKey(key);
    },
  });
  const setBirthdayPhotoKey = useMutation({
    mutationFn: async (key: string) => {
      if (actor) await actor.setBirthdayPhotoKey(key);
    },
  });
  const setLoveLetter = useMutation({
    mutationFn: async (letter: string) => {
      if (actor) await actor.setLoveLetter(letter);
    },
  });
  const setReasonsILoveYou = useMutation({
    mutationFn: async (reasons: string[]) => {
      if (actor) await actor.setReasonsILoveYou(reasons);
    },
  });
  const setPolaroidMemories = useMutation({
    mutationFn: async (memories: PolaroidMemory[]) => {
      if (actor) await actor.setPolaroidMemories(memories);
    },
  });

  return {
    setName,
    setPasscode,
    setLoveMessage,
    setCouplePhotoKey,
    setBirthdayPhotoKey,
    setLoveLetter,
    setReasonsILoveYou,
    setPolaroidMemories,
  };
}
