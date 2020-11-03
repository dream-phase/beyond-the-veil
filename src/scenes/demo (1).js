/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

//Commit 1: 27 Sep 2020: Initial build of demo

import Phaser from "phaser";
import playersprite from "../assets/player-0.png";
import playerjson from "../assets/player.json";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet.png";
import mt from "../assets/map_tiled.json";
import doorpng from "../assets/door.png";
import heroine from "../assets/heroine01.png";
import Player from "../player.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";
import inventory from "../assets/inventory.png";
import lvl2 from "./lvl2.js";

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super({ key: "demo" });
    //var cursors;
  }

  preload() {
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
    this.load.image("inventory",inventory);

    //Loading exported TiledMap created in Tiled
    this.load.tilemapTiledJSON("map", mt);

    const { ENTER, LEFT, RIGHT, UP, SHIFT, A, D, W, I } = Phaser.Input.Keyboard.KeyCodes;
    this.enterInput = new multiKey(this, [ENTER]);
    this.iInput = new multiKey(this, [ENTER]);
  }

  create() {

    //double check this to make sure it scales w browser

    var maps = this.make.tilemap({ key:"map" });
    var tileset = maps.addTilesetImage("btv", "tilessheet");
    var backgroundImage = this.add.image(0, 0, "sky").setOrigin(0,0);
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
    //var doorLayer = this.matter.add.sprite(1300, 440, "door").setScale(0.8);
    var doortile = maps.createStaticLayer("doortile", tileset, 0, 0);
    doortile.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(doortile);
    //this.matter.world.setBounds(0, 0, sky.widthInPixels-300, sky.heightInPixels-300, true, true, true, true);



    //var door = this.add.image(100,100,)



    this.player = new Player(this, 600, 300);
    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this
    });
    /*this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      objectB: doorLayer.sprite,
      callback: eventData => {
        this.onNextScene();
      }
    });*/
    //this.npc = this.matter.add.sprite(700,200,"heroine");
    //this.npc.setScale(1.5);
    //this.npc.setCollideWorldBounds(true);
    //var heroine = this.load.image(200,200,'heroine');

    //adding door, will make into functioning object later

    this.inventoryContent = [];
    this.inventoryOpen = false;
    this.inventory = this.add.image(this.player.x,this.player.y,"inventory");
    this.inventory.visible = false;


    var doorGroup = this.add.group();
    //maps.createFromObjects('doors','door',doorpng);
    //const door = maps.findObject("Objects", obj => obj.name === "doors");
    //doors = this.matter.add.sprite(door.x, door.y, "actualDoor", null);
    //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  }
  onNextScene(){
    const cam = this.cameras.main;
    cam.fade(250, 0, 0, 0);
    cam.once("camerafadeoutcomplete", () => this.scene.restart());
  }
  onPlayerCollide({ gameObjectB }) {
    if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;
    //console.log("You hit something!",console.log(gameObjectB.properties));
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
      cam.once("camerafadeoutcomplete", () => this.scene.start(Level2));
    }
  }
  //checkOverlap(player, door){
  //  var playerbounds = player.getBounds();
  //  var doorbounds = door.getBounds();
  //  return Phaser.Rectangle.intersects(playerbounds,doorbounds);
  //}
  update() {
    const isEnterKeyDown = this.enterInput.isDown();
    const isiKeyDown = this.iInput.isDown();
    this.cameras.main.startFollow(this.player.sprite);
    if(isEnterKeyDown){
      this.onNextScene();
    }





  }
    //if(this.checkOverlap(this.player.sprite, this.doorLayer)){
    //  onNextScene();
    //}

}