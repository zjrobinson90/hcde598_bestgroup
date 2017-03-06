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
  showOptions();
}

function showOptions() {
  text(arrayX[randX], width - 100, 100);
  text("Kill yourself", width - 100, height - (height / 2));
  text(arrayY[randY], width - 100, height - 100);
}


function mouseReleased() {
  randX = int(random(arrayX.length));
  randY = int(random(arrayY.length));
  append(used1, arrayX[randX]);
  append(used2, arrayY[randY]);
  qualityCheck();
  assignValue();
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
    fill(255, 0, 0);
    append(value, arrayX[randX]);
  } else if (mouseX > width - 200 && mouseX < width - 50 && mouseY > height - (height / 2) - 50 && mouseY < height - (height / 2) + 100) {
    fill(0, 255, 0);
    append(value, "Z");
  } else if (mouseX > width - 200 && mouseX < width - 50 && mouseY > height - 150 && mouseY < height - 50) {
    fill(0, 0, 255);
    append(value, arrayY[randY]);
  } else {
    fill(0);
  }
}

// function results() {
//   var x;
//   for (i = 0; i < used1.length; i++) {
//     if (value[i] == 0) {
//       x = used1[i];
//     } else if (value[i] == 1]) {
//     x = used2[i];
//   } else {
//     x = "Z";
//   }

//   var y;
//   for (i = 0; i < used1.length; i++) {
//     if (value[i] == 0) {
//       y = used1[i];
//     } else if (value[i] == 1]) {
//     y = used2[i];
//   } else {
//     y = "Z";
//   }
// }