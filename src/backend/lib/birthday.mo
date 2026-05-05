import Types "../types/birthday";

module {
  // Verify a passcode attempt against the stored passcode
  public func verifyPasscode(stored : Text, attempt : Text) : Bool {
    stored == attempt
  };

  // Produce the greeting data for the landing page
  public func getGreeting(config : Types.AppConfig) : { name : Text; couplePhotoKey : Text } {
    { name = config.boyfriendName; couplePhotoKey = config.couplephotoKey }
  };

  // Produce the birthday reveal data (post passcode)
  public func getBirthdayReveal(config : Types.AppConfig) : { loveMessage : Text; birthdayPhotoKey : Text } {
    { loveMessage = config.loveMessage; birthdayPhotoKey = config.birthdayPhotoKey }
  };

  // Retrieve a specific gift's content
  public func getGiftContent(
    kind : Types.GiftKind,
    loveLetter : Text,
    memories : [Types.PolaroidMemory],
    reasons : [Text],
  ) : Types.GiftContent {
    switch kind {
      case (#loveLetter) { #loveLetter { text = loveLetter } };
      case (#polaroidMemories) { #polaroidMemories { memories } };
      case (#reasonsILoveYou) { #reasonsILoveYou { reasons } };
    }
  };
}
