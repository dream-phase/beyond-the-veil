/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

/**
 * Setting up parameters for parralax 'createAligned' method
 * @param {Phaser.Scene} scene
 * @param {number} totalWidth
 * @param {string} texture
 * @param {number} scrollFactor
 */

import Phaser from "phaser";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet.png";
import lvl2map from "../assets/lvl2.json";
import doorpng from "../assets/door.png";
import heroine from "../assets/heroine01.png";
import Player from "../player.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";
import Dialogue from "../dialogue";
import demoDialogue from "../dialogues/demoDialogue.json";
import lvl3 from "./lvl3.js";
// Parallax assets
import mist01 from "../assets/01_Mist.png";
import bushes02 from "../assets/02_Bushes.png";
import particles03 from "../assets/03_Particles.png";
import forest04 from "../assets/04_Forest.png";
import particles05 from "../assets/05_Particles.png";
import forest06 from "../assets/06_Forest.png";
import forest07 from "../assets/07_Forest.png";
import forest08 from "../assets/08_Forest.png";
import forest09 from "../assets/09_Forest.png";
import sky10 from "../assets/10_Sky.png";

// Allows us to create scrollable parallax backgrounds through calling a method
const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; ++i) {
    const m = scene.add
      .image(x, scene.scale.height + 200, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};

export default class lvl2 extends Phaser.Scene {
  constructor() {
    super({ key: "lvl2" });
    //var cursors;
  }

  preload() {
    this.load.image("tilessheet", ts);
    this.load.image("sky", sky);
    this.load.image("door", doorpng);
    this.load.image("heroine", heroine);
    // Parallax assets
    this.load.image("mist01", mist01);
    this.load.image("bushes02", bushes02);
    this.load.image("particles03", particles03);
    this.load.image("forest04", forest04);
    this.load.image("particles05", particles05);
    this.load.image("forest06", forest06);
    this.load.image("forest07", forest07);
    this.load.image("forest08", forest08);
    this.load.image("forest09", forest09);
    this.load.image("sky10", sky10);

    //Loading exported TiledMap created in Tiled
    this.load.tilemapTiledJSON("map2", lvl2map);

    const {
      ENTER,
      LEFT,
      RIGHT,
      UP,
      SHIFT,
      A,
      D,
      W,
    } = Phaser.Input.Keyboard.KeyCodes;
    this.enterInput = new multiKey(this, [ENTER]);
  }

  create() {
    console.log("creating");
    //enables collision for all indices using -1
    const {
      ENTER,
      LEFT,
      RIGHT,
      UP,
      SHIFT,
      A,
      D,
      W,
      I,
    } = Phaser.Input.Keyboard.KeyCodes;
    this.enterInput = new multiKey(this, [ENTER]);
    this.iInput = new multiKey(this, [I]);

    //set up constants for canvas width and height
    const width = this.scale.width;
    const height = this.scale.height + 200;
    const totalWidth = width * 10;
    console.log(width);
    console.log(height);

    // Setting parallax background
    // This portion is bugged in terms of the Y axis, maybe setScale?
    this.add.image(width * 0.5, height * 0.5, "sky10").setScrollFactor(0);

    // Use createAligned method defined above to allow scrolling
    createAligned(this, totalWidth, "forest09", 0.3);
    createAligned(this, totalWidth, "forest08", 0.35);
    createAligned(this, totalWidth, "forest07", 0.4);
    createAligned(this, totalWidth, "forest06", 0.45);
    createAligned(this, totalWidth, "particles05", 0.5);
    createAligned(this, totalWidth, "forest04", 0.55);
    createAligned(this, totalWidth, "particles03", 0.6);
    createAligned(this, totalWidth, "bushes02", 0.65);
    createAligned(this, totalWidth, "mist01", 0.7);

    var castlemaps = this.make.tilemap({ key: "map2" });
    var tileset = castlemaps.addTilesetImage("btv", "tilessheet");
    var bg = castlemaps.createStaticLayer("castlebkobj", tileset, 0, 0);
    var castlebounds = castlemaps.createStaticLayer(
      "castlebounds",
      tileset,
      0,
      0
    );
    var castleplatforms = castlemaps.createStaticLayer(
      "castleplatforms",
      tileset,
      0,
      0
    );
    castlebounds.setCollisionByProperty({ collides: true });
    castleplatforms.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(castleplatforms);
    this.matter.world.convertTilemapLayer(castlebounds);

    //var door = this.add.image(100,100,)

    console.log("Creating player");
    this.player = new Player(this, 900, 600);
    console.log("Player created");
    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this,
    });
    this.gargoyle = this.matter.add.sprite(1400, 660, "gargoyle");
    this.gargoyle.setScale(-3, 3);
    const dialogue = new Dialogue(demoDialogue, this);
    setTimeout(() => {
      dialogue.startDialogue();
    }, 150);
  }

  onNextScene() {
    this.player.freeze();
    this.scene.start("lvl3");
  }

  onPlayerCollide({ gameObjectB }) {
    if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;
    var tile = gameObjectB;
    var isEnterKeyDown = this.enterInput.isDown();

    // Check the tile property set in Tiled (you could also just check the index if you aren't using
    // Tiled in your game)
    if (tile.properties.isDoor) {
      // Unsubscribe from collision events so that this logic is run only once
      console.log("yes");
      this.unsubscribePlayerCollide();

      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => this.scene.restart());
    }
  }

  update() {
    const pointer = this.input.activePointer;
    const isEnterKeyDown = this.enterInput.isDown();
    if (!this.player.destroyed) {
      // Added 70 offset of Y to show more of the background and less of the ground
      this.cameras.main.startFollow(this.player.sprite, false, 1, 1, 0, 70);
    }
    if (pointer.isDown && !this.inDialogue) {
      const self = this;
      setTimeout(() => {
        self.gargoyle.destroy();
      }, 800);

      const isiKeyDown = this.iInput.isDown();
      if (!this.player.destroyed) {
        this.cameras.main.startFollow(this.player.sprite, false, 1, 1, 0, 70);
      }
    }
    if (isEnterKeyDown) {
      console.log("go to next level");
      this.onNextScene();
    }
  }
}
