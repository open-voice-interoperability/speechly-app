import React, { useEffect, useState } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";
import magenta from "./magenta";
import genie from "./genie";

const gradient = {
  default:  ["#15e8b5", "#4fa1f9"],
  genie:  ["#827FFF", "#4fa1f9"],
  magenta:  ["#FF827F", "#4fa1f9"],
}

export default function App() {
  const { segment } = useSpeechContext();

  const [agentState, setAgent] = useState("");
  useEffect(() => {
    if (agentState) window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${agentState} activated.`));
  }, [agentState]);

  useEffect(() => {
    if (segment) {
      const plainString = segment.words.filter(w => w.value).map(w => w.value).join(' ');
      console.log(plainString);
      if (segment.isFinal) {
        console.log("✅", plainString);
        console.log(segment);

        const [agent] = segment.entities.filter(m => m.type === "agent").map(m => m.value);
        switch (segment.intent?.isFinal && segment.intent.intent) {
          case "LaunchIntent":
            setAgent(agent);
            break;
          case "StopIntent":
            setAgent("");
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${agentState} terminated.`));
            break;
          case agent && "AskIntent":
            const [utterance] = segment.entities.filter(m => m.type === "utterance").map(m => m.value);
            (agent === "magenta" ? magenta : genie).send_text(utterance ? utterance : plainString).then((r) => {
              console.log(r);
              window.speechSynthesis.speak(new SpeechSynthesisUtterance(r.text));
            });
            break;
          default:
            (agentState === "magenta" ? magenta : genie).send_text(plainString).then((r) => {
              console.log(r);
              window.speechSynthesis.speak(new SpeechSynthesisUtterance(r.text));
            });
        }
      }
    }
  }, [segment]);

  return (
    <div className="App">
      <BigTranscript placement="top"/>
      <PushToTalkButton
          placement="bottom" captureKey=" " powerOn="auto"
          gradientStops={gradient[agentState ? agentState : "default"]}/>
      <IntroPopup />
      <p className="openconsole">ℹ️ Open the Browser Console to see debug output</p>
    </div>
  );
}
