module {
  // Admin-configured greeting & auth
  public type AppConfig = {
    var boyfriendName : Text;
    var passcode : Text;
    var loveMessage : Text;
    var couplephotoKey : Text;    // object-storage asset key
    var birthdayPhotoKey : Text;  // object-storage asset key
  };

  // Polaroid memory entry
  public type PolaroidMemory = {
    photoKey : Text;   // object-storage asset key
    dateLabel : Text;  // date written by admin, e.g. "14 Feb 2023"
    caption : Text;
  };

  // The three gift types
  public type GiftKind = {
    #loveLetter;
    #polaroidMemories;
    #reasonsILoveYou;
  };

  // Full gift content (returned to authenticated caller)
  public type GiftContent = {
    #loveLetter : { text : Text };
    #polaroidMemories : { memories : [PolaroidMemory] };
    #reasonsILoveYou : { reasons : [Text] };
  };
}
