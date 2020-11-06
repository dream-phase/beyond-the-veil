/*jshint esversion: 6 */
import Phaser from "phaser";
import LoadScene from "./scenes/load";
import DemoScene from "./scenes/demo";
import Level2 from "./scenes/lvl2";
import Level3 from "./scenes/lvl3";
import { Engine, Render, World, Bodies, Body } from "matter-js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

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
  scene: [LoadScene, DemoScene, Level2, Level3], //
  physics: {
    //converted to Matter-js to allow for polygon collision boxes
    default: "matter",
    matter: {
      debug: false,
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};
