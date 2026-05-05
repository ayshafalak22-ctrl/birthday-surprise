import Types "../types/birthday";
import BirthdayLib "../lib/birthday";

// Birthday API mixin — receives all state slices it needs
mixin (
  config : Types.AppConfig,
  loveLetter : { var text : Text },
  polaroidMemories : { var memories : [Types.PolaroidMemory] },
  reasonsILoveYou : { var reasons : [Text] },
) {

  // ── Admin setup ──────────────────────────────────────────────────────────

  /// Set the boyfriend's name displayed on the greeting page.
  public shared ({ caller = _ }) func setBoyfriendName(name : Text) : async () {
    config.boyfriendName := name
  };

  /// Set the passcode required to unlock the birthday reveal.
  public shared ({ caller = _ }) func setPasscode(code : Text) : async () {
    config.passcode := code
  };

  /// Set the love message shown after correct passcode entry.
  public shared ({ caller = _ }) func setLoveMessage(message : Text) : async () {
    config.loveMessage := message
  };

  /// Set the object-storage key for the couple photo on the greeting page.
  public shared ({ caller = _ }) func setCouplePhotoKey(key : Text) : async () {
    config.couplephotoKey := key
  };

  /// Set the object-storage key for the birthday photo shown after passcode.
  public shared ({ caller = _ }) func setBirthdayPhotoKey(key : Text) : async () {
    config.birthdayPhotoKey := key
  };

  /// Set the love letter text (gift 1).
  public shared ({ caller = _ }) func setLoveLetter(text : Text) : async () {
    loveLetter.text := text
  };

  /// Replace all polaroid memories (gift 2).
  public shared ({ caller = _ }) func setPolaroidMemories(memories : [Types.PolaroidMemory]) : async () {
    polaroidMemories.memories := memories
  };

  /// Replace the reasons-I-love-you list (gift 3).
  public shared ({ caller = _ }) func setReasonsILoveYou(reasons : [Text]) : async () {
    reasonsILoveYou.reasons := reasons
  };

  // ── Public (visitor) queries ─────────────────────────────────────────────

  /// Returns the greeting info shown on the landing page.
  public query func getGreeting() : async { name : Text; couplePhotoKey : Text } {
    BirthdayLib.getGreeting(config)
  };

  /// Verify the passcode; on success returns the birthday reveal payload.
  public shared func verifyPasscode(attempt : Text) : async ?{ loveMessage : Text; birthdayPhotoKey : Text } {
    if (BirthdayLib.verifyPasscode(config.passcode, attempt)) {
      ?BirthdayLib.getBirthdayReveal(config)
    } else {
      null
    }
  };

  /// Fetch a specific gift's content (called after passcode is verified client-side).
  public query func getGift(kind : Types.GiftKind) : async Types.GiftContent {
    BirthdayLib.getGiftContent(kind, loveLetter.text, polaroidMemories.memories, reasonsILoveYou.reasons)
  };
}
