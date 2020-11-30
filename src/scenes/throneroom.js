import Phaser from "phaser";
import Dialogue from "../dialogue";
import throneroomDialogue from "../dialogues/d-throneroom.json";
import Player from "../player";
import throneroomImg from "../assets/throneroom.jpg";
import withoutGod from "../assets/sounds/withoutGod.mp3";

export default class ThroneRoom extends Phaser.Scene {
  constructor() {
    super({ key: "throne-room" });
  }

  preload() {
    this.load.image("king");
    this.load.image("throneroomImg", throneroomImg);
    this.load.audio("withoutGod", withoutGod);
  }

  create() {
    const self = this;
    this.throneMusic = this.sound.add("withoutGod", { volume: 0.5 });
    this.throneMusic.play();
    this.tutorial = new Dialogue(throneroomDialogue, this, () => {
      self.scene.start("fade-black", { throneMusic: this.throneMusic });
    });
    this.add.image(1000, 150, "throneroomImg");
    this.add.image(330, 310, "king").setScale(1.6);
    const player = new Player(this, 220, 300);
    player.freeze();
    self.tutorial.startDialogue();
  }
}
