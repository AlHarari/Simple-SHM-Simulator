/*
Author: Ahmed Mohammed
Purpose/Synopsis: This program was made for my AP Physics 1 class. It "simulates", in a sense, the motion of a mass being affected a spring in a horizontal mass-spring
                  system. After the user manipulates the mass of the object being affected by the spring and its displacement off the equilibrium line, they click on
                  "Run". After doing so, they are able to "estimate" the period of the mass's oscillation through clicking on the screen once to start the timer, and
                  clicking again to turn the timer off. They are then able to gain an estimate of what the period is.
Completed on: 6th of March, 2022
*/


let t = 0;
//let f = 1;
let k = 5;
let m = 2;
let omega = Math.sqrt(k / m);
let x;
let xOutput;
let A = 3.5; // A is how much off it is from equilibrium, dummy, max of 5

// 10 meters. Square not sized to scale.
let screenWidth = 10;
let squareWidth = 150;
let widthToScreenRatio;

let lm;
let lmItalic;

let prevTime, currentTime;
let period;
let clicked = false;
let run = false;
let pos, vel;

let aSlider, mSlider, runButton;

function mouseClicked() {
  clicked = !clicked;
  if (clicked && run && A != 0) {
    prevTime = millis();
    pos = x;
    vel = -A * sin(omega * t) * omega;
  } else if (!clicked && run) {
    currentTime = millis();
    period = round(abs(currentTime - prevTime) / 1000, 2);
  }
}

function sign (n) {
  return Math.abs(n) / n;
}

function preload() {
  lm = loadFont("assets/lmroman17-regular.otf");
  lmItalic = loadFont("assets/lmroman12-italic.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  widthToScreenRatio = (width / screenWidth);
  
  aSlider = createSlider(-4, 4, 0, 0.5);
  mSlider = createSlider(0.5, 10, 5, 0.5);
  runButton = createButton("Run");
  
  aSlider.style("width", "100px");
  aSlider.position(squareWidth + 55,  (height / 2) + squareWidth - 2.5);
  
  mSlider.style("width", "100px");
  mSlider.position(squareWidth + 55, (height / 2) + squareWidth + 17.5);
  
  runButton.mousePressed(function () {
    t = 0;
    period = 0;
    omega = sqrt(k / m); // recalculate omega with possible new m value
    run = !run;
  });
  runButton.position((width / 2) - 20, height - (squareWidth / 2));
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  
  x = (A * cos(omega * t)) * widthToScreenRatio;
  // y = (A * sin(TWO_PI * f * t)) * (height / screenHeight) / 2;
  
  if (pos && vel) {
    textFont(lm);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Mark line", pos,  -squareWidth - 20);
    
    // "Velocity" direction arrow
    line(pos, -squareWidth, pos + (30 * sign(vel)), -squareWidth);
    triangle(pos + (30 * sign(vel)), -squareWidth - 5, pos + (30 * sign(vel)), -squareWidth + 5, pos + (40 * sign(vel)), -squareWidth);
    
    push();
    // Vertical mark line
    setLineDash([5, 5]);
    line(pos, squareWidth, pos, -squareWidth);
    pop();
  }

  rectMode(CORNER);
  stroke(255);
  noFill();
  square(x, -squareWidth / 2, squareWidth);
  
  rectMode(CENTER);
  noStroke();
  fill(255);
  rect((-width / 2) + 5, 0, 10, squareWidth);
  stroke(255);
  
  // "spring"
  line((-width / 2) + 5, 0, x, 0);
  
  // "floor"
  line((-width / 2), squareWidth / 2, width / 2, squareWidth / 2);
  
  textAlign(CENTER, CENTER);
  textSize(24);
  textFont(lm);
  text("Equilibrium line", 0, squareWidth + 20);
  push();
  // equilibrium line
  setLineDash([5, 5]);
  line(0, squareWidth, 0, -squareWidth);
  pop();
  
  textSize(32);
  text("Click anywhere on screen to start timer.\n Click again to pause.", 0, (-height / 2) + 40);
  
  textSize(20);
  textFont(lmItalic);
  period = isNaN(abs(currentTime - prevTime)) ? "..." : period;
  xOutput = round((1 / widthToScreenRatio) * x, 1);
  
  text("Δx = " + xOutput + " m", (-width/2) + squareWidth, squareWidth); 
  text("m = " + m + " kg", (-width/2) + squareWidth, squareWidth + 20);
  text("T = " + period + " s", (-width/2) + squareWidth, squareWidth + 45);
  
  textSize(24);
  if (clicked && run && A != 0) {
    text("Timer on.", (-width/2) + squareWidth, -squareWidth - 50);
  } else {
    text("Timer off.", (-width/2) + squareWidth, -squareWidth - 50);
  }
  
  if (run) {
    t += 0.001 * deltaTime;
  } else {
    m = mSlider.value();
    A = aSlider.value();
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}
