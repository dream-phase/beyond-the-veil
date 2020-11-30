/*jshint esversion: 6 */
import Phaser from "phaser";

import inTheClouds from "../assets/sounds/InTheClouds.mp3";
import startScreen from "../assets/startScreen.jpg";

export default class StartScreen extends Phaser.Scene {
  constructor() {
    super({ key: "start-screen" });
  }

  preload() {
    this.load.audio("inTheClouds", inTheClouds);
    this.load.image("startScreen", startScreen);
  }

  create() {
    this.add.image(600, 300, "startScreen");
    this.music = this.sound.add("inTheClouds", { volume: 0.5 });
    this.music.play();
  }

  update() {
    const pointer = this.input.activePointer;
    if (pointer.isDown) {
      this.scene.stop("start-screen");
      this.scene.start("load");
    }
  }
}
