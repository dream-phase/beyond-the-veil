import Phaser from "phaser";
import wonderland from "../assets/sounds/alexander-nakarada-wonderland.mp3";

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super({ key: "demo" });
  }

  preload() {
    this.load.audio("wonderland", wonderland);
  }

  create() {
    this.add.image(0, 0, "sky").setScale(3);
    this.player = this.physics.add.sprite(300, 800, "player1");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(2.2);
    this.player.body.setGravityY(300);

    this.player.setFrame("idle/idle-0.png");

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    this.music = this.sound.add("wonderland");
    this.music.loop = true;
    this.music.play();
  }

  update() {
    this.movePlayerManager();
  }

  movePlayerManager() {
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
