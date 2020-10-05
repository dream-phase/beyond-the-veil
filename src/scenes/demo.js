import Phaser from "phaser";
import wonderland from "../assets/sounds/alexander-nakarada-wonderland.mp3";
import running from "../assets/sounds/running.mp3";
import walking from "../assets/sounds/walking.mp3";
import Dialogue from "../dialogue";
import demoDialogue from "../dialogues/demoDialogue.json";

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super({ key: "demo" });
  }

  preload() {
    this.load.audio("wonderland", wonderland);
    this.load.audio("running", running);
    this.load.audio("walking", walking);


  }

  create() {
    this.add.image(350, 350, "sky").setScale(0.7);
    this.player = this.physics.add.sprite(300, 100, "player1");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(2.2);
    this.player.body.setGravityY(300);

    this.player.setFrame("idle/idle-0.png");

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.shift = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    this.backgroundMusic = this.sound.add("wonderland");
    this.backgroundMusic.loop = true;
    this.backgroundMusic.play();
    this.conversation = new Dialogue(demoDialogue, this);
    this.conversation.startDialogue();

    this.walkingSound = this.sound.add("walking");
    this.walkingSound.loop = true;
    this.isWalking = false;
    this.runningSound = this.sound.add("running");
    this.runningSound.loop = true;
    this.isRunning = false;



  }

  update() {
    this.movePlayerManager();



  }




  movePlayerManager() {


    if (this.inDialogue) {
      return;
    }
    if (this.cursorKeys.left.isDown) {
      if (this.shift.isDown) {
        this.player.setVelocityX(-300);
        if (this.player.body.onFloor()) {
          this.isWalking = false
          this.isRunning = true
          this.player.play("run", true);
        }
      } else {

        this.player.setVelocityX(-100);
        if (this.player.body.onFloor()) {
          this.isRunning = false
          this.isWalking = true
          this.player.play("walk", true);


        }
      }

      this.player.flipX = true;
    } else if (this.cursorKeys.right.isDown) {
      if (this.shift.isDown) {
        this.player.setVelocityX(300);
        if (this.player.body.onFloor()) {
          this.isRunning = true
          this.isWalking = false
          this.player.play("run", true);
        }
        this.player.flipX = false;
      } else {
        this.player.setVelocityX(100);

        if (this.player.body.onFloor()) {
          this.isRunning = false
          this.isWalking = true
          this.player.play("walk", true);

        }
        this.player.flipX = false;
      }
    } else {
      this.isRunning = false
      this.isWalking = false
      this.player.setVelocityX(0);
      this.player.setFrame("idle/idle-0.png");
    }
    if (
      this.cursorKeys.up.isDown &&
      (this.player.body.onFloor() || this.player.body.touching.down)
    ) {
      this.isRunning = false
      this.isWalking = false
      this.player.setVelocityY(-250);
      this.player.play("jump", true);
    }

    if (!this.isWalking) {

      this.walkingSound.play();

    }
    if (!this.isRunning) {
      this.runningSound.play();
    }

  }
}
