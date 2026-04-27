function drawText() {
  stroke(100, 150, 120);
  strokeWeight(1.5);
  noFill();

  for (let i = 0; i < textPoints.length - 1; i++) {
    let p0 = textPoints[i];
    let p1 = textPoints[i + 1];

    let d = dist(p0.x, p0.y, p1.x, p1.y);
    if (d > 20) continue;

    let distMouse = dist(mouseX, mouseY, p0.x, p0.y);

    let influence = map(distMouse, 0, 180, 2.2, 0);
    influence = constrain(influence, 0, 2.2);

    let angle = atan2(p1.y - p0.y, p1.x - p0.x);

    let cx = p0.x + cos(angle) * d * influence * 2;
    let cy = p0.y + sin(angle) * d * influence * 2;

    bezier(p0.x, p0.y, cx, cy, cx, cy, p1.x, p1.y);
  }
}
