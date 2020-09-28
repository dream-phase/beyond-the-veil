import Phaser from "phaser";
import tiles from "../assets/tiles/*.png";
import sky from "../assets/sky.png";
import dialoguebox from "../assets/dialoguebox.png";

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
    self.load.image("dialoguebox", dialoguebox);
  }

  update() {
    this.scene.start("demo");
  }
}
