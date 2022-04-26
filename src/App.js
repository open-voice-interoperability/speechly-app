import React, { useEffect } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";
import magenta from "./magenta";
import genie from "./genie";


export default function App() {
  const { segment } = useSpeechContext();

  useEffect(() => {
    if (segment) {
      const plainString = segment.words.filter(w => w.value).map(w => w.value).join(' ');
      console.log(plainString);
      if (segment.isFinal) {
        console.log(segment);
        console.log("✅", plainString);
        const [agent] = segment.entities.filter(m => m.type === "agent").map(m => m.value);
        const [utterance] = segment.entities.filter(m => m.type === "utterance").map(m => m.value);
        const client = agent === "magenta" ? magenta : genie;
        client.send_text(agent && utterance ? utterance : plainString).then((r) => {
          console.log(r);
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(r.text));
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
