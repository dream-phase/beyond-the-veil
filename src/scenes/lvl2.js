import Phaser from "phaser";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet_extruded.png";
import lvl2map from "../assets/lvl2.json";
import doorpng from "../assets/door.png";
import heroine from "../assets/heroine01.png";
// temporary holding spot
import puzzle2 from "./puzzle2.js";
import puzzle3 from "./puzzle3.js";
import Player from "../player.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";
import Dialogue from "../dialogue";
import demoDialogue from "../dialogues/demoDialogue.json";
// Parallax assets
import mist01 from "../assets/01_Mist.png";
import roar from "../assets/sounds/roar.mp3";
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
    this.load.audio("roar", roar);

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
      I,
    } = Phaser.Input.Keyboard.KeyCodes;
    this.enterInput = new multiKey(this, [ENTER]);
    this.iInput = new multiKey(this, [I]);
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

    this.roar = this.sound.add("roar");
    // Setting parallax background
    this.add.image(width * 0.5, height * 0.5, "sky10").setScrollFactor(0);
    this.add
      .image(0, height + 200, "forest09")
      .setOrigin(0, 1)
      .setScrollFactor(0.3);
    this.add
      .image(0, height + 200, "forest08")
      .setOrigin(0, 1)
      .setScrollFactor(0.35);
    this.add
      .image(0, height + 200, "forest07")
      .setOrigin(0, 1)
      .setScrollFactor(0.4);
    this.add
      .image(0, height + 200, "forest06")
      .setOrigin(0, 1)
      .setScrollFactor(0.45);
    this.add
      .image(0, height + 200, "particles05")
      .setOrigin(0, 1)
      .setScrollFactor(0.5);
    this.add
      .image(0, height + 200, "forest04")
      .setOrigin(0, 1)
      .setScrollFactor(0.55);
    this.add
      .image(0, height + 200, "particles03")
      .setOrigin(0, 1)
      .setScrollFactor(0.6);
    this.add
      .image(0, height + 200, "bushes02")
      .setOrigin(0, 1)
      .setScrollFactor(0.65);
    this.add
      .image(0, height + 200, "mist01")
      .setOrigin(0, 1)
      .setScrollFactor(0.7);

    createAligned(this, totalWidth, "newsky", 0.1);
    createAligned(this, totalWidth, "trees", 0.25);
    createAligned(this, totalWidth, "stars", 0.2);

    var castlemaps = this.make.tilemap({ key: "map2" });
    var tileset = castlemaps.addTilesetImage("btv", "tilessheet", 70, 70, 1, 2);
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

    this.player = new Player(this, 200, 650);
    this.cameras.main.setBounds(
      0,
      0,
      castlemaps.widthInPixels,
      castlemaps.heightInPixels
    );
    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this,
    });
    this.gargoyle = this.matter.add.sprite(700, 660, "gargoyle");
    this.gargoyle.setScale(-3, 3);
    this.killedGargoyle = false;
    const dialogue = new Dialogue(demoDialogue, this, () => {
      this.killedGargoyle = true;
    });
    setTimeout(() => {
      dialogue.startDialogue();
    }, 150);
    this.sound.add("whoosh", { volume: 0.3 }).play();
  }

  onNextScene() {
    this.player.freeze();
    this.scene.start("lvl4");
    //this.scene.start("puzzle3");
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
        self.roar.play();
        setTimeout(() => {
          self.onNextScene();
        }, 2000);
      }, 800);

      const isiKeyDown = this.iInput.isDown();
      if (!this.player.destroyed) {
        this.cameras.main.startFollow(this.player.sprite, false, 1, 1, 0, 70);
      }
    }
    if (isEnterKeyDown && this.killedGargoyle) {
      console.log("go to next level");
      this.onNextScene();
    }
  }
}
