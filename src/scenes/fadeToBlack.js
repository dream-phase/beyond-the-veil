import Phaser from "phaser";
import Dialogue from "../dialogue";
import afterThrone from "../dialogues/d-afterThrone.json";

export default class FadeToBlack extends Phaser.Scene {
  constructor() {
    super({ key: "fade-black" });
  }

  init(data) {
    this.throneMusic = data.throneMusic;
  }

  create() {
    const self = this;
    const dialogue = new Dialogue(afterThrone, this, () => {
      self.scene.start("Puzzle1");
    });
    dialogue.startDialogue();
  }
}
