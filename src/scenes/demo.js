import Phaser from "phaser";

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super({ key: "demo" });
  }

  preload() {}

  create() {
    this.add.image(0, 0, "sky").setScale(3);
  }
}
