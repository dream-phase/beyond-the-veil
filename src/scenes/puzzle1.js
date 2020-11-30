import Phaser from "phaser";
import lvl3sky from "../assets/sky.png";
import MouseConstraint from "matter-js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import multiKey from "../multiKey.js";
import blueOrb from "../assets/orb_blue.png";
import greenOrb from "../assets/orb_green.png";
import redOrb from "../assets/orb_red.png";
import brickWall from "../assets/tiles/brickWall.png";
import crystalGreen from "../assets/crystal_green.png";
import crystalRed from "../assets/crystal_red.png";
import chime from "../assets/sounds/chime.mp3";
import crystalBlue from "../assets/crystal_blue.png";
import lvl4 from "./lvl4.js";
import demo from "./demo.js";

export default class Puzzle1 extends Phaser.Scene {
  constructor() {
    super({ key: "Puzzle1" });
    //var cursors;
  }

  preload() {
    this.load.image("lvl3sky", lvl3sky);
    this.load.image("blueOrb", blueOrb);
    this.load.image("greenOrb", greenOrb);
    this.load.image("brickWall", brickWall);
    this.load.image("crystalRed", crystalRed);
    this.load.image("crystalBlue", crystalBlue);
    this.load.image("crystalGreen", crystalGreen);
    this.load.audio("chime", chime);

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
    this.pointer = this.input.activePointer;
  }

  create() {
    this.chime = this.sound.add("chime", { volume: 0.3 });
    this.playerScore = 0;
    //this.add.image(0, 0, "lvl3sky").setOrigin(0, 0);
    // No walls so balls will fly infinitely
    this.matter.world.setBounds(
      0,
      0,
      1144,
      544,
      70,
      false,
      false,
      false,
      false
    );
    this.red4 = this.matter.add.image(600, 350, "redOrb", null, {
      label: "redOrb",
    });

    this.add.image(0, 0, "sky").setOrigin(0, 0);
    // No walls so balls will fly infinitely
    this.matter.world.setBounds(0, 0, 944, 544, 70, false, false, false, false);
    var blue = this.matter.add.image(400, 300, "blueOrb");
    var blue2 = this.matter.add.image(450, 300, "blueOrb");
    var blue3 = this.matter.add.image(120, 300, "blueOrb");
    var blue4 = this.matter.add.image(300, 300, "blueOrb");
    var blue5 = this.matter.add.image(450, 300, "blueOrb");
    var red = this.matter.add.image(220, 300, "redOrb");
    var red2 = this.matter.add.image(440, 300, "redOrb");
    var red3 = this.matter.add.image(100, 300, "redOrb");
    this.red4 = this.matter.add.image(500, 350, "redOrb", null, {
      label: "redOrb",
    });
    var red5 = this.matter.add.image(380, 300, "redOrb");
    var green = this.matter.add.image(110, 300, "greenOrb");
    var green2 = this.matter.add.image(220, 300, "greenOrb");
    var green3 = this.matter.add.image(370, 300, "greenOrb");
    var green4 = this.matter.add.image(420, 300, "greenOrb");
    var green5 = this.matter.add.image(430, 300, "greenOrb");

    // x, y, image, null, inertia: Infinity will ensure that block loses no velocity on bounce
    // Don't want player to move scoreboxes "walls" so ignorePointer
    // Sensor allows the blocks not to interact with the matter-js physics, but it will still detect collisions
    this.wallRed = this.matter.add
      .image(100, 100, "crystalRed", null, {
        label: "brickWallRed",
        inertia: Infinity,
        ignorePointer: true,
      })
      .setFriction(0, 0, 0)
      .setBounce(1)
      .setIgnoreGravity(true)
      .setSensor(true)
      .setAngularVelocity(0.1);
    this.wallGreen = this.matter.add
      .image(100, 100, "crystalGreen", null, {
        label: "brickWallGreen",
        inertia: Infinity,
        ignorePointer: true,
      })
      .setFriction(0, 0, 0)
      .setBounce(1)
      .setIgnoreGravity(true)
      .setSensor(true)
      .setAngularVelocity(-0.1);
    this.wallBlue = this.matter.add
      .image(100, 100, "crystalBlue", null, {
        label: "brickWallBlue",
        inertia: Infinity,
        ignorePointer: true,
      })
      .setFriction(0, 0, 0)
      .setBounce(1)
      .setIgnoreGravity(true)
      .setSensor(true)
      .setAngularVelocity(0.05);

    this.wallRed.setVelocityX(5);
    this.wallGreen.setVelocityX(6);
    this.wallBlue.setVelocityX(3);

    this.red4.setCircle();
    this.red4.setBounce(0.8);
    this.red4.setFriction(0.05);

    // Mouse control
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
    this.red4.setCircle();
    this.red4.setBounce(0.8);
    this.red4.setFriction(0.05);

    // Mouse control
    // Look at initial speed
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

    // Begin start of "slingshot" code
    // Pseudo anchor (I create a rectangle that won't be displayed) to anchor the ball to a specific x,y position
    // Remember that adding to the game (Phaser) is not the same as adding a matter-js object
    let anchor = this.add.rectangle(600, 350, 1, 1, 0xff0000, 1);

    // Updated to correctly use a constraint instead of pseudo constraint
    this.secondConstraint = Phaser.Physics.Matter.Matter.Constraint.create({
      pointA: { x: 600, y: 350 },
      bodyB: this.red4.body,
      length: 0,
      stiffness: 0.05,
    });

    this.matter.world.add(this.secondConstraint);

    // Add score text
    this.scoreText = this.add.text(0, 550, this.playerScore + "/12 Orbs", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22px",
    });

    // Collision detection using PhaserMatterCollisionPlugin
    // Will only detect our first orb, other collision detection will be in the update method
    this.matterCollision.addOnCollideStart({
      objectA: this.red4,
      objectB: this.wallRed,
      callback: (eventData) => {
        // these constants are passed from the event to our callback method
        // bodies are the actual matter bodies and gameobjects are part of phaser
        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
        gameObjectA.setVisible(false);
        this.playerScore++;
        this.chime.play();
        this.scoreText.setText(this.playerScore + "/12 Orbs");
      },
    });
  }

  onNextScene() {
    this.scene.start("demo");
  }

  update() {
    if (this.playerScore >= 12) {
      this.onNextScene();
    }

    if (!this.graphics) {
      this.graphics = this.add.graphics();
    }
    this.graphics.clear();
    this.matter.world.renderConstraint(
      this.secondConstraint,
      this.graphics,
      0xffffff,
      1,
      2,
      1,
      1,
      1
    );
    // We want to make sure the next ball does not spawn before the previous one is already flying.
    // Above logic will prevent a launching ball from colliding with one that just spawned.
    // If position of old orb is lower than 330 (technically higher not lower since Phaser sets the origin at the top left (0,0))
    if (!this.pointer.isDown && this.red4.body.position.y < 330) {
      // Random array of orb colors
      const orbs = ["redOrb", "greenOrb", "blueOrb"];
      // Random array of walls
      const walls = [this.wallRed, this.wallGreen, this.wallBlue];
      // Random number based on length of array
      const randomOrb = Math.floor(Math.random() * orbs.length);

      // Add new orb & set its attributes
      this.red4 = this.matter.add.image(600, 350, orbs[randomOrb], null, {
        label: "redOrb",
      });
      this.red4.setCircle();
      this.red4.setBounce(0.8);
      this.red4.setFriction(0.05);
      this.red4.setMass(10);
      this.red4.setFixedRotation();
      // Update constraint to ball we just spawned
      // We need a second matter collision method because we are creating a new orb on generation
      this.matterCollision.addOnCollideStart({
        objectA: this.red4,
        objectB: walls[randomOrb],
        callback: (eventData) => {
          const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
          gameObjectA.setVisible(false);
          this.playerScore++;
          this.chime.play();
          this.scoreText.setText(this.playerScore + "/12 Orbs");
        },
      });
      this.secondConstraint.bodyB = this.red4.body;
    }

    // Back and forth motion for scoreboxes "walls"
    if (this.wallRed.body.position.x >= 1150) {
      this.wallRed.setVelocityX(-2);
    }
    if (this.wallRed.body.position.x <= 60) {
      this.wallRed.setVelocityX(2);
    }
    if (this.wallGreen.body.position.x >= 1150) {
      this.wallGreen.setVelocityX(-3);
    }
    if (this.wallGreen.body.position.x <= 60) {
      this.wallGreen.setVelocityX(3);
    }
    if (this.wallBlue.body.position.x >= 1150) {
      this.wallBlue.setVelocityX(-1);
    }
    if (this.wallBlue.body.position.x <= 60) {
      this.wallBlue.setVelocityX(1);
    }
  }
}
