import Phaser from "phaser";
import tiles from "../assets/tiles/*.png";
import sky from "../assets/sky.png";
import player1 from "../assets/player1.png";
import playerJson from "../assets/player.json";

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

    self.load.atlas("player1", player1, playerJson);
  }
  create() {
    this.anims.create({
      key: "walk",
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames("player1", {
        prefix: "walk/walk-",
        suffix: ".png",
        start: 0,
        end: 7,
        zeroPad: 1,
      }),
    });
    this.anims.create({
      key: "jump",
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames("player1", {
        prefix: "jump/jump-",
        suffix: ".png",
        start: 0,
        end: 7,
        zeroPad: 1,
      }),
    });
    this.anims.create({
      key: "run",
      repeat: -1,
      frameRate: 8,
      frames: this.anims.generateFrameNames("player1", {
        prefix: "run/run-",
        suffix: ".png",
        start: 0,
        end: 6,
        zeroPad: 1,
      }),
    });
  }

  update() {
    this.scene.start("demo");
  }
}
