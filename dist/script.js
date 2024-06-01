let size = 400;
let squareSize = size * 0.02;
let step = size * 0.01;
let squares = [];
let hue = 0;

class Square {
  constructor(x, y, size, hue) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.centre = {
      x: this.x + squareSize * 0.5,
      y: this.y + squareSize * 0.5
    };
    this.hue = hue;
  }

  update() {
    // calculate angle from center of circle
    const angle = atan2(this.centre.y - Circle.y, this.centre.x - Circle.x);
    // extend the line to the edge of the circle
    const x = Circle.x + Circle.radius * cos(angle);
    const y = Circle.y + Circle.radius * sin(angle);
    // get the distance from the point on the line
    const distance = abs(dist(this.centre.x, this.centre.y, x, y));
    // if distance is smaller than radius * 0.7, make square larger
    // otherwise, square size is half
    let newSize = squareSize * 0.5;
    if (distance < Circle.radius * 0.7)
      newSize = map(
        distance,
        0,
        Circle.radius * 0.7,
        squareSize,
        squareSize * 0.5
      );

    this.size = newSize;
  }

  draw() {
    stroke(hue, 100, 40, 1);
    fill(hue, 100, 40, 1);
    square(this.x, this.y, this.size);
  }
}

function createSquares() {
  for (let x = step; x < size; x += squareSize + step) {
    for (let y = step; y < size; y += squareSize + step) {
      const square = new Square(x, y, squareSize, 0);
      squares.push(square);
    }
  }
}

const Circle = {
  x: size / 2,
  y: size / 2,
  radius: 0,
  acceleration: 5
};

function setup() {
  colorMode(HSL);
  const c = createCanvas(size, size);
  c.parent("canvas");
  resize();
}

function draw() {
  clear();
  Circle.radius += Circle.acceleration;
  Circle.acceleration += 0.02;
  hue += 2;
  if (hue > 360) hue = 0;
  if (Circle.radius > size * 1.5) {
    Circle.radius = 0;
    Circle.acceleration = 5;
  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].update();
    squares[i].draw();
  }
}

function resize() {
  squares = [];
  if (windowWidth < 400) {
    size = windowWidth * 0.8;
  } else {
    size = 400;
  }
  squareSize = size * 0.02;
  step = size * 0.01;
  Circle.x = size / 2;
  Circle.y = size / 2;
  resizeCanvas(size, size);
  createSquares();
}

function windowResized() {
  resize();
}

requestAnimationFrame(() => {});