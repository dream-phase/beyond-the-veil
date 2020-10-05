/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

//Commit 1: 27 Sep 2020: Initial build of demo

import Phaser from "phaser";
import playersprite from "../assets/player-0.png";
import playerjson from "../assets/player.json";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet.png";
import mt from "../assets/map_tiled.json";

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

    //Loading exported TiledMap created in Tiled
    this.load.tilemapTiledJSON("map", mt);


  }

  create() {
    //double check this to make sure it scales w browser
    var maps = this.make.tilemap({ key:"map" });
    var tileset = maps.addTilesetImage("btv", "tilessheet");
    var backgroundImage = this.add.image(0, 0, "sky").setOrigin(0,0);
    var bg = maps.createStaticLayer("bg", tileset, 0, 0);
    var noCol = maps.createStaticLayer("noCol", tileset, 0, 0);
    var CastleCol = maps.createStaticLayer("CastleCol", tileset, 0, 0);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    window.alert("test");
/*



    //following are the layer names I made in the Tiled program, exact data located in map_tiled.json in assets

    //const CastleNoCol = maps.createStaticLayer('CastleNoCol', tileset, 0, 0); //col stands for collision
    const noCol = maps.createStaticLayer('noCol', tileset, 0, 200);
    //const Cacti = maps.createStaticLayer('Cacti', tileset, 0, 0);
    const CastleCol = maps.createStaticLayer('CastleCol', tileset, 0, 200);
    const WatahFade = maps.createStaticLayer('WatahFade', tileset, 0, 200);
    const Watah = maps.createStaticLayer('Watah', tileset, 0, 200);
    const Supports = maps.createStaticLayer('Supports', tileset, 0, 200);
    const WatahFade2 = maps.createStaticLayer('WatahFade2', tileset, 0, 200);*/

  }
  update() {
    /*
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-430);
    }*/
  }
}
