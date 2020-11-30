/*jshint esversion: 6 */
import Phaser from "phaser";
import tiles from "../assets/tiles/*.png";
import sky from "../assets/sky.png";
import key from "../assets/key.png";
import wizard from "../assets/wizard.png";
import door from "../assets/door.png";
import wizardJson from "../assets/wizard.json";
import dialoguebox from "../assets/dialoguebox.png";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import Dialogue from "../dialogue";
import introDialogue from "../dialogues/d-intro.json";
import inventory from "../assets/inventory.png";
import gargoyle from "../assets/gargoyle.png";
import king from "../assets/king.png";
import inTheClouds from "../assets/sounds/InTheClouds.mp3";

const helpText = `
[i]: open inventory
[e]: interact with level
[left mouse click]: attack
`;

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: "load" });
  }

  preload() {
    const self = this;
    // loads all the image tiles
    Object.keys(tiles).forEach((tile) => {
      self.load.image(tile, tiles[tile]);
    });
    self.load.image("sky", sky);
    self.load.image("key", key);
    self.load.image("inventory", inventory);
    self.load.image("gargoyle", gargoyle);
    self.load.image("door", door);
    self.load.atlas("wizard", wizard, wizardJson);
    self.load.image("dialoguebox", dialoguebox);
    self.load.image("king", king);
    self.load.audio("inTheClouds", inTheClouds);
  }

  create() {
    const self = this;
    this.music = this.sound.add("inTheClouds");
    const text = this.add.text(400, 128, helpText, {
      font: "24px",
    });
    text.setScrollFactor(0);
    self.tutorial = new Dialogue(introDialogue, this, () => {
      this.music.stop();
      self.scene.start("lvl3");
    });
    setTimeout(() => {
      self.tutorial.startDialogue();
    }, 3000);

    this.music.play();
  }

  update() {}
}
