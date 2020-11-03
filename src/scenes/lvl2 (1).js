/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

//Commit 1: 27 Sep 2020: Initial build of demo

import Phaser from "phaser";
import playersprite from "../assets/player-0.png";
import playerjson from "../assets/player.json";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet.png";
import lvl2map from "../assets/lvl2.json";
import doorpng from "../assets/door.png";
import heroine from "../assets/heroine01.png";
import Player from "../player.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";

export default class lvl2 extends Phaser.Scene {
  constructor() {
    super({ key: "lvl2" });
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

    //Loading exported TiledMap created in Tiled
    this.load.tilemapTiledJSON("lvl2map", mt);

    const { ENTER, LEFT, RIGHT, UP, SHIFT, A, D, W } = Phaser.Input.Keyboard.KeyCodes;
    this.enterInput = new multiKey(this, [ENTER]);
  }

  create() {

    //double check this to make sure it scales w browser

    var maps = this.make.tilemap({ key:"map" });
    var tileset = maps.addTilesetImage("btv", "tilessheet");
    var backgroundImage = this.add.image(0, 0, "sky").setOrigin(0,0);
    var bg = maps.createStaticLayer("castlebkobj", tileset, 0, 0);
    //noCol.setCollisionByProperty({ collides: false});
    //create platforms and set tile collision
    var bounds = maps.createStaticLayer("bounds", tileset, 0, 0);
    var platforms = maps.createStaticLayer("platforms", tileset, 0, 0);
    //enables collision for all indices using -1
    bounds.setCollisionByProperty({ collides: true });
    platforms.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(platforms);
    this.matter.world.convertTilemapLayer(bounds);
    var water3 = maps.createStaticLayer("torch", tileset, 0, 0);
    var water2 = maps.createStaticLayer("columns", tileset, 0, 0);
    //this.matter.world.setBounds(0, 0, sky.widthInPixels-300, sky.heightInPixels-300, true, true, true, true);



    //var door = this.add.image(100,100,)



    this.player = new Player(this, 600, 300);
    this.unsubscribePlayerCollide = this.matterCollision.addOnCollideStart({
      objectA: this.player.sprite,
      callback: this.onPlayerCollide,
      context: this
    });

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
    for (var ol in maps.objects) {
    	// Loop over each object in the object layer
    	for (var o in maps.objects[ol]) {
    		var object = maps.objects[ol][o];

    		console.log(object);
      }
    }



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
    console.log("You hit something!",console.log(gameObjectB.properties));
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
    this.cameras.main.startFollow(this.player.sprite);

  }
}
