/*jshint esversion: 6 */

import Phaser from "phaser";
import sky from "../assets/sky2.png";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";
import blueOrb from "../assets/orb_blue.png";
import greenOrb from "../assets/orb_green.png";
import redOrb from "../assets/orb_red.png";
import brickWall from "../assets/tiles/brickWall.png";

export default class lvl3 extends Phaser.Scene {
  constructor() {
    super({ key: "lvl3" });
    //var cursors;
  }

  preload() {
    this.load.image("sky", sky);
    this.load.image("blueOrb", blueOrb);
    this.load.image("greenOrb", greenOrb);
    this.load.image("redOrb", redOrb);
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
    this.add.image(0, 0, "sky");
    this.matter.world.setBounds(0, 0, 944, 544, 70, true, true, true, true);
    var blue = this.matter.add.image(400, 300, "blueOrb");
    var blue2 = this.matter.add.image(450, 300, "blueOrb");
    var blue3 = this.matter.add.image(120, 300, "blueOrb");
    var blue4 = this.matter.add.image(300, 300, "blueOrb");
    var blue5 = this.matter.add.image(450, 300, "blueOrb");
    var red = this.matter.add.image(220, 300, "redOrb");
    var red2 = this.matter.add.image(440, 300, "redOrb");
    var red3 = this.matter.add.image(100, 300, "redOrb");
    var red4 = this.matter.add.image(300, 300, "redOrb");
    var red5 = this.matter.add.image(380, 300, "redOrb");
    var green = this.matter.add.image(110, 300, "greenOrb");
    var green2 = this.matter.add.image(220, 300, "greenOrb");
    var green3 = this.matter.add.image(370, 300, "greenOrb");
    var green4 = this.matter.add.image(420, 300, "greenOrb");
    var green5 = this.matter.add.image(430, 300, "greenOrb");

    // x, y, image, null, inertia: Infinity will ensure that block loses no velocity on bounce

    this.wallRed = this.matter.add
      .image(100, 100, "brickWall", null, { inertia: Infinity })
      .setFriction(0, 0, 0)
      .setBounce(1)
      .setIgnoreGravity(true)
      .setTint(0xff0000);
    this.wallGreen = this.matter.add
      .image(100, 100, "brickWall", null, { inertia: Infinity })
      .setFriction(0, 0, 0)
      .setBounce(1)
      .setIgnoreGravity(true)
      .setTint(0x00ff00);
    this.wallBlue = this.matter.add
      .image(100, 100, "brickWall", null, { inertia: Infinity })
      .setFriction(0, 0, 0)
      .setBounce(1)
      .setIgnoreGravity(true)
      .setTint(0x0000ff);

    this.wallRed.setVelocityX(5);
    this.wallGreen.setVelocityX(6);
    this.wallBlue.setVelocityX(3);

    blue.setCircle();
    blue.setBounce(0.8);
    blue.setFriction(0.05);
    blue2.setCircle();
    blue2.setBounce(0.8);
    blue2.setFriction(0.05);
    blue3.setCircle();
    blue3.setBounce(0.8);
    blue3.setFriction(0.05);
    blue4.setCircle();
    blue4.setBounce(0.8);
    blue4.setFriction(0.05);
    blue5.setCircle();
    blue5.setBounce(0.8);
    blue5.setFriction(0.05);

    red.setCircle();
    red.setBounce(0.8);
    red.setFriction(0.05);
    red2.setCircle();
    red2.setBounce(0.8);
    red2.setFriction(0.05);
    red3.setCircle();
    red3.setBounce(0.8);
    red3.setFriction(0.05);
    red4.setCircle();
    red4.setBounce(0.8);
    red4.setFriction(0.05);
    red5.setCircle();
    red5.setBounce(0.8);
    red5.setFriction(0.05);

    green.setCircle();
    green.setBounce(0.8);
    green.setFriction(0.05);
    green2.setCircle();
    green2.setBounce(0.8);
    green2.setFriction(0.05);
    green3.setCircle();
    green3.setBounce(0.8);
    green3.setFriction(0.05);
    green4.setCircle();
    green4.setBounce(0.8);
    green4.setFriction(0.05);
    green5.setCircle();
    green5.setBounce(0.8);
    green5.setFriction(0.05);

    this.matter.add.mouseSpring({ length: 1, stiffness: 0.6 });
    // Collisions
    var col1 = this.matter.world.nextCategory();
    this.wallRed.setCollisionGroup(-1);

    var col2 = this.matter.world.nextCategory();
    this.wallGreen.setCollisionGroup(-1);
    var col3 = this.matter.world.nextCategory();
    var col4 = this.matter.world.nextCategory();
    var col5 = this.matter.world.nextCategory();
    var col6 = this.matter.world.nextCategory();
    this.wallBlue.setCollisionGroup(-1);
    /*this.wallRed.setCollisionCategory(col1);
    this.wallBlue.setCollisionCategory(col2);
    this.wallGreen.setCollisionCategory(col3);
    this.wallRed.setCollidesWith([col4]);
    this.wallGreen.setCollidesWith([col5]);
    this.wallBlue.setCollidesWith([col6]);*/

    /*this.matter.world.on('collisionstart', function (event){
      console.log(event.pairs[0]);
    });
    */
    //wallRed.setCollidesWith();
    //wallGreen.setCollidesWith();
    //wallBlue.setCollidesWith();
  }

  onNextScene() {}

  update() {
    /*if(this.wall1.body.position.x >= 900){
      this.wall1.setVelocityX(-5);
    }
    if(this.wall1.body.position.x <= 60)
    {
      this.wall1.setVelocityX(5);
    }*/
    //this.wall1.setVelocityX(25);
  }
}
