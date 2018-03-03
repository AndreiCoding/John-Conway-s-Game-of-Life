function mod (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

function make2DArray(col, row) {
  let arr = new Array(col);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(row);
    for (var j = 0; j < rows; j++) {
      arr[i][j] = randomInt(2);
    }
  }

  return arr;
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function countLiveCells(col, row) {
  var counter = 0;
  counter += grid[mod(col-1, cols)][mod(row-1, rows)];
  counter += grid[col             ][mod(row-1, rows)];
  counter += grid[mod(col+1, cols)][mod(row-1, rows)];
  
  counter += grid[mod(col-1, cols)][row];
  counter += grid[mod(col+1, cols)][row];

  counter += grid[mod(col-1, cols)][mod(row+1, rows)];
  counter += grid[col             ][mod(row+1, rows)];
  counter += grid[mod(col+1, cols)][mod(row+1, rows)];
  return counter;

}

var grid;
var cols;
var rows;
var width = 1920;
var height = 1000;
var resolution = 10;

function generate() {
  var newGrid = make2DArray(cols, rows);
  for (let i = 0; i < grid.length; i++) {
    for (var j = 0; j < rows; j++) {
      let state = Boolean(grid[i][j]);
      let liveCells = countLiveCells(i, j);
      if (state) {
        if (liveCells < 2 || liveCells > 3) {
          newGrid[i][j] = 0;
        } else {
          newGrid[i][j] = 1;
        }
      } else {
        if (liveCells === 3) {
          newGrid[i][j] = 1;
        } else {
          newGrid[i][j] = 0;
        }
      }
    }
  } 
  return newGrid;
}

function setup() {
  frameRate(60);
  //console.log(countLiveCells(4, 4));
  createCanvas(1920, 1000);
  cols = Math.floor(width/resolution);
  rows = Math.floor(height/resolution);
  grid = make2DArray(cols, rows);
  /*grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]*/
}

function draw() {
  background(0, 128, 0);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * resolution;
      var y = j *  resolution;
      if (grid[i][j] == 0) {
        fill(51);
        stroke(0);
        rect(x, y, resolution, resolution);
      }
    }
  }

  grid = generate();
}

//x = (y-1)%2;