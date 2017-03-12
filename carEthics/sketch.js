// Created by Josh Leibsohn and Zechariah Robinson
// Last edited 03/12/17
// This program allows users to select what they want their self-driving car to do in different situations.
// It is an effort to crowd-source data for programming ethics in self-driving cars.

var choice1 = [kid, adult, groupOfKids, groupOfAdults, rudd, musk, trump, pope];
var label1 = ["One kid", "One adult", "Group of kids", "Group of adults", "Paul Rudd", "Elon Musk", "Donald Trump", "The Pope"];
var choice2 = [];
var label2 = [];
var value = [];
var results = [];
var finalResults = [];
var randX = 0;
var randY = 0;
var speed = 1 * 7;
var dir = 0;
var carX = 100;
var carY = 300;
var carColor = [255, 234, 12];
var on = 0;
var totalCombinations = choice1.length - 1;
var turnCheckOn = 0;
var suicide = 0;
var imgRudd;
var imgMusk;
var imgTrump;
var imgPope;
var fire;
var timer = 0;

function setup() {
  createCanvas(800, 600); // creates a canvas on which to draw
  for (i = 0; i < choice1.length; i++) { // runs through the choice1 array and creates the other arrays (choice2, label2, results) at the same length
    append(choice2, choice1[i]); // creates an array at the same length as the choice1 array
    append(label2, label1[i]); // creates an array at the same length as the choice1 array
    append(results, "choice" + i); // creates an array at the same length as the choice1 array
    results[i] = 0; // makes all of the items in the results array equal to 0 to start
  }
  findCombinations(); // runs the function findCombinations one time to create our number of combinations against which we check for completion
  randX = int(random(choice1.length)); // sets the starting option for choice1
  randY = int(random(choice2.length)); // sets the starting option for choice2
  
  // creates the images and assigns them to variables
  imgRudd = loadImage("rudd.jpg");
  imgMusk = loadImage("musk.jpg");
  imgTrump = loadImage("trump.jpg");
  imgPope = loadImage("pope.jpg");
  imgFire = loadImage("fire.png");
}

function draw() {
  background(100, 200, 0); // creates the background to look like grass
  //buttons(); // allows us to show hit boxes around all of the options (currently, we decided to not show the hitboxes, but still wanted the option for later)
  road(); // draws our road
  details(); // creates the little details such as the trees and the lines on the road
  wall(width - 175, height / 2 - 75); // draws the wall which you can choose to kill yourself on
  car(carX, carY); // draws the car
  progressBar(); // shows how many more pairs you have left to choose
  showOptions(); // shows the item pairs for you to choose which one you want your self-driving car to hit
  turnCarOn(); // starts the car animation
  
  // checks to see when all pair options have been gone through to stop the program and show results
  if (value.length == totalCombinations) {
    turnCheckOn = 1;
    resultsLocal(); // creates and shows the results
  }
  // changes the page to a white background and displays the results
  if (turnCheckOn == 1){
    background(200);
    fill(0);
    // goes through all of the results and displays each one down the page
    for (i = 0; i < results.length; i++){
      showResults(i);
    }
  }
  loadFire(); // displays the fire and shows it for a little longer than a split second
  carReset(); // resets the car back to its starting position
}

// shows all of the option pairs from which the user is able to pick
function showResults(i) {
  textSize(30);
  text(finalResults[i].item, 100, (i * 60) + 60);
  text(finalResults[i].count, 350 + (finalResults[i].count * 30) + 10, (i * 60) + 60);
  rect(350, (i * 60) + 35, finalResults[i].count * 30, 30);
  text("Kill yourself", 100, (results.length * 60) + 60);
  text(suicide, 350 + (suicide * 30) + 10, (results.length * 60) + 60);
  rect(350, (results.length * 60) + 35, suicide * 30, 30);
  on = 2
}

// creates a progress bar to show user how many more pairs they have left
function progressBar(){
  fill(255);
  rect(50, height - 30, totalCombinations * 10, 10);
  fill(85, 131, 204);
  rect(50, height - 30, value.length * 10, 10);
}

// creates the results array using the users' selections
function resultsLocal() {
  for (i = 0; i < choice1.length; i++) {
    for (j = 0; j < value.length; j++) {
      if (value[j].winner == choice1[i]) {
        results[i] = results[i] + 1;
      }
    }
  }
  // grabs the results for how many times they selected "kill yourself"
  for (i = 0; i < value.length; i++) {
    if (value[i].winner == "Z") {
      suicide++;
    }
  }
  // creates a new array to match up the choice with its respective count of how many times it was chosen
  for (i = 0; i < choice1.length; i++) {
    append(finalResults, 
    {
      item:label1[i],
      count:results[i],
    });
    totalCombinations++; // stops the resultsLocal from running multiple times in draw function
  }
}

// determines how many combinations are possible given the number of items in the choice1 array
function findCombinations() {
  for (i = 2; i < choice1.length; i++) {
    totalCombinations = totalCombinations + choice1.length - i;
  }
}

// starts the car animation when true
function turnCarOn() {
  if (on == 1) {
    carAnimation();
  }
}

// starts the fire animation when true
function loadFire() {
  if (carX == width - 200) {
    timer = timer + 1
    image(imgFire, width - 300, carY - 250, imgFire.width / 2, imgFire.height / 2);
  }
}

// puts the car back at its starting position after it reaches its end point
function carReset() {
  if (timer == 20) {
    on = 0;
    image(imgFire, width - 300, carY - 250, imgFire.width / 2, imgFire.height / 2);
    carX = 100;
    carY = 300;
    timer = 0;
    randX = int(random(choice1.length));
    randY = int(random(choice2.length));
    qualityCheck();
  }
}

// draws the road in the center of the screen
function road() {
  fill(50);
  rect(0, height / 3, width, height / 3);
}

// draws the wall at the end of the road
function wall(x, y) {
  fill(200, 0, 0);
  stroke(0);
  quad(x, y, x + 50, y, x + 150, y + 50, x + 100, y + 50); // top panel
  quad(x, y, x + 100, y + 50, x + 100, y + 150, x, y + 100); // front panel
  quad(x + 100, y + 50, x + 150, y + 50, x + 150, y + 150, x + 100, y + 150); // right panel
}

// draws the car and puts it at the beginning of the road
function car(x, y) {
  fill(carColor);
  rect(x, y, 100, 50);
  rect(x + 25, y - 25, 50, 25);
  fill(0);
  ellipse(x + 25, y + 50, 30);
  ellipse(x + 75, y + 50, 30);
}

// makes it look like the car is driving at the option the user selects
function carAnimation() {
  carX = carX + speed;
  carY = carY + dir;
  if (carX >= width - 200) {
    carX = width - 200;
    carY = carY - dir;
  }
}

// goes through all of the choices in choice1 and choice2 arrays and shows them randomly against each other
function showOptions() {
  noStroke();
  textSize(15);
  fill(0);
  choice1[randX](width - 120, 80);
  text(label1[randX], width - 150, 30);
  choice2[randY](width - 120, height - 150);
  text(label2[randY], width - 150, 580);
  text("Kill Yourself", width - 165, height/2)
}

// when the mouse is released, this runs the functions to turn on the car animation and assign a value to the end results based on what the user chose
function mouseReleased() {
  //checks to see that the mouse is in any three of our choice positions
  if ((mouseX > width - 200 && mouseX < 775 && mouseY > 40 && mouseY < 190) && on === 0 || 
      (mouseX > width - 175 && mouseX < width - 25 && mouseY > (height / 2) - 75 && mouseY < (height / 2) + 75) && on === 0 || 
      (mouseX > width - 200 && mouseX < 775 && mouseY > 410 && mouseY < 560) && on === 0) {
    on = 1;
    assignValue();
  }
}

// checks to ensure the options are not the same and that they haven't been shown before
function qualityCheck() {
  if (randX == randY) {
    randX = int(random(choice1.length));
    randY = int(random(choice2.length));
  } // checks to see if options are equal

  // checks to see what pairs have been used
  for (i = 0; i < value.length; i++) {
    if ((choice1[randX] == value[i].option1 || choice1[randX] == value[i].option2) && (choice2[randY] == value[i].option1 || choice2[randY] == value[i].option2)) {
      randX = int(random(choice1.length));
      randY = int(random(choice2.length));
    }
  }
}
  
// assigns a new array with the choices displayed and the winner between the two
function assignValue() {
  if (mouseX > width - 200 && mouseX < 775 && mouseY > 40 && mouseY < 190) {
    append(value, 
      {
        option1:choice1[randX],
        option2:choice2[randY],
        winner:choice1[randX]
      });
      dir = -3;
  } else if (mouseX > width - 175 && mouseX < width - 25 && mouseY > (height / 2) - 75 && mouseY < (height / 2) + 75) {
    append(value, 
      {
        option1:choice1[randX],
        option2:choice2[randY],
        winner:"Z"
      });
      dir = 0;
  } else if (mouseX > width - 200 && mouseX < 775 && mouseY > 410 && mouseY < 560) {
    append(value, 
      {
        option1:choice1[randX],
        option2:choice2[randY],
        winner:choice2[randY]
      });
      dir = 3;
  } else {
      fill(0);
  }
}

// shows the details such as the trees and lines on the road
function details() {
  for (i = 0; i < 8; i++) {
    fill(255);
    rect(50 + i*100, height/2, 50, 20);
  }
  tree(200, 100);
  tree(300, 100);
  tree(250, 125);
  tree(100, 520);
  tree(150, 490);
  tree(200, 520);
}

// draws a tree
function tree (x, y) {
  fill(89, 153, 6);
  triangle(x, y, x + 50, y, x + 25, y - 60);
  fill(153, 109, 9);
  rect(x + 20, y, 10, 20);
}

// draws the stick figure adult
function adult (x, y) {
  fill(255, 213, 114); //fills grey
  ellipse(x, y, 30); //head
  stroke(255, 213, 114); //stroke grey
  strokeWeight(3); //stroke size 3
  line(x, y + 15, x, y + 60); // body
  line(x, y + 30, x + 10, y + 20); // right arm
  line(x, y + 30, x - 12, y + 20); //left arm
  line(x, y + 60, x + 10, y + 70); //right leg
  line(x, y + 60, x - 12, y + 70); //left leg
  fill(0); //fill black
  ellipse(x - 5, y - 5, 7); //left eye
  ellipse(x + 5, y - 5, 7); //right eye
  ellipse(x, y + 8, 10) //mouth
  noStroke(); //turn stroke off
}

// draws the stick figure kid
function kid (x, y) {
  fill(255, 213, 114); //fills grey
  ellipse(x, y, 20); //head
  stroke(255, 213, 114); //stroke grey
  strokeWeight(3); //stroke 3
  line(x, y + 10, x, y + 35); //body
  line(x, y + 25, x + 8, y + 20); //right arm
  line(x, y + 25, x - 8, y + 20); //left arm
  line(x, y + 35, x + 8, y + 45); //right leg
  line(x, y + 35, x - 8, y + 45); //left leg
  fill(0); //fill black
  ellipse(x - 4, y - 3, 6); //left eye
  ellipse(x + 4, y - 3, 6); //right eye
  ellipse(x, y + 4, 7) //mouth
  noStroke(); //turn stroke off 
}

// shows a group of kids as a selection for the user
function groupOfKids (x, y) {
  kid(x, y);
  kid(x + 30, y + 30);
  kid(x - 30, y + 30);
}

// shows a group of adults as a selection for the user
function groupOfAdults (x, y) {
  adult(x, y);
  adult(x + 30, y + 30);
  adult(x - 30, y + 30);
}

// shows the Pope as a selection for the user
function pope (x, y) {
  //adult(x, y); // if an image wasn't available, this would show the stick figure in its place
  image(imgPope, x - 100, y - 40, imgPope.width/10, imgPope.height/10);
}

// shows Trump as a selection for the user
function trump (x, y) {
  //adult(x, y); // if an image wasn't available, this would show the stick figure in its place
  image(imgTrump, x - 100, y - 40, imgPope.width/10, imgPope.height/10);
}

// shows Paul Rudd as a selection for the user
function rudd (x, y) {
  //adult(x, y); // if an image wasn't available, this would show the stick figure in its place
  image(imgRudd, x - 100, y - 40, imgPope.width/10, imgPope.height/10);
}

// shows Elon Musk as a selection for the user
function musk (x, y) {
  //adult(x, y); // if an image wasn't available, this would show the stick figure in its place
  image(imgMusk, x - 100, y - 40, imgPope.width/10, imgPope.height/10);
}

// draws a box to show the "hitbox" in which the user can click
function buttons() {
  noFill();
  strokeWeight(2);
  stroke(0);
  rect(width - 200, 40, 175, 150);
  rect(width - 200, 410, 175, 150);
}


// Notes for persnal reference//

//width - 200, 40, 175, 150);
//rect (width - 200, 410, 175, 150);

//top pos: width - 100, 100
//bottom pos: width - 100, height - 100