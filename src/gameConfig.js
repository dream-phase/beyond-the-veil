/*jshint esversion: 6 */
import Phaser from "phaser";
import LoadScene from "./scenes/load";
import DemoScene from "./scenes/demo";
import Level2 from "./scenes/lvl2";
<<<<<<< HEAD
<<<<<<< HEAD
import Level3 from "./scenes/lvl3";
=======
import Level3 from "./scenes/lvl3"
>>>>>>> Added matter framework for puzzle/minigame, still needs proper collision detection and proper score count
import { Engine, Render, World, Bodies, Body } from "matter-js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import ThroneRoom from "./scenes/throneroom";
import FadeToBlack from "./scenes/fadeToBlack";
=======
import Level3 from "./scenes/lvl3";
import Level4 from "./scenes/lvl4";
import {
  Engine,
  Render,
  World,
  Bodies,
  Body,
  Constraint,
  MouseConstraint,
  Events,
  Composites,
} from "matter-js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
>>>>>>> Updated minigame

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
<<<<<<< HEAD
  scene: [LoadScene, DemoScene, Level2, Level3, ThroneRoom, FadeToBlack],
=======
  scene: [LoadScene, DemoScene, Level2, Level3],
>>>>>>> Added matter framework for puzzle/minigame, still needs proper collision detection and proper score count
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
