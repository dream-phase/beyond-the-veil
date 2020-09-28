/*jshint esversion: 6 */
//Note: art assets were obtained from opengameart.org; all assets are licensed under CC-BY 3.0

//Commit 1: 27 Sep 2020: Initial build of demo

import Phaser from "phaser";

var config = {
  key: 'demo',
  active: true,
};

export default class DemoScene extends Phaser.Scene {
  constructor() {
    super({key:'demo'});
    //super(config);
    var ground;
    var keys;
    var player;
  }

  preload() {
    //just a test sprite for now
    this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });

  }

  create() {
    this.add.image(0, 0, "sky").setScale(1);
    platforms = this.physics.add.staticGroup();
  }
  update() {
    this.add.image(0, 0, "sky").setScale(1);
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
    }
  }
}
