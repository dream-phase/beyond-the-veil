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
import Player from "../player.js";
import sky from "../assets/sky2.png";
import ts from "../assets/tiles/tiles_spritesheet.png";
import lvl4map from "../assets/lvl4.json";
import barrel from "../assets/barrel.png";
import wooden from "../assets/tiles/bridgeLogs.png";

// Parallax assets
import clouds_1 from "../assets/clouds_1.png";
import clouds_2 from "../assets/clouds_2.png";
import clouds_3 from "../assets/clouds_3.png";
import clouds_4 from "../assets/clouds_4.png";
import rocks_1 from "../assets/rocks_1.png";
import rocks_2 from "../assets/rocks_2.png";
import lvl4sky from "../assets/lvl4sky.png";

// Riddle puzzle assets
import cup from "../assets/cup.png";
import dog from "../assets/dog.png";
import time from "../assets/time.png";
import tree from "../assets/tree.png";
import human from "../assets/human.png";
import school from "../assets/school.png";
import puzzle2 from "../scenes/puzzle2.js";

// Riddle puzzle assets
import cup from "../assets/cup.png";
import dog from "../assets/dog.png";
import time from "../assets/time.png";
import tree from "../assets/tree.png";
import human from "../assets/human.png";
import school from "../assets/school.png";

import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";

// Allows us to create scrollable parallax backgrounds through calling a method
const createAligned = (scene, totalWidth, texture, scrollFactor) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; ++i) {
    const m = scene.add
      .image(x, 1000, texture)
      .setOrigin(0, 0)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};

const createRotatingPlatform = (scene, x, y, numTiles = 5) => {
  // Seesaw code borrowed from https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-5-matter-physics-platformer-d14d1f614557
  // A TileSprite is a Sprite whose texture repeats to fill the given width and height. We can use
  // this with an image from our tileset to create a platform composed of tiles:
  //flip the sprite after alpha for better collision
  const platform = scene.add.tileSprite(x, y, 70 * numTiles, 70, "wooden");
  //const platform = scene.add.image(x, y, wooden);
  scene.matter.add.gameObject(platform, {
    restitution: 0, // No bounciness
    frictionAir: 0, // Spin forever without slowing down from air resistance
    friction: 0.2, // A little extra friction so the player sticks better
    // Density sets the mass and inertia based on area - 0.001 is the default. We're going lower
    // here so that the platform tips/rotates easily
    density: 0.005,
  });

  // Alias the native Matter.js API
  const { Constraint } = Phaser.Physics.Matter.Matter;

  // Create a point constraint that pins the center of the platform to a fixed point in space, so
  // it can't move
  const constraint = Constraint.create({
    pointA: { x: platform.x, y: platform.y },
    bodyB: platform.body,
    length: 0,
  });

  // We need to add the constraint to the Matter world to activate it
  scene.matter.world.add(constraint);

  // Give the platform a random initial tilt, as a hint to the player that these platforms rotate
  const sign = Math.random() < 0.5 ? -1 : 1;
  const angle = sign * Phaser.Math.Between(15, 25);
  platform.setAngle(angle);
};

export default class lvl4 extends Phaser.Scene {
  constructor() {
    super({ key: "lvl4" });
    //var cursors;
  }

  preload() {
    this.load.image("tilessheet", ts);
    //this.load.image("sky", sky);
    // Parallax assets
    // Will sort out after ALPHA
    /*this.load.image("mist01", mist01);
    this.load.image("bushes02", bushes02);
    this.load.image("particles03", particles03);
    this.load.image("forest04", forest04);
    this.load.image("particles05", particles05);
    this.load.image("forest06", forest06);
    this.load.image("forest07", forest07);
    this.load.image("forest08", forest08);
    this.load.image("forest09", forest09);*/
    this.load.image("sky10", sky10);
    this.load.image("barrel", barrel);
    this.load.image("wooden", wooden);
    this.load.image("dog", dog);
    this.load.image("cup", cup);
    this.load.image("time", time);
    this.load.image("tree", tree);
    this.load.image("human", human);
    this.load.image("school", school);

    this.pointer = this.input.activePointer;

    //Loading exported TiledMap created in Tiled
    this.load.tilemapTiledJSON("map3", lvl4map);

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
    // get this to work after alpha to climb rope
    //this.jumpInput = new multiKey(scene, [UP, W]);
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
    const height = this.scale.height;
    const totalWidth = width * 21;
    console.log(width);
    console.log(height);

    // Setting parallax background
    // This portion is bugged in terms of the Y axis, maybe setScale?
    this.add.image(width * 0.5, height * 0.5, "sky10").setScrollFactor(0);

    // Use createAligned method defined above to allow scrolling
    /*createAligned(this, totalWidth, "forest09", 0.3);
    createAligned(this, totalWidth, "forest08", 0.35);
    createAligned(this, totalWidth, "forest07", 0.4);
    createAligned(this, totalWidth, "forest06", 0.45);
    createAligned(this, totalWidth, "particles05", 0.5);
    createAligned(this, totalWidth, "forest04", 0.55);
    createAligned(this, totalWidth, "particles03", 0.6);
    createAligned(this, totalWidth, "bushes02", 0.65);
    createAligned(this, totalWidth, "mist01", 0.7);*/

    var castlemaps = this.make.tilemap({ key: "map3" });
    // Switched to extruded tilesheet to avoid tile pixel bleeding
    var tileset = castlemaps.addTilesetImage("btv", "tilessheet", 70, 70, 1, 2);
    var bg = castlemaps.createStaticLayer("lvl4bkobj", tileset, 0, 0);
    var castlebounds = castlemaps.createStaticLayer(
      "lvl4bounds",
      tileset,
      0,
      0
    );
    var castleplatforms = castlemaps.createStaticLayer(
      "lvl4platforms",
      tileset,
      0,
      0
    );
    var changers = castlemaps.createStaticLayer("changers", tileset, 0, 0);
    var ropes = castlemaps.createStaticLayer("ropes", tileset, 0, 0);

    // create the rotating seesaws
    castlemaps.getObjectLayer("seesaws").objects.forEach((point) => {
      createRotatingPlatform(this, point.x, point.y);
    });

    changers.setCollisionByProperty({ collides: true });
    ropes.setCollisionByProperty({ collides: true });
    castlebounds.setCollisionByProperty({ collides: true });
    castleplatforms.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(changers);
    this.matter.world.convertTilemapLayer(castleplatforms);
    this.matter.world.convertTilemapLayer(ropes);
    this.matter.world.convertTilemapLayer(castlebounds);
    this.barrel = this.matter.add.image(660, 3500, "barrel", null);
    this.barrel.setScale(1.5);

    // Add player to scene and set camera bounds
    this.player = new Player(this, 182 * 70, 16 * 70);

    // setting up variable for last barrel placed
    var prevbarrel;
    var loops = 0;
    // timer for the barrel hill, new barrel will spawn every 5.5 seconds
    // AFTER ALPHA TASK: figure out callback function on the tween to
    // allow for faster barrel spawns
    var timer = this.time.addEvent({
      delay: 5500,
      callback: function () {
        this.barrel = this.matter.add.image(100 * 70, 10 * 70, "barrel", null, {
          restitution: 0.5,
          frictionStatic: 0.3,
          friction: 0.3,
          frictionAir: 0.005,
        }); //4000
        this.barrel.setCircle();
        this.barrel.setScale(1.5);
        //this.barrel.setBounce(0.01);
        this.barrel.setDensity(0.1);
        // set the angle the barrel is pointing at to the negative x direction
        this.barrel.setAngle(180);
        this.matterCollision.addOnCollideStart({
          objectA: this.player.sensors.top,
          objectB: this.barrel,
          callback: (eventData) => {
            // these constants are passed from the event to our callback method
            // bodies are the actual matter bodies and gameobjects are part of phaser
            const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
          },
        });

        var fadebarrel = this.tweens.add(
          {
            targets: this.barrel,
            delay: 5000,
            alpha: 0,
            duration: 1000,
            ease: "Power2",
          },
          this
        );
        if (prevbarrel) {
          if (prevbarrel.alpha >= 0.05) {
            prevbarrel.destroy();
          }
        }
        prevbarrel = this.barrel;
        loops++;
        // set the angular velocity equal to -0.2 so force is applied in negative x direction
        //this.barrel.setAngularVelocity(-2);
        //this.barrel.applyForceFromAngle(0.2, 180);
      },
      callbackScope: this,
      loop: true,
    });

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

    // set up array and dictionaries for puzzle images
    // add text for puzzle
    this.add.text(40 * 70, 54 * 70, "Careful of the falling waste, traveler!", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      color: "#000",
      fontSize: "22px",
    });
    this.add.text(
      177 * 70,
      14 * 70,
      "To pass this level for free, you must answer these riddles three:\n\n1) There is a house. One enters it blind and comes out seeing. What is it?\n\n2) What goes on four legs in the morning, on two legs at noon,\nand on three legs in the evening?\n\n3) This thing all things devours; Birds, beasts, trees, flowers; Gnaws iron, bites steel;\nGrinds hard stones to meal; Slays king, ruins town, And beats mountain down.\n\nHit the boxes to select your answer.",
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        color: "#000",
        fontSize: "18px",
      }
    );
    var puzzpics = ["cup", "dog", "time", "tree", "human", "school"];
    var currentItem = "cup";
    var currentItem2 = "cup";
    var currentItem3 = "cup";
    this.image1 = this.add.image(187 * 70 + 20, 14 * 70, "cup", null);
    this.image1.setScale(0.5);
    this.image2 = this.add.image(191 * 70 + 20, 14 * 70, "cup", null);
    this.image2.setScale(0.5);
    this.image3 = this.add.image(195 * 70 + 20, 14 * 70, "cup", null);
    this.image3.setScale(0.5);
    console.log(this.image1);

    this.matterCollision.addOnCollideStart({
      objectA: this.player.sensors.top,
      callback: (eventData) => {
        // these constants are passed from the event to our callback method
        // bodies are the actual matter bodies and gameobjects are part of phaser
        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
        if (typeof gameObjectB === "undefined" || gameObjectB === null) return;
        if (
          typeof gameObjectB.layer === "undefined" ||
          gameObjectB.layer === null
        )
          return;
        if (gameObjectB.layer.name == "changers" && gameObjectB.x == 187) {
          const currentIndex = puzzpics.indexOf(currentItem);
          const nextIndex = (currentIndex + 1) % puzzpics.length;
          currentItem = puzzpics[nextIndex];
          this.image1.setTexture(currentItem);
          //console.log(currentIndex, nextIndex, currentItem);
        }
        if (gameObjectB.layer.name == "changers" && gameObjectB.x == 191) {
          const currentIndex2 = puzzpics.indexOf(currentItem2);
          const nextIndex2 = (currentIndex2 + 1) % puzzpics.length;
          currentItem2 = puzzpics[nextIndex2];
          this.image2.setTexture(currentItem2);
          //console.log(currentIndex2, nextIndex2, currentItem2);
        }
        if (gameObjectB.layer.name == "changers" && gameObjectB.x == 195) {
          const currentIndex3 = puzzpics.indexOf(currentItem3);
          const nextIndex3 = (currentIndex3 + 1) % puzzpics.length;
          currentItem3 = puzzpics[nextIndex3];
          this.image3.setTexture(currentItem3);
          //console.log(currentIndex3, nextIndex3, currentItem3);
        }
      },

      //console.log(gameObjectB.layer, gameObjectB.x);
    });

    // set up array and dictionaries for puzzle images
    // add text for puzzle
    this.add.text(40 * 70, 54 * 70, "Careful of the falling waste, traveler!", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      color: "#000",
      fontSize: "22px",
    });
    this.add.text(
      177 * 70,
      14 * 70,
      "To pass this level for free, you must answer these riddles three:\n\n1) There is a house. One enters it blind and comes out seeing. What is it?\n\n2) What goes on four legs in the morning, on two legs at noon,\nand on three legs in the evening?\n\n3) This thing all things devours; Birds, beasts, trees, flowers; Gnaws iron, bites steel;\nGrinds hard stones to meal; Slays king, ruins town, And beats mountain down.\n\nHit the boxes to select your answer.",
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        color: "#000",
        fontSize: "18px",
      }
    );
    var puzzpics = ["cup", "dog", "time", "tree", "human", "school"];
    var currentItem = "cup";
    var currentItem2 = "cup";
    var currentItem3 = "cup";
    this.image1 = this.add.image(187 * 70 + 20, 14 * 70, "cup", null);
    this.image1.setScale(0.5);
    this.image2 = this.add.image(191 * 70 + 20, 14 * 70, "cup", null);
    this.image2.setScale(0.5);
    this.image3 = this.add.image(195 * 70 + 20, 14 * 70, "cup", null);
    this.image3.setScale(0.5);

    this.matterCollision.addOnCollideStart({
      objectA: this.player.sensors.top,
      callback: (eventData) => {
        // these constants are passed from the event to our callback method
        // bodies are the actual matter bodies and gameobjects are part of phaser
        //fix this shit
        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
        if (gameObjectB.layer.name == "changers" && gameObjectB.x == 187) {
          const currentIndex = puzzpics.indexOf(currentItem);
          const nextIndex = (currentIndex + 1) % puzzpics.length;
          currentItem = puzzpics[nextIndex];
          this.image1.setTexture(currentItem);
          //console.log(currentIndex, nextIndex, currentItem);
        }
        if (gameObjectB.layer.name == "changers" && gameObjectB.x == 191) {
          const currentIndex2 = puzzpics.indexOf(currentItem2);
          const nextIndex2 = (currentIndex2 + 1) % puzzpics.length;
          currentItem2 = puzzpics[nextIndex2];
          this.image2.setTexture(currentItem2);
          //console.log(currentIndex2, nextIndex2, currentItem2);
        }
        if (gameObjectB.layer.name == "changers" && gameObjectB.x == 195) {
          const currentIndex3 = puzzpics.indexOf(currentItem3);
          const nextIndex3 = (currentIndex3 + 1) % puzzpics.length;
          currentItem3 = puzzpics[nextIndex3];
          this.image3.setTexture(currentItem3);
          //console.log(currentIndex3, nextIndex3, currentItem3);
        }
      },
      //console.log(gameObjectB.layer, gameObjectB.x);
    });
  }

  onNextScene() {
    this.player.freeze();
    this.scene.start("puzzle2");
  }

  onPlayerCollide({ gameObjectB }) {
    if (!gameObjectB || !(gameObjectB instanceof Phaser.Tilemaps.Tile)) return;
    if (!this) return;
    var tile = gameObjectB;
    //var isEnterKeyDown = this.jumpInput.isDown();

    // Check the tile property set in Tiled (you could also just check the index if you aren't using
    // Tiled in your game)
    if (tile.layer.name == "ropes") {
      this.player.sprite.setVelocityY(-15);
      this.player.sprite.setVelocityX(-2);
    }
    if (tile.properties.isDoor) {
      // Unsubscribe from collision events so that this logic is run only once
      console.log("yes");

      this.player.freeze();
      const cam = this.cameras.main;
      cam.fadeOut(500, 0, 0, 0);
      console.log(cam.isTinted);
      cam.once("camerafadeoutcomplete", () => {
        cam.fadeIn(500, 0, 0, 0);
        this.player.sprite.setPosition(107 * 70, 10 * 70 + 40);
      });
      cam.once("camerafadeincomplete", () => {
        this.player.unfreeze();
      });
    }
  }
  //after alpha play with camera zoom for riddle section
  update() {
    const pointer = this.input.activePointer;
    const isEnterKeyDown = this.enterInput.isDown();
    if (!this.player.destroyed) {
      // Added 70 offset of Y to show more of the background and less of the ground
      this.cameras.main.startFollow(this.player.sprite, false, 1, 1, 0, 70);
    }

    if (pointer.isDown) {
      console.log(this.player.sprite.x, this.player.sprite.y);
    }
    if (
      this.image1.texture.key == "school" &&
      this.image2.texture.key == "human" &&
      this.image3.texture.key == "time"
    ) {
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => this.onNextScene());
    }
  }
}
