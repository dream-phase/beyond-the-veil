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
import tutorial from "../dialogues/tutorial.json";
import inventory from "../assets/inventory.png";
import gargoyle from "../assets/gargoyle.png";

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
  }

  create() {
    const self = this;
    self.tutorial = new Dialogue(tutorial, this, () => {
      self.scene.start("demo");
    });
    self.tutorial.startDialogue();
  }

  update() {}
}
