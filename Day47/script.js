const blocks     = [4, 0, 4];
const colors     = ['red', 'green', 'blue', 'yellow'];
const mario      = document.querySelector("#mario");
const block      = document.querySelector("#block");
const container  = document.querySelector("#container");
const marioSpeed = 5;
const moveTime   = 10;

let blockOn           = 0;
let moveMarioInterval = null;
let stepsTaken        = 0;

// for mario's background position
const marioPositions = [-22, -219, -414];
let bgPositionOn = 0;

document.addEventListener("DOMContentLoaded", (event) => {
  resetMario();
});

// Reset Mario to the initial positioning
function resetMario() {
  const blockPos = document.body.clientHeight * 0.35 ;
  mario.style.bottom = '0px';
  mario.style.left = '0px';
  block.style.top = blockPos + 'px';
  blockOn = 0;
  resetInterval();
  setupInitialMovement();
}

// Initial movements mario should be making
function setupInitialMovement() {
  moveMarioInterval = setInterval(() => {
    moveMario();
    let underBlock = checkMarioUnderBlock();
    if (underBlock) {
      setupJump();
    }
  }, moveTime);
}

// Move Mario to the left
function moveMario() {
  let currentPos = parseInt(mario.style.left, 10);
  mario.style.left = (currentPos + marioSpeed) + 'px';

  // check if should change mario's background position.
  if (stepsTaken >= 5) {
    mario.style.backgroundPositionX = marioPositions[bgPositionOn] + 'px';
    bgPositionOn = 1 - bgPositionOn;
    stepsTaken = 0;
  } else {
    stepsTaken++; 
  }
}

// reset any movement interval the interval
function resetInterval() {
  clearInterval(moveMarioInterval);
  moveMarioInterval = null;
}

// Check if mario is under the prize block
function checkMarioUnderBlock() {
  // get positioning
  const blockPos = block.getBoundingClientRect();
  const marioPos = mario.getBoundingClientRect();
  // check if mario's left side is under the box
  if (blockPos.left < marioPos.left && blockPos.right > marioPos.left) {
    return true;
  }
  return false;
}

// Get mario ready for jumping
function setupJump() {
  // reset the interval
  resetInterval();
  // mario should be standing still
  bgPositionOn = 1;
  mario.style.backgroundPositionX = marioPositions[bgPositionOn] + 'px';
  // Start the jumping process
  moveMarioInterval = setInterval(() => {
    if (blockOn >= blocks.length) {
      continueMoving();
    } else {
      jump();
      blockOn++;
    }
  }, 2000);
}

function jump() {
  // get how high mario should jump.
  const jumpHeight = parseInt(block.clientHeight, 10) + parseInt(block.style.top, 10);
  const bodyHeight = document.body.clientHeight;
  const marioHeight = parseInt(mario.clientHeight, 10);
  // Make mario jump!
  mario.style.bottom = (bodyHeight - jumpHeight - marioHeight) + 'px';
  mario.style.backgroundPositionX = marioPositions[2] + 'px';
  // set a timeout for when mario hits the block
  setTimeout(() => { 
    hitBlock();
  }, 300);
  // And once he lands, he should be standing
  setTimeout(() => {
    mario.style.backgroundPositionX = marioPositions[bgPositionOn] + 'px';
  }, 600);
}

// Mario has just hit the block
function hitBlock() {
  // animate the block being hit
  block.classList.add('hit');
  setTimeout(() => {
    block.classList.remove('hit');    
  }, 200);
  // Ok he needs to fall
  mario.style.bottom = '0px';   
  // and the number should appear!
  let newNumber = document.createElement('div');
  newNumber.innerHTML = blocks[blockOn - 1];
  newNumber.style.top = block.style.top;
  newNumber.style.color = getRandomColor();
  newNumber.classList.add('number');
  container.appendChild(newNumber);
  
  // delete the number after a second and a half
  setTimeout(() => {
    container.removeChild(newNumber);
  }, 1500);
}

// Returns a random color for the letters
function getRandomColor() {
  const newColor = Math.floor(Math.random() * 4);
  return colors[newColor];
}

// stop jumping and have mario move off screen
function continueMoving() {
  // reset the interval
  resetInterval();
  // start moving!
  moveMarioInterval = setInterval(() => {
    moveMario();
    const offScreen = checkIfOffScreen();
    if (offScreen) {
      resetMario();
    }
  }, moveTime);
}

// check if mario has walked off screen
function checkIfOffScreen() {
  const marioLeft = parseInt(mario.style.left, 10);
  if (marioLeft > document.body.clientWidth) {
    return true;
  }
  return false;
}