// Created by Josh Leibsohn and Zechariah Robinson
// Last edited 03/06/17
// This is some code to crowd-source ethics for self-driving cars

var arrayX = ["One kid", "Group of kids", "One adult", "Group of adults", "Paul Rudd", "Jeff Bezos", "Donald Trump", "The Pope"];
var arrayY = [];
var value = [];
var results = [];
var randX = 0;
var randY = 0;
var speed = 1 * 7;
var dir = 0;
var carX = 100;
var carY = 250;
var on = 0;
var totalCombinations = arrayX.length - 1;
var turnCheckOn = 0;

function setup() {
  createCanvas(800, 600);
  for (i = 0; i < arrayX.length; i++) {
    append(arrayY, arrayX[i]);
    append(results, "choice" + i);
    results[i] = 0;
  }
  findCombinations();
}

function draw() {
  background(100, 200, 0);
  qualityCheck();
  road();
  car(carX, carY);
  showOptions();
  turnCarOn();
  if (value.length == totalCombinations) {
    turnCheckOn = 1
  }
  if(turnCheckOn == 1){
    background(255);
    fill(0);
    resultsLocal();
    text(results[3], 100, 100);
  }
}


function resultsLocal() {
  for(i = 0; i < arrayX.length; i++) {
    for(j = 0; j < value.length; j++) {
      if(value[j].winner == arrayX[i]) {
        results[i] = results[i] + 1;
      }
    }
  }
}

function findCombinations() {
  for(i = 2; i < arrayX.length; i++) {
    totalCombinations = totalCombinations + arrayX.length - i;
  }
}

function turnCarOn() {
  if(mouseIsPressed) {
    on = 1;
  }
  if(on == 1) {
    carAnimation();
  }
  if(carX == width - 200) {
    on = 0;
  }
}

function road() {
  fill(50);
  rect(0, height / 3, width, height / 3);
}

function car(x, y) {
  fill(255, 0, 0);
  rect(x, y, 100, 50);
  rect(x + 25, y - 25, 50, 25);
  fill(0);
  ellipse(x + 25, y + 50, 30);
  ellipse(x + 75, y + 50, 30);
}

function carAnimation() {
  carX = carX + speed;
  carY = carY + dir;
  if(carX >= width - 200) {
    carX = width - 200;
    carY = carY - dir;
  }
}

function showOptions() {
  noStroke();
  textSize(15);
  fill(255);
  text(arrayX[randX], width - 100, 100);
  text("Kill yourself", width - 100, height - (height / 2));
  text(arrayY[randY], width - 100, height - 100);
}


function mouseReleased() {
  assignValue();
  randX = int(random(arrayX.length));
  randY = int(random(arrayY.length));
}

function qualityCheck() {
  if (randX == randY) {
    randY = int(random(arrayY.length));
  } // checks to see if options are equal

  // Need to be able to know what pairs we've used
  for (i = 0; i < value.length; i++) {
    if ((arrayX[randX] == value[i].option1 || arrayX[randX] == value[i].option2) && (arrayY[randY] == value[i].option1 || arrayY[randY] == value[i].option2)) {
      randY = int(random(arrayY.length));
    }
  } // checks to see if pair has been used
}

// assigns a new array with the winner
function assignValue() {
  if (mouseX > width - 200 && mouseX < width - 50 && mouseY > 50 && mouseY < 150) {
    append(value, 
      {
        option1:arrayX[randX],
        option2:arrayY[randY],
        winner:arrayX[randX]
      });
      dir = 0.4;
  } else if (mouseX > width - 200 && mouseX < width - 50 && mouseY > height - (height / 2) - 50 && mouseY < height - (height / 2) + 100) {
    append(value, 
      {
        option1:arrayX[randX],
        option2:arrayY[randY],
        winner:"Z"
      });
      dir = 0;
  } else if (mouseX > width - 200 && mouseX < width - 50 && mouseY > height - 150 && mouseY < height - 50) {
    append(value, 
      {
        option1:arrayX[randX],
        option2:arrayY[randY],
        winner:arrayY[randY]
      });
      dir = -0.4;
  } else {
    fill(0);
  }
}