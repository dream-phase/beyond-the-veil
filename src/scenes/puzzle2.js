import Phaser from "phaser";
import sky from "../assets/sky2.png";
import Dialogue from "../dialogue";
import checkers from "../dialogues/d-checkers.json";
import orion from "../assets/orion.mp4";

export default class puzzle2 extends Phaser.Scene {
  constructor() {
    super({ key: "puzzle2" });
  }

  preload() {
    this.load.video("orion", orion, "loadeddata", false, true);
  }

  create() {
    console.log("test");
    // Add video
    var video = this.add.video(0, 0, "orion").setOrigin(0, 0);
    // Let it loop
    video.play(true);
    // If the video pauses due to browser constraints, resume it
    var timers = this.time.addEvent({
      delay: 1000,
      callback: function () {
        if(!video.isPlaying()){
          video.setPaused(false);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.inDialogue = true;

    this.won = false;

    //game board
    var graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0x612f0b },
      fillStyle: { color: 0xd4b06a },
    });

    var board1 = new Phaser.Geom.Rectangle();

    var rect = new Phaser.Geom.Rectangle(400, 60, 180, 420);
    var rect1 = new Phaser.Geom.Rectangle(280, 180, 420, 180);

    var line = new Phaser.Geom.Line(460, 60, 460, 480);
    var line1 = new Phaser.Geom.Line(520, 60, 520, 480);
    var line2 = new Phaser.Geom.Line(280, 240, 700, 240);
    var line3 = new Phaser.Geom.Line(280, 300, 700, 300);

    var line4 = new Phaser.Geom.Line(400, 120, 580, 120);
    var line5 = new Phaser.Geom.Line(400, 420, 580, 420);
    var line6 = new Phaser.Geom.Line(340, 180, 340, 360);
    var line7 = new Phaser.Geom.Line(640, 180, 640, 360);

    graphics.fillRect(400, 60, 180, 420);
    graphics.fillRect(280, 180, 420, 180);
    graphics.strokeRectShape(rect);
    graphics.strokeRectShape(rect1);
    graphics.strokeLineShape(line);
    graphics.strokeLineShape(line1);
    graphics.strokeLineShape(line2);
    graphics.strokeLineShape(line3);
    graphics.strokeLineShape(line4);
    graphics.strokeLineShape(line5);
    graphics.strokeLineShape(line6);
    graphics.strokeLineShape(line7);

    this.pieces = [
      "02",
      "03",
      "04",
      "12",
      "13",
      "14",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "30",
      "31",
      "32",
      "34",
      "35",
      "36",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "52",
      "53",
      "54",
      "62",
      "63",
      "64",
    ];

    this.selected = false;
    this.possibleMoves = [];
    this.selectorGraphics = this.add.graphics({
      fillStyle: { color: 0x00ff00 },
    });
    this.pieceGraphics = this.add.graphics({ fillStyle: { color: 0x000 } });

    this.x = 0;
    this.y = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.restartButton = this.add.text(50, 50, "RESTART", { fill: "#fff" });
    this.restartButton.setInteractive().on("pointerdown", () => this.restart());
    this.dialogue = new Dialogue(checkers, this, () => {
      this.inDialogue = false;
    });
    this.dialogue.startDialogue();
  }

  onNextScene() {
    this.scene.start("puzzle3");
  }

  update() {
    this.pieceGraphics.clear();
    var pointer = this.input.activePointer;
    if (pointer.isDown && !this.selected && !this.inDialogue) {
      this.x = Math.floor((pointer.worldX - 280) / 60);
      this.y = Math.floor((pointer.worldY - 60) / 60);
      if (this.pieces.includes(this.x.toString() + this.y.toString())) {
        var selector = new Phaser.Geom.Circle(
          310 + 60 * this.x,
          90 + 60 * this.y,
          30
        );
        this.selectorGraphics.fillCircleShape(selector);

        this.selected = true;

        this.possibleMoves = [];
        //console.log(x,y)
        //right
        if (
          this.pieces.includes((this.x + 1).toString() + this.y.toString()) &&
          !this.pieces.includes((this.x + 2).toString() + this.y.toString())
        ) {
          if (this.x < 5) {
            if (this.x > 2) {
              if (this.y == 2 || this.y == 3 || this.y == 4) {
                console.log("work right");
                this.x1 = this.x + 1;
                this.y1 = this.y;
                this.possibleMoves.push(
                  (this.x + 2).toString() + this.y.toString()
                );
              }
            } else {
              console.log("work right");
              this.x1 = this.x + 1;
              this.y1 = this.y;
              this.possibleMoves.push(
                (this.x + 2).toString() + this.y.toString()
              );
            }
          }
        }
        //LEFT
        if (
          this.pieces.includes((this.x - 1).toString() + this.y.toString()) &&
          !this.pieces.includes((this.x - 2).toString() + this.y.toString())
        ) {
          if (this.x > 2) {
            if (this.x < 4) {
              if (this.y == 2 || this.y == 3 || this.y == 4) {
                console.log("work left");
                this.x1 = this.x - 1;
                this.y1 = this.y;
                this.possibleMoves.push(
                  (this.x - 2).toString() + this.y.toString()
                );
              }
            } else {
              console.log("work left");
              this.x1 = this.x - 1;
              this.y1 = this.y;
              this.possibleMoves.push(
                (this.x - 2).toString() + this.y.toString()
              );
            }
          }
        }
        //up
        if (
          this.pieces.includes(this.x.toString() + (this.y - 1).toString()) &&
          !this.pieces.includes(this.x.toString() + (this.y - 2).toString())
        ) {
          if (this.y > 2) {
            if (this.y < 4) {
              if (this.x == 2 || this.x == 3 || this.x == 4) {
                console.log("work up");
                this.x1 = this.x;
                this.y1 = this.y - 1;
                this.possibleMoves.push(
                  this.x.toString() + (this.y - 2).toString()
                );
              }
            } else {
              console.log("work up");
              this.x1 = this.x;
              this.y1 = this.y - 1;
              this.possibleMoves.push(
                this.x.toString() + (this.y - 2).toString()
              );
            }
          }
        }
        //down
        if (
          this.pieces.includes(this.x.toString() + (this.y + 1).toString()) &&
          !this.pieces.includes(this.x.toString() + (this.y + 2).toString())
        ) {
          if (this.y < 5) {
            if (this.y > 2) {
              if (this.x == 2 || this.x == 3 || this.x == 4) {
                console.log("work down");
                this.x1 = this.x;
                this.y1 = this.y + 1;
                this.possibleMoves.push(
                  this.x.toString() + (this.y + 2).toString()
                );
              }
            } else {
              console.log("work down");
              this.x1 = this.x;
              this.y1 = this.y + 1;
              this.possibleMoves.push(
                this.x.toString() + (this.y + 2).toString()
              );
            }
          }
        }
      }
      console.log(this.possibleMoves);
    } else if (pointer.isDown && this.selected) {
      this.x2 = Math.floor((pointer.worldX - 280) / 60);
      this.y2 = Math.floor((pointer.worldY - 60) / 60);
      console.log(this.x2, this.y2);
      if (
        this.possibleMoves.includes(this.x2.toString() + this.y2.toString())
      ) {
        console.log("VALID MOVE");
        var idx = this.x.toString() + this.y.toString();
        var idx1 = this.x1.toString() + this.y1.toString();
        this.pieces.splice(this.pieces.indexOf(idx), 1);
        this.pieces.splice(this.pieces.indexOf(idx1), 1);
        this.pieces.push(this.x2.toString() + this.y2.toString());
      }

      this.selected = false;
      console.log("unselected");
      this.selectorGraphics.clear();
    }

    // fill pieces in
    for (var i = 0; i < this.pieces.length; i++) {
      var circle = new Phaser.Geom.Circle(
        310 + 60 * parseInt(this.pieces[i][0]),
        90 + 60 * parseInt(this.pieces[i][1]),
        25
      );

      this.pieceGraphics.fillCircleShape(circle);
    }

    if (this.pieces.length <= 5) {
      this.continueButton = this.add.text(50, 150, "CONTINUE", {
        fill: "#fff",
      });
      this.continueButton
        .setInteractive()
        .on("pointerdown", () => this.onNextScene());
    }
  }

  restart() {
    this.selected = false;
    this.selectorGraphics.clear();
    this.pieces = [
      "02",
      "03",
      "04",
      "12",
      "13",
      "14",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "30",
      "31",
      "32",
      "34",
      "35",
      "36",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "52",
      "53",
      "54",
      "62",
      "63",
      "64",
    ];
  }
}
