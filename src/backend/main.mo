import BirthdayMixin "mixins/birthday-api";
import Types "types/birthday";

actor {
  // —— Birthday domain state ——
  let config : Types.AppConfig = {
    var boyfriendName = "";
    var passcode = "2213";
    var loveMessage = "";
    var couplephotoKey = "";
    var birthdayPhotoKey = "";
  };

  let loveLetter = { var text : Text = "" };
  let polaroidMemories = { var memories : [Types.PolaroidMemory] = [] };
  let reasonsILoveYou = { var reasons : [Text] = [] };

  include BirthdayMixin(config, loveLetter, polaroidMemories, reasonsILoveYou);
};
