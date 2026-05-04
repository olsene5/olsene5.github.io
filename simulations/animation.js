const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

// MAIN DRAW FUNCTION
export function drawStarModel(starModel) {

  if (!starModel) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const BASE_RADIUS = 40;
  const SCALE = 0.6;

  const radius = BASE_RADIUS * starModel.size * SCALE

  // draw star
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    radius,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = starModel.color;
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(starModel.stage, 20, 30);
  ctx.fillText("Spectral Type: "+ starModel.type, 20, 50);
}