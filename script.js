const gameContainer = document.getElementById("game");

//img array with all available images
const imgs = [
  'MnMulti_Mario.png',
  'MnMulti_splatoonGirl.png',
  'MnOpen_Mario.png',
  'MnOpen_MarioKuppa.png',
  'MnOpen_Murabito.png',
  'MnOpen_Peach.png',
  'MnOpen_Sizue.png',
  'MnOpen_Yoshi.png',
  'MnSingle_Kuppa.png',
  'MnSingle_Mario.png',
  'MnSingle_Peach.png',
  'tc_MnOpen_BbLuigi.png',
  'tc_MnOpen_BbMario.png',
  'tc_MnOpen_BbRosetta.png',
  'tc_MnOpen_Iggy.png',
  'tc_MnOpen_Koopa.png',
  'tc_MnOpen_Larry.png',
  'tc_MnOpen_Lemmy.png',
  'tc_MnOpen_Luigi.png',
  'tc_MnOpen_RLMW.png',
  'tc_MnOpen_Rosetta.png',
  'MnOpen_Link.png'
]


// Variables used to keep track of game
let selected = 0;
let matched = 0;
let firstChoice = null;
let secondChoice = null;
let highscore = null;
let score = 0;
const totalMatches = 12;
const scoreElem = document.createElement('div');
let img_location = './pictures/'

//The imgs the game will load, shuffled
let shuffledIMGS = grabRandomImages(imgs, totalMatches);




//Given algorithm, just use
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}


/*
shuffles the images, then selects a number based on how
many cards the game will use. Then it adds it back to the
array and reshuffles the images to add to the game
*/
function grabRandomImages(array, number) {
  let shuffled = shuffle(array);
  if (number > shuffled.length) {
    number = shuffled.length;
  }
  shuffled = shuffled.slice(0, number);
  shuffled = shuffled.concat(shuffled);
  return shuffle(shuffled);
}


//added new divs and classes to give the flip card effect
function createDivsForImgs(imageArray) {
  for (let i = 0; i < imageArray.length; i++) {
    //add score to middle
    if (i == totalMatches) {
      const p = document.createElement('p');
      p.setAttribute('id', 'text');
      scoreElem.setAttribute('id', 'score');
      scoreElem.setAttribute('class', 'card');
      scoreElem.append(p);
      p.innerText = `${score}`;
      gameContainer.append(scoreElem);
    }
    //create main card container with front and back side div container
    const carddiv = document.createElement('div');
    carddiv.setAttribute('class', 'card');
    const frontdiv = document.createElement('div');
    frontdiv.setAttribute('class', 'front');
    const backdiv = document.createElement('div');
    backdiv.setAttribute('class', 'back');

    //create img elements and set images based on front and back sides
    const frontimg = document.createElement('img');
    const backimg = document.createElement('img');
    frontimg.setAttribute('src', img_location + 'question.png');
    backimg.setAttribute('src', img_location + imageArray[i]);

    //combine all divs and images together, add event listener, and add to game
    frontdiv.append(frontimg);
    backdiv.append(backimg);
    carddiv.append(frontdiv);
    carddiv.append(backdiv);
    carddiv.addEventListener('click', handleCardClick);
    gameContainer.append(carddiv);

  }
}

// TODO: Implement this function!
function handleCardClick(event) {

  const card = event.target.parentElement.parentElement;
  if (card.classList.contains('card') && !card.classList.contains('flipcard') && selected < 2) {
    score += 1;
    scoreElem.firstElementChild.innerText = `${score}`;
    selected += 1;
    card.classList.toggle('flipcard');

    if (selected == 1) {
      firstChoice = card;
    } else if (selected == 2) {
      secondChoice = card;
      if (firstChoice.isEqualNode(secondChoice)) {
        //both stay up and continue with game
        matched += 1;
        selected = 0;
      } else {
        //turn off two choices and reset variables
        setTimeout(resetChoices, 1000);
      }
      if (matched == totalMatches) {
        gameOver();
      }
    }
  }
}


function resetChoices() {
  firstChoice.classList.toggle('flipcard');
  secondChoice.classList.toggle('flipcard');
  firstChoice = null;
  secondChoice = null;
  selected = 0;
}

//creates start Game and reads Best Score, setting up the game
function initGame() {
  //setting highscore
  if (localStorage) {
    try {
      highscore = localStorage.getItem('highscore');
    } catch (error) {
      highscore = null;
      console.log(error);
    }
    //add highscore
    const hsElem = document.createElement('p');
    if (highscore) {
      hsElem.innerText = `High Score: ${highscore}`
    } else {
      hsElem.innerText = 'High Score: -'
    }
    const title = document.querySelector('h1');
    title.after(hsElem);
    //add start Button
    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'start');
    startButton.innerText = 'Start Game';
    document.querySelector('.header').append(startButton);
    startButton.addEventListener('click', function () {
      startButton.remove();
      hsElem.remove();
      //start game when button is pressed
      createDivsForImgs(shuffledIMGS);
    })
  }
}

//save highscore, add a restart button, and reload if restart
function gameOver() {
  //add game over logic
  console.log(`Game Over! Score: ${score} Attempts to solve!`);
  if (!highscore) {
    highscore = score;
    localStorage.setItem('highscore', highscore);
  }
  //add button Play Again!
  const restartButton = document.createElement('button');
  restartButton.setAttribute('id', 'restart');
  restartButton.innerText = 'Restart';
  document.querySelector('#score').append(restartButton);
  restartButton.addEventListener('click', function () {
    if (score < highscore) {
      highscore = score;
      localStorage.setItem('highscore', highscore);
    }
    location.reload();
  })
}



// when the DOM loads
initGame();