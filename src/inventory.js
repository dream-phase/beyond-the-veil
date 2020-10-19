import Phaser from "phaser";

export default class Inventory {
  constructor(scene) {
    this.scene = scene;
    this.inventoryContent = [];
    this.inventoryOpen = false;
    const screenCenterX =
      this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
    const screenCenterY =
      this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
    this.sprite = this.scene.add.image(
      screenCenterX,
      screenCenterY,
      "inventory"
    );
    this.sprite.setOrigin(0.5);
    this.sprite.setScrollFactor(0);
    this.sprite.visible = false;
    this.ikey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.I
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.ikey)) {
      const self = this;
      const oldVisibility = this.sprite.visible;
      this.sprite.visible = !oldVisibility;
      this.inventoryContent.forEach((item) => {
        item.sprite.visible = !oldVisibility;
      });
      // console.log(this.inventoryContent);
    }
  }

  add(spriteName, info) {
    const screenCenterX =
      this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
    const screenCenterY =
      this.scene.cameras.main.worldView.y + this.scene.cameras.main.height / 2;
    const sprite = this.scene.add.image(425, 200, spriteName);
    sprite.setScale(0.2);
    sprite.setScrollFactor(0);
    sprite.visible = this.sprite.visible;
    // console.log(sprite);
    // console.log(this.sprite);
    this.inventoryContent.push({
      sprite,
      info,
    });
  }

  has(itemName) {
    return (
      this.inventoryContent.filter((item) => item.info.name === itemName)
        .length > 0
    );
  }
}
