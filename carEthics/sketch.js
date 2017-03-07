var arrayX = ["A", "B", "C", "D", "E", "F", "G", "H"];
var arrayY = [];
var used1 = [];
var used2 = [];
var value = [];
var randX = 0;
var randY = 0;

function setup() {
  createCanvas(800, 600);
  for (i = 0; i < arrayX.length; i++) {
    append(arrayY, arrayX[i]);
  }
}

function draw() {
  background(200);
  qualityCheck();
  road();
  showOptions();
}

function road() {
  fill(50);
  rect(0, height / 3, width, height / 3);
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
  append(used1, arrayX[randX]);
  append(used2, arrayY[randY]);
  print(value);
}

function qualityCheck() {
  if (randX == randY) {
    randY = int(random(arrayY.length));
  } // checks to see if options are equal

  // **PROBLEM** Need to be able to know what pairs we've used
  for (i = 0; i < used1.length; i++) {
    if (randX * randY == used1[i]) {
      randY = int(random(arrayY.length));
    }
  } // checks to see if pair has been used
}

// assigns
function assignValue() {
  if (mouseX > width - 200 && mouseX < width - 50 && mouseY > 50 && mouseY < 150) {
    append(value, 
      {
        option1:arrayX[randX],
        option2:arrayY[randY],
        winner:arrayX[randX]
      });
  } else if (mouseX > width - 200 && mouseX < width - 50 && mouseY > height - (height / 2) - 50 && mouseY < height - (height / 2) + 100) {
    append(value, 
      {
        option1:arrayX[randX],
        option2:arrayY[randY],
        winner:"Z"
      });
  } else if (mouseX > width - 200 && mouseX < width - 50 && mouseY > height - 150 && mouseY < height - 50) {
    append(value, 
      {
        option1:arrayX[randX],
        option2:arrayY[randY],
        winner:arrayY[randY]
      });
  } else {
    fill(0);
  }
}