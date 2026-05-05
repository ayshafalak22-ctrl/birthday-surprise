import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { useState } from "react";
import { useAdminSetters } from "../hooks/useBackend";

export function AdminPage() {
  const [passcodeInput, setPasscodeInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [couplePhotoKey, setCouplePhotoKeyInput] = useState("");
  const [birthdayPhotoKey, setBirthdayPhotoKeyInput] = useState("");
  const [loveLetter, setLoveLetterInput] = useState("");
  const [reasons, setReasonsInput] = useState("");
  const [saved, setSaved] = useState("");
  const [memories, setMemories] = useState<
    { photoKey: string; dateLabel: string; caption: string }[]
  >([]);

  const admin = useAdminSetters();

  function addMemory() {
    setMemories((prev) => [
      ...prev,
      { photoKey: "", dateLabel: "", caption: "" },
    ]);
  }
  function removeMemory(i: number) {
    setMemories((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updateMemory(
    i: number,
    field: "photoKey" | "dateLabel" | "caption",
    val: string,
  ) {
    setMemories((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)),
    );
  }

  async function handleSave() {
    setSaved("");
    const tasks: Promise<unknown>[] = [];
    if (nameInput.trim())
      tasks.push(admin.setName.mutateAsync(nameInput.trim()));
    if (passcodeInput.trim())
      tasks.push(admin.setPasscode.mutateAsync(passcodeInput.trim()));
    if (messageInput.trim())
      tasks.push(admin.setLoveMessage.mutateAsync(messageInput.trim()));
    if (couplePhotoKey.trim())
      tasks.push(admin.setCouplePhotoKey.mutateAsync(couplePhotoKey.trim()));
    if (birthdayPhotoKey.trim())
      tasks.push(
        admin.setBirthdayPhotoKey.mutateAsync(birthdayPhotoKey.trim()),
      );
    if (loveLetter.trim())
      tasks.push(admin.setLoveLetter.mutateAsync(loveLetter.trim()));
    if (reasons.trim()) {
      const arr = reasons
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean);
      tasks.push(admin.setReasonsILoveYou.mutateAsync(arr));
    }
    const validMemories = memories.filter(
      (m) => m.photoKey.trim() && m.dateLabel.trim(),
    );
    if (validMemories.length > 0)
      tasks.push(admin.setPolaroidMemories.mutateAsync(validMemories));
    await Promise.all(tasks);
    setSaved("✅ Saved!");
    setTimeout(() => setSaved(""), 3000);
  }

  const isSaving = [
    admin.setName,
    admin.setPasscode,
    admin.setLoveMessage,
    admin.setCouplePhotoKey,
    admin.setBirthdayPhotoKey,
    admin.setLoveLetter,
    admin.setReasonsILoveYou,
    admin.setPolaroidMemories,
  ].some((m) => m.isPending);

  return (
    <PageWrapper>
      <div className="relative z-10 w-full max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            🛠️ Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configure the birthday surprise
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-warm space-y-3">
            <h2 className="font-display font-semibold text-primary text-sm uppercase tracking-wide">
              Basic Info
            </h2>
            <div className="space-y-1">
              <Label htmlFor="admin-name" className="font-body text-xs">
                Boyfriend's Name
              </Label>
              <Input
                id="admin-name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Aryan"
                data-ocid="admin.name_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="admin-passcode" className="font-body text-xs">
                Secret Passcode
              </Label>
              <Input
                id="admin-passcode"
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter passcode..."
                data-ocid="admin.passcode_input"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 shadow-warm space-y-3">
            <h2 className="font-display font-semibold text-primary text-sm uppercase tracking-wide">
              Photos (URL or Storage Key)
            </h2>
            <div className="space-y-1">
              <Label htmlFor="admin-couple-photo" className="font-body text-xs">
                Couple Photo URL
              </Label>
              <Input
                id="admin-couple-photo"
                value={couplePhotoKey}
                onChange={(e) => setCouplePhotoKeyInput(e.target.value)}
                placeholder="https://... or storage key"
                data-ocid="admin.couple_photo_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="admin-bday-photo" className="font-body text-xs">
                Birthday Photo URL
              </Label>
              <Input
                id="admin-bday-photo"
                value={birthdayPhotoKey}
                onChange={(e) => setBirthdayPhotoKeyInput(e.target.value)}
                placeholder="https://... or storage key"
                data-ocid="admin.birthday_photo_input"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 shadow-warm space-y-3">
            <h2 className="font-display font-semibold text-primary text-sm uppercase tracking-wide">
              Messages
            </h2>
            <div className="space-y-1">
              <Label htmlFor="admin-message" className="font-body text-xs">
                Birthday Love Message
              </Label>
              <Textarea
                id="admin-message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Write your birthday message..."
                rows={3}
                data-ocid="admin.message_textarea"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="admin-letter" className="font-body text-xs">
                Love Letter
              </Label>
              <Textarea
                id="admin-letter"
                value={loveLetter}
                onChange={(e) => setLoveLetterInput(e.target.value)}
                placeholder="Write your heartfelt letter..."
                rows={5}
                data-ocid="admin.love_letter_textarea"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="admin-reasons" className="font-body text-xs">
                Reasons I Love You (one per line)
              </Label>
              <Textarea
                id="admin-reasons"
                value={reasons}
                onChange={(e) => setReasonsInput(e.target.value)}
                placeholder="The way you smile...&#10;How you make me feel safe...&#10;Your laugh..."
                rows={5}
                data-ocid="admin.reasons_textarea"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 shadow-warm space-y-3">
            <h2 className="font-display font-semibold text-primary text-sm uppercase tracking-wide">
              📸 Polaroid Memories
            </h2>
            <p className="text-muted-foreground text-xs">
              Each memory needs an image URL and a date. Caption is optional.
            </p>
            {memories.map((mem, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: order is user-defined
                key={i}
                className="border border-border rounded-xl p-3 space-y-2"
                data-ocid={`admin.memory_item.${i + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-semibold text-muted-foreground">
                    Memory #{i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMemory(i)}
                    className="text-destructive text-xs hover:underline"
                    data-ocid={`admin.remove_memory_button.${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-xs">Image URL / Key</Label>
                  <Input
                    value={mem.photoKey}
                    onChange={(e) =>
                      updateMemory(i, "photoKey", e.target.value)
                    }
                    placeholder="https://... or storage key"
                    data-ocid={`admin.memory_image_input.${i + 1}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-xs">
                    Date (e.g. Dec 25, 2023)
                  </Label>
                  <Input
                    value={mem.dateLabel}
                    onChange={(e) =>
                      updateMemory(i, "dateLabel", e.target.value)
                    }
                    placeholder="Dec 25, 2023"
                    data-ocid={`admin.memory_date_input.${i + 1}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="font-body text-xs">
                    Caption (optional)
                  </Label>
                  <Input
                    value={mem.caption}
                    onChange={(e) => updateMemory(i, "caption", e.target.value)}
                    placeholder="Our first trip together..."
                    data-ocid={`admin.memory_caption_input.${i + 1}`}
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMemory}
              className="w-full rounded-full font-body text-xs"
              data-ocid="admin.add_memory_button"
            >
              + Add Memory
            </Button>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
            className="w-full font-display text-base rounded-full shadow-warm"
            data-ocid="admin.save_button"
          >
            {isSaving ? "Saving..." : "Save Everything 💾"}
          </Button>

          {saved && (
            <motion.p
              className="text-center font-body text-sm text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="admin.success_state"
            >
              {saved}
            </motion.p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
