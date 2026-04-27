let cells;
let cellSize = 10;
let cols, rows;

let font;
let textPoints = [];
let textString = "QUORUM";

function preload() {
    font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

  // GRID (Game of Life simples)
  cols = floor(width / cellSize);
    rows = floor(height / cellSize);

  cells = new Array(cols).fill().map(() => new Array(rows).fill(0));

  for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
                cells[x][y] = random() > 0.85 ? 1 : 0;
        }
  }

  // TEXTO
  let fontSize = min(width * 0.15, 180);

  // centralização simples
  let x = width / 2 - fontSize * 2;
    let y = height / 2;

  textPoints = font.textToPoints(textString, x, y, fontSize, {
        sampleFactor: 0.12
  });
}

function draw() {
    background(235, 245, 238);

  drawBackground();
    drawText();
}

// FUNDO
function drawBackground() {
    noStroke();
    fill(170, 210, 185, 80);

  for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
                if (cells[x][y] === 1) {
                          rect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
        }
  }
}

// TEXTO INTERATIVO
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
