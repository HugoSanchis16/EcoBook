import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import EmojiButton from "../Buttons/EmojiButton";

const EmojiSelector = () => {
  const [emojiSelected, setEmojiSelected] = useState("📄");
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker((showPicker) => !showPicker);

  const handleEmoji = (e) => {
    const {} = e;
    setEmojiSelected();
    togglePicker();
  };

  return (
    <div className="position-relative">
      
      {showPicker && (
        <div style={{ top: 50, right: 0 }} className="position-absolute">
          <div
            onClick={togglePicker}
            style={{ position: "fixed", top: 0, bottom: 0, right: 0, left: 0 }}
            className="bg-danger emoji-backdrop"
          />
          <EmojiPicker
            width={275}
            emojiStyle="twitter"
            onEmojiClick={console.log}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
