let cells;
let cellSize = 10;
let cols, rows;

let textPoints = [];
let textString = "QUORUM";

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // GRID
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  cells = new Array(cols).fill().map(() => new Array(rows).fill(0));

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      cells[x][y] = random() > 0.85 ? 1 : 0;
    }
  }

  // TEXTO
  textFont('serif');
  textSize(min(width * 0.15, 180));

  let bounds = textBounds(textString, 0, 0);

  let x = (width - bounds.w) / 2;
  let y = (height + bounds.h) / 2;

  textPoints = textToPoints(textString, x, y, textSize(), {
    sampleFactor: 0.12
  });
}

function draw() {
  background(235, 245, 238);

  drawBackground();
  drawText();
}
