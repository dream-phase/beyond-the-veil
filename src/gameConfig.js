/*jshint esversion: 6 */
import Phaser from "phaser";
import LoadScene from "./scenes/load";
import DemoScene from "./scenes/demo";

export default {
  type: Phaser.AUTO,
  width: 1200, //1000
  height: 600, //600
  title: "Beyond the Veil",
  url: "https://github.com/dreamp-phase/beyond-the-veil",
  banner: {
    text: "white",
    background: ["#FD7400", "#FFE11A", "#BEDB39", "#1F8A70", "#004358"],
  },
  scene: [LoadScene, DemoScene],
  physics: {
    //we should convert from arcade to matter later to allow for custom collision shapes
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: false,
    },
  },
};
