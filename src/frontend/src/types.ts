export type GiftKind = "love_letter" | "memories" | "reasons";

export interface PolaroidMemory {
  imageKey: string;
  date: string;
  caption: string;
}

export interface GiftContent {
  kind: GiftKind;
  loveLetter?: string;
  memories?: PolaroidMemory[];
  reasons?: string[];
}

export interface GreetingData {
  name: string;
  couplePhotoKey: string;
}

export interface BirthdayData {
  loveMessage: string;
  birthdayPhotoKey: string;
}

export type AppPage =
  | "welcome"
  | "birthday"
  | "ready"
  | "dare"
  | "gifts"
  | "finale"
  | "admin";
