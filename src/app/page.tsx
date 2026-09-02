import IntroGate from "@/components/scenes/IntroGate";
import LoveStory from "@/components/scenes/LoveStory";
import Countdown from "@/components/scenes/Countdown";
import Ceremony from "@/components/scenes/Ceremony";
import Reception from "@/components/scenes/Reception";
import DressCode from "@/components/scenes/DressCode";
import Gifts from "@/components/scenes/Gifts";
import RSVP from "@/components/scenes/RSVP";
import FinalMessage from "@/components/scenes/FinalMessage";
import AudioController from "@/components/ui/AudioController";

export default function Home() {
  return (
    <>
      <IntroGate />
      <main>
        <LoveStory />
        <Countdown />
        <Ceremony />
        <Reception />
        <DressCode />
        <Gifts />
        <RSVP />
        <FinalMessage />
      </main>
      <AudioController />
    </>
  );
}
