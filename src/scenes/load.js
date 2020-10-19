/*jshint esversion: 6 */
import Phaser from "phaser";
import tiles from "../assets/tiles/*.png";
import sky from "../assets/sky.png";
import wizard from "../assets/wizard.png";
import wizardJson from "../assets/wizard.json";
import dialoguebox from "../assets/dialoguebox.png";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

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

    self.load.atlas("wizard", wizard, wizardJson);
    self.load.image("dialoguebox", dialoguebox);
  }

  create() {}

  update() {
    this.scene.start("demo");
  }
}
