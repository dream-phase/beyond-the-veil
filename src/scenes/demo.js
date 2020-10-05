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
import door from "../assets/door.png";
import heroine from "../assets/heroine01.png";

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
    this.load.image("door", door);
    this.load.image("heroine", heroine);

    //Loading exported TiledMap created in Tiled
    this.load.tilemapTiledJSON("map", mt);
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
    noCol.setCollisionByExclusion(-1, false);
    //create platforms and set tile collision
    var platforms = maps.createStaticLayer("platforms", tileset, 0, 0);
    //enables collision for all indices using -1
    platforms.setCollisionByExclusion(-1, true);
    var water3 = maps.createStaticLayer("water3", tileset, 0, 0);
    var water2 = maps.createStaticLayer("water2", tileset, 0, 0);
    var water = maps.createStaticLayer("water", tileset, 0, 0);
    var windows = maps.createStaticLayer("windows", tileset, 0, 0);
    var supports = maps.createStaticLayer("supports", tileset, 0, 0);

    this.NPCs = this.physics.add.staticGroup();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    this.npc = this.physics.add.sprite(700, 700, "heroine");
    this.npc.setScale(1.5);
    this.npc.body.setGravityY(300);
    this.physics.add.collider(this.npc, platforms);

    //var heroine = this.load.image(200,200,'heroine');

    //adding door, will make into functioning object later

    /*this.door = this.physics.add.group({
      allowGravity = false,
      immovable = true
    });

    this.door = this.createDoors();
    this.physics.add.overlap(this.player, this.door,this.handleOverlap)*/
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.player = this.physics.add.sprite(400, 700, "player1");
    this.player.setBounce(0.2);
    this.player.setScale(2.2);
    this.player.body.setGravityY(300);
    this.player.setFrame("idle/idle-0.png");
    this.physics.add.collider(this.player, platforms);
  }

  update() {
    var scrol_x = this.player.x - this.game.config.width / 2 + 200;
    var scrol_y = this.player.y - this.game.config.height / 2 - 100;
    this.cameras.main.scrollX = scrol_x; ///  scrollX - Х top left point of camera
    this.cameras.main.scrollY = scrol_y;
    this.movePlayerManager();
  }

  movePlayerManager() {
    if (this.inDialogue) {
      this.player.setVelocityX(0);
      this.player.setFrame("idle/idle-0.png");
      return;
    }
    if (this.cursorKeys.left.isDown) {
      if (this.shift.isDown) {
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
          this.player.play("run", true);
        }
      } else {
        this.player.setVelocityX(-100);
        if (this.player.body.onFloor()) {
          this.player.play("walk", true);
        }
      }

      this.player.flipX = true;
    } else if (this.cursorKeys.right.isDown) {
      if (this.shift.isDown) {
        this.player.setVelocityX(300);
        if (this.player.body.onFloor()) {
          this.player.play("run", true);
        }
        this.player.flipX = false;
      } else {
        this.player.setVelocityX(100);
        if (this.player.body.onFloor()) {
          this.player.play("walk", true);
        }
        this.player.flipX = false;
      }
    } else {
      this.player.setVelocityX(0);
      this.player.setFrame("idle/idle-0.png");
    }
    if (
      this.cursorKeys.up.isDown &&
      (this.player.body.onFloor() || this.player.body.touching.down)
    ) {
      this.player.setVelocityY(-250);
      this.player.play("jump", true);
    }
  }
}
