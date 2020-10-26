/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

//Commit 1: 27 Sep 2020: Initial build of demo

// Set up parameters for scrolling bg

/**
 *
 * @param {Phaser.Scene} scene
 * @param {number} totalWidth
 * @param {string} texture
 * @param {number} scrollFactor
 */

// Global method for scrolling background

const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  // Get width of texture to determine how many to repeat
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  // Actual repeat method
  for (let i = 0; i < count; ++i)
  {
    const m = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};

import Phaser from "phaser";
import playersprite from "../assets/player-0.png";
import playerjson from "../assets/player.json";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet.png";
import lvl2map from "../assets/lvl2.json";
import doorpng from "../assets/door.png";
import heroine from "../assets/heroine01.png";

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

import Player from "../player.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";

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

    const { ENTER, LEFT, RIGHT, UP, SHIFT, A, D, W } = Phaser.Input.Keyboard.KeyCodes;
    this.enterInput = new multiKey(this, [ENTER]);
  }

  create() {
    //set up constants for canvas width and height
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10;
    console.log(width);
    console.log(height);

    // Setting parallax background
    this.add.image(width * 0.5, height * 0.5, "sky10")
      .setScrollFactor(0);
    this.add.image(0, height+200, "forest09")
      .setOrigin(0, 1)
      .setScrollFactor(0.3);
    this.add.image(0, height+200, "forest08")
      .setOrigin(0, 1)
      .setScrollFactor(0.35);
    this.add.image(0, height+200, "forest07")
      .setOrigin(0, 1)
      .setScrollFactor(0.4);
    this.add.image(0, height+200, "forest06")
      .setOrigin(0, 1)
      .setScrollFactor(0.45);
    this.add.image(0, height+200, "particles05")
      .setOrigin(0, 1)
      .setScrollFactor(0.5);
    this.add.image(0, height+200, "forest04")
      .setOrigin(0, 1)
      .setScrollFactor(0.55);
    this.add.image(0, height+200, "particles03")
      .setOrigin(0, 1)
      .setScrollFactor(0.6);
    this.add.image(0, height+200, "bushes02")
      .setOrigin(0, 1)
      .setScrollFactor(0.65);
    this.add.image(0, height+200, "mist01")
      .setOrigin(0, 1)
      .setScrollFactor(0.7);


    createAligned(this, totalWidth, "newsky", 0.1);
    createAligned(this, totalWidth, "trees", 0.25);
    createAligned(this, totalWidth, "stars", 0.2);


    var castlemaps = this.make.tilemap({ key:"map2" });
    var tileset = castlemaps.addTilesetImage("btv", "tilessheet");
    //var backgroundImage = this.add.image(0, 0, "sky").setOrigin(0,0);
    var bg = castlemaps.createStaticLayer("castlebkobj", tileset, 0, 0);
    //create platforms and set tile collision
    var castlebounds = castlemaps.createStaticLayer("castlebounds", tileset, 0, 0);
    var castleplatforms = castlemaps.createStaticLayer("castleplatforms", tileset, 0, 0);
    //enables collision for all indices using -1
    castlebounds.setCollisionByProperty({ collides: true });
    castleplatforms.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(castleplatforms);
    this.matter.world.convertTilemapLayer(castlebounds);



    //var door = this.add.image(100,100,)



    this.player = new Player(this, 600, 650);
    this.cameras.main.setBounds(0, 0, castlemaps.widthInPixels, castlemaps.heightInPixels);
    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this
    });
  }

  onNextScene(){
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
    if(!this.player.destroyed){
      this.cameras.main.startFollow(this.player.sprite);
    }


  }
}
