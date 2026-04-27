// Size of cells
let cellSize = 5;

// Probability of alive at start
let probabilityOfAliveAtStart = 15;

// Timer
let interval = 100;
let lastRecordedTime = 0;

// Colors
let alive, dead;

// Grid
let cells;
let cellsBuffer;

// Pause
let pause = false;

function setup() {
  createCanvas(640, 360);

  alive = color(235, 245, 238);
  dead = color(120, 170, 140);


  let cols = floor(width / cellSize);
  let rows = floor(height / cellSize);

  cells = new Array(cols).fill().map(() => new Array(rows).fill(0));
  cellsBuffer = new Array(cols).fill().map(() => new Array(rows).fill(0));

  stroke(173, 216, 230);
  noSmooth();

  // Initialize cells
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let state = random(100);
      cells[x][y] = state > probabilityOfAliveAtStart ? 0 : 1;
    }
  }

  background(0);
}

function draw() {
  let cols = floor(width / cellSize);
  let rows = floor(height / cellSize);

  // Draw grid
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      fill(cells[x][y] === 1 ? alive : dead);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  // Update
  if (millis() - lastRecordedTime > interval) {
    if (!pause) {
      iteration();
      lastRecordedTime = millis();
    }
  }

  // Mouse interaction
  if (pause && mouseIsPressed) {
    let xCell = constrain(floor(mouseX / cellSize), 0, cols - 1);
    let yCell = constrain(floor(mouseY / cellSize), 0, rows - 1);

    cells[xCell][yCell] = cellsBuffer[xCell][yCell] === 1 ? 0 : 1;
  } else if (pause && !mouseIsPressed) {
    // Save buffer
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        cellsBuffer[x][y] = cells[x][y];
      }
    }
  }
}

function iteration() {
  let cols = floor(width / cellSize);
  let rows = floor(height / cellSize);

  // Copy to buffer
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      cellsBuffer[x][y] = cells[x][y];
    }
  }

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      let neighbours = 0;

      for (let xx = x - 1; xx <= x + 1; xx++) {
        for (let yy = y - 1; yy <= y + 1; yy++) {

          if (xx >= 0 && xx < cols && yy >= 0 && yy < rows) {
            if (!(xx === x && yy === y)) {
              if (cellsBuffer[xx][yy] === 1) {
                neighbours++;
              }
            }
          }

        }
      }

      if (cellsBuffer[x][y] === 1) {
        if (neighbours < 2 || neighbours > 3) {
          cells[x][y] = 0;
        }
      } else {
        if (neighbours === 3) {
          cells[x][y] = 1;
        }
      }
    }
  }
}

function keyPressed() {
  let cols = floor(width / cellSize);
  let rows = floor(height / cellSize);

  if (key === 'r' || key === 'R') {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let state = random(100);
        cells[x][y] = state > probabilityOfAliveAtStart ? 0 : 1;
      }
    }
  }

  if (key === ' ') {
    pause = !pause;
  }

  if (key === 'c' || key === 'C') {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        cells[x][y] = 0;
      }
    }
  }
}