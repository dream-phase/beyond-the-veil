/**
 * Allows players to have better movement such as moving "diagonally"
 * Essentially accounts for two keyboard inputs at the same time.
 * Source:https://github.com/mikewesthad/phaser-3-tilemap-blog-posts/blob/master/examples/post-5/04-platformer-step-2/js/multi-key.js
 * Also allows players to use their preferred set of keys (arrows or wsad)
 */
 /*jshint esversion: 6 */
export default class MultiKey {
  constructor(scene, keys) {
    if (!Array.isArray(keys)) keys = [keys];
    this.keys = keys.map(key => scene.input.keyboard.addKey(key));
  }

  // Are any of the keys down?
  isDown() {
    return this.keys.some(key => key.isDown);
  }

  // Are all of the keys up?
  isUp() {
    return this.keys.every(key => key.isUp);
  }
}
