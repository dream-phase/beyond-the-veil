import Phaser from "phaser";

export default class Puzzle3 extends Phaser.Scene {
  constructor() {
    super({ key: "puzzle3" });
  }

  preload() {}
  create() {
    // game board
    var graphics = this.add.graphics({ fillStyle: { color: 0x0000aa } });
    var tower1 = new Phaser.Geom.Rectangle(this.scale.width / 2, 100, 20, 380);
    var tower2 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 350,
      100,
      20,
      380
    );
    var tower3 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 + 350,
      100,
      20,
      380
    );

    graphics.fillRectShape(tower1);
    graphics.fillRectShape(tower2);
    graphics.fillRectShape(tower3);
    console.log("puzzle3");

    this.ringGraphics = this.add.graphics({ fillStyle: { color: 0xaa0000 } });
    this.ringGraphics.setInteractive();

    this.ring1 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 360,
      100,
      100,
      50
    );
    this.ring2 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 360,
      150,
      100,
      50
    );
    this.ring3 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 360,
      200,
      100,
      50
    );
    this.ring4 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 360,
      250,
      100,
      50
    );
    this.ring5 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 360,
      300,
      100,
      50
    );
    this.ring6 = new Phaser.Geom.Rectangle(
      this.scale.width / 2 - 360,
      350,
      100,
      50
    );

    this.ringGraphics.fillRectShape(this.ring1);
    this.ringGraphics.fillRectShape(this.ring2);
    this.ringGraphics.fillRectShape(this.ring3);
    this.ringGraphics.fillRectShape(this.ring4);
    this.ringGraphics.fillRectShape(this.ring5);
    this.ringGraphics.fillRectShape(this.ring6);

    this.t1 = [6, 5, 4, 3, 2, 1];
    this.t2 = [];
    this.t3 = [];
  }
  update() {}
}
