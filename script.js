//David Carrig Memory Game code

var cardsClicked = 0;     //currently clicked cards
var score = 0;            //increments for every attempt
var lastClicked = '';     //id of the last card clicked
var canClick = true;      //set to false while incorrects are still shown, stops clicks
var gameStarted = false;  //gets set to true if the start button has been pressed

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//event to start the game with the Start button
document.querySelector('#start').addEventListener('click', function(){
  if(!gameStarted){
    gameStarted = true;
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  }
});

//event to reset the game with Reset button
document.querySelector('#restart').addEventListener('click', function(){
  if(gameStarted && canClick){
    //removes all children from game element
    const parent = document.querySelector('#game');
    while(parent.firstChild){
      parent.removeChild(parent.firstChild);
    }

    //adds new shuffled elements
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);

    //resets score
    score = 0;
    document.querySelector('h2').innerText = `SCORE: ${score}`;
  }
});


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//reveals the clicked card by setting the id to its color
function handleCardClick(event) {
  if(event.target.id === '' && canClick){
    cardsClicked++;
  
    event.target.id = event.target.classList;

    if(cardsClicked === 1){
      lastClicked = event.target.id;
    }
    else{
      score++;
      document.querySelector('h2').innerText = `SCORE: ${score}`;
      checkMatches(event.target.id);
    }
  }
}

//evaluates if two cards match. has a second delay for calling reset
function checkMatches(curClicked){
  cardsClicked = 0;

  if(curClicked === lastClicked){
    lastClicked = '';
  }
  else{
    canClick = false;
    setTimeout(function(){
      reset(curClicked, lastClicked);
    }, 1000);
  }
}

//resets revealed card. takes any number of String arguments then resets the cards with matching ids
function reset(){
  for(let toReset of arguments){
    if(document.querySelector(`#${toReset}`) !== null){
      document.querySelector(`#${toReset}`).id = '';
    }
  }
  cardsClicked = 0;
  lastClicked = '';
  canClick = true;
}



