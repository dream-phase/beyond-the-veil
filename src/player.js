/*jshint esversion: 6 */

// adding sprite and physics collisions:
// https://itnext.io/modular-game-worlds-in-phaser-3-tilemaps-5-matter-physics-platformer-d14d1f614557

import Phaser from "phaser";
import playersprite from "./assets/player1.png";
import playerjson from "./assets/player.json";
import multiKey from "./multiKey.js";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

export default class sprite {
  constructor(scene, x, y) {
    const self = this;
    this.scene = scene;
    const anims = scene.anims;
    var cursors;
    //sprite animations from earlier load.js build
    anims.create({
      key: "Run",
      repeat: -1,
      frameRate: 8,
      frames: anims.generateFrameNames("wizard", {
        prefix: "Run/Run-",
        suffix: ".png",
        start: 0,
        end: 7,
        zeroPad: 1,
      }),
    });
    anims.create({
      key: "Jump",
      repeat: -1,
      frameRate: 8,
      frames: anims.generateFrameNames("wizard", {
        prefix: "Jump/Jump-",
        suffix: ".png",
        start: 0,
        end: 1,
        zeroPad: 1,
      }),
    });
    anims.create({
      key: "Attack1",
      repeat: -1,
      frameRate: 8,
      frames: anims.generateFrameNames("wizard", {
        prefix: "Attack1/Attack1-",
        suffix: ".png",
        start: 0,
        end: 6,
        zeroPad: 1,
      }),
    });

    // Matter-js uses the CENTER OF MASS to place objects in the world, we must
    // account for that to place our sprites correctly

    this.sprite = scene.matter.add.sprite(-64, -64, "wizard", null);

    this.sprite.setFrame("Idle/Idle-0.png");

    const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
    //following code will define the sprites "hitbox" aka sensors
    const { width: w, height: h } = this.sprite;
    //creates main body sensor with rounded edges (chamfer) for better collisions
    //offsets by 32 32 to account for center of mass
    const mainBody = Bodies.rectangle(32, 32, w * 0.6, h * 0.5 - 6, {
      chamfer: { radius: 20 },
    });
    //creating bottom sensor, l and r to determine if the sprite is colliding with the ground or wall
    this.sensors = {
      bottom: Bodies.rectangle(32, h * 0.5 - 12, w * 0.25, 2, {
        isSensor: true,
      }),
      left: Bodies.rectangle(-w * 0.35 + 32, 32, 2, h * 0.25 - 12, {
        isSensor: true,
      }),
      right: Bodies.rectangle(w * 0.35 + 32, 32, 2, h * 0.25 - 12, {
        isSensor: true,
      }),
    };
    //create the body and set the "gravity"
    const compoundBody = Body.create({
      parts: [
        mainBody,
        this.sensors.bottom,
        this.sensors.left,
        this.sensors.right,
      ],
      frictionStatic: 0,
      frictionAir: 0.02,
      friction: 0.1,
    });
    this.sprite
      .setExistingBody(compoundBody)
      .setScale(1.5)
      .setFixedRotation() // Sets inertia to infinity so the sprite can't rotate
      .setPosition(x, y);

    //creating keyboard keys with multiKey.js
    /*this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.shift = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);*/
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
    this.leftInput = new multiKey(scene, [LEFT, A]);
    this.rightInput = new multiKey(scene, [RIGHT, D]);
    this.jumpInput = new multiKey(scene, [UP, W]);
    this.sprintInput = new multiKey(scene, [SHIFT]);
    this.enterInput = new multiKey(scene, [ENTER]);
    this.scene.events.on("update", this.update, this);

    //sensor tracking implementation
    this.isTouching = { left: false, right: false, ground: false };
    this.sprite.isTouching = { left: false, right: false, ground: false };
    this.sprite.canJump = true;
    scene.matter.world.on("beforeupdate", this.resetTouching, this);

    setTimeout(() => {
      scene.matterCollision.addOnCollideStart({
        objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
        callback: this.onSensorCollide,
        context: this,
      });

      scene.matterCollision.addOnCollideActive({
        objectA: [this.sensors.bottom, this.sensors.left, this.sensors.right],
        callback: this.onSensorCollide,
        context: this,
      });
    }, 300);
    this.hasAttacked = false;
  }

  update() {
    //console.log('x=',this.sprite.x,'y=',this.sprite.y);
    this.movePlayerManager();
  }

  onSensorCollide({ bodyA, bodyB, pair }) {
    // Collision method which watches if the player collides with objects/platforms
    // On the left, right, or below.
    // pair.separation is how much overlap there is in px
    if (bodyB.isSensor) return; // We only care about collisions with physical objects
    if (bodyA === this.sensors.left) {
      this.isTouching.left = true;
      if (pair.separation > 0.5) this.sprite.x += pair.separation - 0.5;
    } else if (bodyA === this.sensors.right) {
      this.isTouching.right = true;
      if (pair.separation > 0.5) this.sprite.x -= pair.separation - 0.5;
    } else if (bodyA === this.sensors.bottom) {
      this.isTouching.ground = true;
    }
  }
  resetTouching() {
    this.isTouching.left = false;
    this.isTouching.right = false;
    this.isTouching.ground = false;
  }

  movePlayerManager() {
    const sprite = this.sprite;
    const velocity = sprite.body.velocity;
    const isOnGround = this.isTouching.ground;
    const isRightKeyDown = this.rightInput.isDown();
    const isLeftKeyDown = this.leftInput.isDown();
    const isJumpKeyDown = this.jumpInput.isDown();
    const isSprintKeyDown = this.sprintInput.isDown();
    const pointer = this.scene.input.activePointer;

    if (this.scene.inDialogue) {
      sprite.setVelocityX(0);
      sprite.setFrame("Idle/Idle-0.png");
      return;
    }
    if (pointer.isDown && !this.hasAttacked) {
      console.log("attack");
      sprite.play("Attack1", true);
      this.hasAttacked = true;
      const self = this;
      setTimeout(() => {
        self.hasAttacked = false;
      }, 1000);
      return;
    } else if (!this.hasAttacked) {
      if (isJumpKeyDown && isOnGround) {
        sprite.setVelocityY(-15);
        sprite.play("Jump", true);
      }
      if (isLeftKeyDown) {
        if (isSprintKeyDown) {
          sprite.setVelocityX(-15);
          if (isOnGround) {
            sprite.play("Run", true);
          }
        } else {
          sprite.setVelocityX(-7);
          if (isOnGround) {
            sprite.play("Run", true);
          }
        }
        sprite.flipX = true;
      } else if (isRightKeyDown) {
        if (isSprintKeyDown) {
          sprite.setVelocityX(7);
          if (this.isTouching.ground) {
            sprite.play("Run", true);
          }
          sprite.flipX = false;
        } else {
          sprite.setVelocityX(7);
          if (this.isTouching.ground) {
            sprite.play("Run", true);
          }
          sprite.flipX = false;
        }
      } else {
        sprite.setVelocityX(0);
        sprite.setFrame("Idle/Idle-0.png");
      }
      if (!isOnGround) {
        sprite.play("Jump", true);
      }
    }
  }
}
