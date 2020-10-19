/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

//Commit 1: 27 Sep 2020: Initial build of demo

import Phaser from "phaser";
import wonderland from "../assets/sounds/alexander-nakarada-wonderland.mp3";
import Dialogue from "../dialogue";
import demoDialogue from "../dialogues/demoDialogue.json";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet.png";
import mt from "../assets/map_tiled.json";
import heroine from "../assets/heroine01.png";
import doorpng from "../assets/door.png";
import Player from "../player.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super({ key: "demo" });
    //var cursors;
  }

  preload() {
    this.load.audio("wonderland", wonderland);
    //just a test sprite for now
    //this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    //load sky
    //Load player json/atlas for animations
    //this.load.atlas('player', playerjson);
    //Loading the spritesheet for tiles
    /*this.load.onLoadStart.add(loadStart, this);
    this.load.onFileComplete.add(fileComplete, this);
    this.load.onLoadComplete.add(loadComplete, this);*/
    this.load.image("tilessheet", ts);
    this.load.image("sky", sky);
    this.load.image("door", doorpng);
    this.load.image("heroine", heroine);

    //Loading exported TiledMap created in Tiled
    this.load.tilemapTiledJSON("map", mt);
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
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    this.music = this.sound.add("wonderland");
    this.music.loop = true;
    this.music.play();
    var conversation = new Dialogue(demoDialogue, this);
    setTimeout(() => {
      conversation.startDialogue();
    }, 4000);
    //double check this to make sure it scales w browser
    var maps = this.make.tilemap({ key: "map" });
    var tileset = maps.addTilesetImage("btv", "tilessheet");
    var backgroundImage = this.add
      .image(0, 0, "sky")
      .setOrigin(0, 0)
      .setScrollFactor(0);
    var bg = maps.createStaticLayer("bg", tileset, 0, 0);

    var noCol = maps.createStaticLayer("noCol", tileset, 0, 0);
    //noCol.setCollisionByProperty({ collides: false});
    //create platforms and set tile collision
    var bounds = maps.createStaticLayer("bounds", tileset, 0, 0);
    var platforms = maps.createStaticLayer("platforms", tileset, 0, 0);
    //enables collision for all indices using -1
    bounds.setCollisionByProperty({ collides: true });
    platforms.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(platforms);
    this.matter.world.convertTilemapLayer(bounds);
    var water3 = maps.createStaticLayer("water3", tileset, 0, 0);
    var water2 = maps.createStaticLayer("water2", tileset, 0, 0);
    var water = maps.createStaticLayer("water", tileset, 0, 0);
    var windows = maps.createStaticLayer("windows", tileset, 0, 0);
    var supports = maps.createStaticLayer("supports", tileset, 0, 0);
    var doorLayer = maps.getObjectLayer("doors");
    //this.matter.world.setBounds(0, 0, sky.widthInPixels-300, sky.heightInPixels-300, true, true, true, true);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    // this.npc = this.matter.add.sprite(700, 700, "heroine");
    // this.npc.setScale(1.5);
    // this.npc.body.setGravityY(300);
    // this.physics.add.collider(this.npc, platforms);

    var door = this.add.image(100, 100);

    this.player = new Player(this, 600, 300);
    const self = this;
    setTimeout(() => {
      self.unsubscribePlayerCollide = self.matterCollision.addOnCollideStart({
        objectA: this.player.sprite,
        callback: this.onPlayerCollide,
        context: this,
      });
    }, 400);

    //this.npc = this.matter.add.sprite(700,200,"heroine");
    //this.npc.setScale(1.5);
    //this.npc.setCollideWorldBounds(true);
    //var heroine = this.load.image(200,200,'heroine');

    //adding door, will make into functioning object later

    /*this.door = this.physics.add.group({
      allowGravity = false,
      immovable = true
    });*/
    //not functioning correctly
    var doorGroup = this.add.group();
    maps.createFromObjects("doors", "door", doorpng);
    //const door = maps.findObject("Objects", obj => obj.name === "doors");
    //doors = this.matter.add.sprite(door.x, door.y, "actualDoor", null);
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  onPlayerCollide({ gameObjectB }) {
    if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;

    const tile = gameObjectB;
    const isEnterKeyDown = this.enterInput.isDown();

    // Check the tile property set in Tiled (you could also just check the index if you aren't using
    // Tiled in your game)
    if (tile.properties.isDoor && this.player.enterInput) {
      // Unsubscribe from collision events so that this logic is run only once
      this.unsubscribePlayerCollide();

      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => this.scene.restart());
    }
  }

  update() {
    this.cameras.main.startFollow(this.player.sprite);
  }
}
