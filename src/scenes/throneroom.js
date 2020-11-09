import Phaser from "phaser";
import Dialogue from "../dialogue";
import throneroomDialogue from "../dialogues/d-throneroom.json";
import Player from "../player";

export default class ThroneRoom extends Phaser.Scene {
  constructor() {
    super({ key: "throne-room" });
  }

  preload() {
    this.load.image("king");
  }

  create() {
    const self = this;
    this.tutorial = new Dialogue(throneroomDialogue, this, () => {
      self.scene.start("fade-black");
    });
    this.add.image(1000, 150, "throneroomImg");
    this.add.image(330, 310, "king").setScale(1.6);
    const player = new Player(this, 220, 300);
    player.freeze();
    self.tutorial.startDialogue();
  }
}
