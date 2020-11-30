import Phaser from "phaser";
import sky from "../assets/sky2.png";
import Dialogue from "../dialogue";
import tower from "../dialogues/d-tower.json";
import finalTruth from "../dialogues/d-finalTruth.json";

export default class puzzle3 extends Phaser.Scene {
  constructor() {
    super({ key: "puzzle3" });
  }

  preload() {
    this.load.image("sky", sky);
  }
  create() {
    this.add.image(0, 0, "sky").setScale(2);

    // game board
    var graphics = this.add.graphics({ fillStyle: { color: 0x612f0b } });
    var tower1 = new Phaser.Geom.Rectangle(245, 100, 10, 250);
    var tower2 = new Phaser.Geom.Rectangle(495, 100, 10, 250);
    var tower3 = new Phaser.Geom.Rectangle(745, 100, 10, 250);
    var base1 = new Phaser.Geom.Rectangle(140, 350, 220, 30);
    var base2 = new Phaser.Geom.Rectangle(390, 350, 220, 30);
    var base3 = new Phaser.Geom.Rectangle(640, 350, 220, 30);

    graphics.fillRectShape(tower1);
    graphics.fillRectShape(tower2);
    graphics.fillRectShape(tower3);
    graphics.fillRectShape(base1);
    graphics.fillRectShape(base2);
    graphics.fillRectShape(base3);

    var ring1graphics = this.make
      .graphics()
      .fillStyle(0xd4b06a)
      .fillRect(0, 0, 50, 30);
    ring1graphics.generateTexture("ring1", 50, 30);
    ring1graphics.destroy();
    var ring2graphics = this.make
      .graphics()
      .fillStyle(0xd4b06a)
      .fillRect(0, 0, 75, 30);
    ring2graphics.generateTexture("ring2", 75, 30);
    ring2graphics.destroy();
    var ring3graphics = this.make
      .graphics()
      .fillStyle(0xd4b06a)
      .fillRect(0, 0, 100, 30);
    ring3graphics.generateTexture("ring3", 100, 30);
    ring3graphics.destroy();
    var ring4graphics = this.make
      .graphics()
      .fillStyle(0xd4b06a)
      .fillRect(0, 0, 125, 30);
    ring4graphics.generateTexture("ring4", 125, 30);
    ring4graphics.destroy();
    var ring5graphics = this.make
      .graphics()
      .fillStyle(0xd4b06a)
      .fillRect(0, 0, 150, 30);
    ring5graphics.generateTexture("ring5", 150, 30);
    ring5graphics.destroy();
    var ring6graphics = this.make
      .graphics()
      .fillStyle(0xd4b06a)
      .fillRect(0, 0, 175, 30);
    ring6graphics.generateTexture("ring6", 175, 30);
    ring6graphics.destroy();
    var ring7graphics = this.make
      .graphics()
      .fillStyle(0xd4b06a)
      .fillRect(0, 0, 200, 30);
    ring7graphics.generateTexture("ring7", 200, 30);
    ring7graphics.destroy();

    this.ring1 = this.add.image(250, 155, "ring1");
    this.ring2 = this.add.image(250, 185, "ring2");
    this.ring3 = this.add.image(250, 215, "ring3");
    this.ring4 = this.add.image(250, 245, "ring4");
    this.ring5 = this.add.image(250, 275, "ring5");
    this.ring6 = this.add.image(250, 305, "ring6");
    this.ring7 = this.add.image(250, 335, "ring7");

    this.ring1.setInteractive();

    this.t1 = [7, 6, 5, 4, 3, 2, 1];
    this.t2 = [];
    this.t3 = [];
    this.inDialogue = true;
    this.input.on("pointerdown", this.startDrag, this);
    const instructions = new Dialogue(tower, this, () => {
      this.inDialogue = false;
    });
    instructions.startDialogue();
  }
  startDrag(pointer, targets) {
    if (this.inDialogue) return;
    this.input.off("pointerdown", this.startDrag, this);
    this.dragObj = targets[0];
    if (typeof this.dragObj != "undefined") {
      if (this.dragObj.x == 250) {
        this.tower = 1;
      } else if (this.dragObj.x == 500) {
        this.tower = 2;
      } else {
        this.tower = 3;
      }
    }

    this.input.on("pointermove", this.doDrag, this);
    this.input.on("pointerup", this.stopDrag, this);
  }

  doDrag(pointer) {
    if (typeof this.dragObj != "undefined") {
      this.dragObj.x = pointer.x;
      this.dragObj.y = pointer.y;
    }
  }
  stopDrag(pointer, targets) {
    if (typeof this.dragObj != "undefined") {
      //console.log(this.dragObj.texture.key);
      // move onto tower 1
      if (this.dragObj.x < 375) {
        //move from tower 2
        if (this.tower == 2) {
          if (this.t1[this.t1.length - 1] < this.t2[this.t2.length - 1]) {
            this.dragObj.y = 365 - this.t2.length * 30;
            this.dragObj.x = 500;
          } else {
            var disable = this.t1[this.t1.length - 1];
            this.t1.push(this.t2.pop());
            var enable = this.t2[this.t2.length - 1];
            this.updateRings(disable, enable);
            this.dragObj.y = 365 - this.t1.length * 30;
            this.dragObj.x = 250;
          }
        }
        //move from tower 3
        else if (this.tower == 3) {
          if (this.t1[this.t1.length - 1] < this.t3[this.t3.length - 1]) {
            this.dragObj.y = 365 - this.t3.length * 30;
            this.dragObj.x = 750;
          } else {
            var disable = this.t1[this.t1.length - 1];
            this.t1.push(this.t3.pop());
            var enable = this.t3[this.t3.length - 1];
            this.updateRings(disable, enable);
            this.dragObj.y = 365 - this.t1.length * 30;
            this.dragObj.x = 250;
          }
        }
        //move from tower 1
        else {
          this.dragObj.y = 365 - this.t1.length * 30;
          this.dragObj.x = 250;
        }
      }
      // move onto tower 3
      else if (this.dragObj.x > 625) {
        console.log("tower3");
        // move from tower 1
        if (this.tower == 1) {
          if (this.t3[this.t3.length - 1] < this.t1[this.t1.length - 1]) {
            this.dragObj.y = 365 - this.t1.length * 30;
            this.dragObj.x = 250;
          } else {
            var disable = this.t3[this.t3.length - 1];
            this.t3.push(this.t1.pop());
            var enable = this.t1[this.t1.length - 1];
            this.updateRings(disable, enable);
            this.dragObj.y = 365 - this.t3.length * 30;
            this.dragObj.x = 750;
          }
        }
        // move from tower 2
        else if (this.tower == 2) {
          if (this.t3[this.t3.length - 1] < this.t2[this.t2.length - 1]) {
            this.dragObj.y = 365 - this.t2.length * 30;
            this.dragObj.x = 500;
          } else {
            var disable = this.t3[this.t3.length - 1];
            this.t3.push(this.t2.pop());
            var enable = this.t2[this.t2.length - 1];
            this.updateRings(disable, enable);
            this.dragObj.y = 365 - this.t3.length * 30;
            this.dragObj.x = 750;
          }
        } else {
          this.dragObj.y = 365 - this.t3.length * 30;
          this.dragObj.x = 750;
        }
      }
      // move onto tower 2
      else {
        // move from tower 1
        if (this.tower == 1) {
          if (this.t2[this.t2.length - 1] < this.t1[this.t1.length - 1]) {
            this.dragObj.y = 365 - this.t1.length * 30;
            this.dragObj.x = 250;
          } else {
            var disable = this.t2[this.t2.length - 1];
            this.t2.push(this.t1.pop());
            var enable = this.t1[this.t1.length - 1];
            this.updateRings(disable, enable);
            this.dragObj.y = 365 - this.t2.length * 30;
            this.dragObj.x = 500;
          }
        }
        // move from tower 3
        else if (this.tower == 3) {
          if (this.t2[this.t2.length - 1] < this.t3[this.t3.length - 1]) {
            this.dragObj.y = 365 - this.t3.length * 30;
            this.dragObj.x = 750;
          } else {
            var disable = this.t2[this.t2.length - 1];
            this.t2.push(this.t3.pop());
            var enable = this.t3[this.t3.length - 1];
            this.updateRings(disable, enable);
            this.dragObj.y = 365 - this.t2.length * 30;
            this.dragObj.x = 500;
          }
        } else {
          this.dragObj.y = 365 - this.t2.length * 30;
          this.dragObj.x = 500;
        }
      }
    }

    this.input.on("pointerdown", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
  }

  updateRings(d, e) {
    console.log(d, e);
    if (d == 1) {
      this.ring1.disableInteractive();
      console.log("ring 1 disable");
    } else if (d == 2) {
      this.ring2.disableInteractive();
      console.log("ring 2 disable");
    } else if (d == 3) {
      this.ring3.disableInteractive();
      console.log("ring 3 disable");
    } else if (d == 4) {
      this.ring4.disableInteractive();
      console.log("ring 4 disable");
    } else if (d == 5) {
      this.ring5.disableInteractive();
      console.log("ring 5 disable");
    } else if (d == 6) {
      this.ring6.disableInteractive();
      console.log("ring 6 disable");
    } else if (d == 7) {
      this.ring7.disableInteractive();
      console.log("ring 7 disable");
    }
    if (e == 1) {
      this.ring1.setInteractive();
      console.log("ring 1 enable");
    } else if (e == 2) {
      this.ring2.setInteractive();
      console.log("ring 2 enable");
    } else if (e == 3) {
      this.ring3.setInteractive();
      console.log("ring 3 enable");
    } else if (e == 4) {
      this.ring4.setInteractive();
      console.log("ring 4 enable");
    } else if (e == 5) {
      this.ring5.setInteractive();
      console.log("ring 5 enablee");
    } else if (e == 6) {
      this.ring6.setInteractive();
      console.log("ring 6 enable");
    } else if (e == 7) {
      this.ring7.setInteractive();
      console.log("ring 7 enable");
    }
  }
  update() {
    if (this.t3.length === 7 || this.t2.length === 7) {
      this.onNextScene();
    }
  }
  onNextScene() {
    const endDialogue = new Dialogue(finalTruth, this, () => {
      this.scene.stop();
      this.scene.start("finalThroneRoom");
    });
    endDialogue.startDialogue();
  }
}
