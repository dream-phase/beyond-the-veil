/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

//Commit 1: 27 Sep 2020: Initial build of demo

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

    var castlemaps = this.make.tilemap({ key: "map2" });
    var tileset = castlemaps.addTilesetImage("btv", "tilessheet");
    var backgroundImage = this.add.image(0, 0, "sky").setOrigin(0, 0);
    backgroundImage.setScrollFactor(0);
    var bg = castlemaps.createStaticLayer("castlebkobj", tileset, 0, 0);
    //create platforms and set tile collision
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
    //enables collision for all indices using -1
    castlebounds.setCollisionByProperty({ collides: true });
    castleplatforms.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(castleplatforms);
    this.matter.world.convertTilemapLayer(castlebounds);

    //var door = this.add.image(100,100,)

    console.log("Creating player");
    this.player = new Player(this, 200, 600);
    console.log("Player created");
    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this,
    });
    this.gargoyle = this.matter.add.sprite(600, 660, "gargoyle");
    this.gargoyle.setScale(-3, 3);
    const dialogue = new Dialogue(demoDialogue, this);
    setTimeout(() => {
      dialogue.startDialogue();
    }, 150);
  }

  onNextScene() {}

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
    if (!this.player.destroyed) {
      this.cameras.main.startFollow(this.player.sprite);
    }

    if (pointer.isDown && !this.inDialogue) {
      const self = this;
      setTimeout(() => {
        self.gargoyle.destroy();
      }, 800);
    }
  }
}
