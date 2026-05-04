import { StarModel } from "/simulations/starModel.js";
import { drawStarModel } from "/simulations/animation.js";

let star = null;
let lastTime = performance.now();

function loop() {
  requestAnimationFrame(loop);

  const now = performance.now();
  const delta = (now - lastTime) / 1000;
  lastTime = now;

  const controls = window.controls;

  // CREATE STAR ON START
  if (controls.start) {
    star = new StarModel(controls.mass, controls.type);
    controls.start = false; 
  }

  // UPDATE STAR
  if (star) {

    star.lifeTime += delta;
    star.stageTime += delta;

    if (star.stageTime >= star.stageDuration) {
      star.stageTime = 0;
      star.updateProperties();
    }

    drawStarModel(star);
  }
}

loop();