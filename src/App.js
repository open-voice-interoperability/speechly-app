import React, { useEffect } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";
import client from "./client";


export default function App() {
  const { segment } = useSpeechContext();

  useEffect(() => {
    if (segment) {
      const plainString = segment.words.filter(w => w.value).map(w => w.value).join(' ');
      console.log(plainString);
      if (segment.isFinal) {
        console.log("✅", plainString);
        client.send_text(plainString).then((r) => {
          console.log(r);
          const response = r.messages.filter(m => m.type === "text").map(w => w.text).join('\n');
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(response));
        });
      }
    }
  }, [segment]);

  return (
    <div className="App">
      <BigTranscript placement="top"/>
      <PushToTalkButton placement="bottom" captureKey=" " powerOn="auto" />
      <IntroPopup />
      <p className="openconsole">ℹ️ Open the Browser Console to see speech segment outputs</p>
    </div>
  );
}
