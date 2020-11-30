/*jshint esversion: 6 */
import Phaser from "phaser";
import LoadScene from "./scenes/load";
import DemoScene from "./scenes/demo";
import Level2 from "./scenes/lvl2";
import ThroneRoom from "./scenes/throneroom";
import FadeToBlack from "./scenes/fadeToBlack";
import Level4 from "./scenes/lvl4";
import Puzzle2 from "./scenes/puzzle2";
import Puzzle3 from "./scenes/puzzle3";
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
import Puzzle1 from "./scenes/puzzle1";
import StartScreen from "./scenes/startScreen";

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
  scene: [
    StartScreen,
    LoadScene,
    DemoScene,
    Level2,
    Level4,
    ThroneRoom,
    FadeToBlack,
    Puzzle1,
    Puzzle2,
    Puzzle3,
  ],
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
