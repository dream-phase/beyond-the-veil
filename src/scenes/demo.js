import Phaser from "phaser";
import Dialogue from "../dialogue";
import demoDialogue from "../dialogues/demoDialogue.json";

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super({ key: "demo" });
  }

  preload() {}

  create() {
    const self = this;
    self.add.image(350, 350, "sky").setScale(0.7);
    self.conversation = new Dialogue(demoDialogue, self);
    self.conversation.startDialogue();
  }
}
