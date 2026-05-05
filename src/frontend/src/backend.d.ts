import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type GiftContent = {
    __kind__: "polaroidMemories";
    polaroidMemories: {
        memories: Array<PolaroidMemory>;
    };
} | {
    __kind__: "loveLetter";
    loveLetter: {
        text: string;
    };
} | {
    __kind__: "reasonsILoveYou";
    reasonsILoveYou: {
        reasons: Array<string>;
    };
};
export interface PolaroidMemory {
    dateLabel: string;
    photoKey: string;
    caption: string;
}
export enum GiftKind {
    polaroidMemories = "polaroidMemories",
    loveLetter = "loveLetter",
    reasonsILoveYou = "reasonsILoveYou"
}
export interface backendInterface {
    getGift(kind: GiftKind): Promise<GiftContent>;
    getGreeting(): Promise<{
        name: string;
        couplePhotoKey: string;
    }>;
    setBirthdayPhotoKey(key: string): Promise<void>;
    setBoyfriendName(name: string): Promise<void>;
    setCouplePhotoKey(key: string): Promise<void>;
    setLoveLetter(text: string): Promise<void>;
    setLoveMessage(message: string): Promise<void>;
    setPasscode(code: string): Promise<void>;
    setPolaroidMemories(memories: Array<PolaroidMemory>): Promise<void>;
    setReasonsILoveYou(reasons: Array<string>): Promise<void>;
    verifyPasscode(attempt: string): Promise<{
        birthdayPhotoKey: string;
        loveMessage: string;
    } | null>;
}
