window.onload = function () {

  let holes = document.querySelectorAll('.hole');
  let scoreBoard = document.querySelector('.score');
  let moles = document.querySelectorAll('.mole');
  let startBtn = document.getElementById('start_btn');
  let titleH1 = document.getElementById('title');

  let lastHole;
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;


  startBtn.addEventListener('click', function () {
    showBtnAnimation();
    startGame();
  }, false);

  function showBtnAnimation() {
    event.preventDefault();
    startBtn.classList.add('animate');
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    resetScoreAndTime();
    peep();
    setTimeout(() => {
      timeUp = true;
      gameOver();
    }, gameTime)
  }

  function gameOver() {
    hiddenMole(lastHole);
    clearTimeout(moleTimeoutID);
    startBtn.innerHTML = 'Replay!';
    startBtn.style.display = 'inline-block';
    titleH1.innerHTML = 'TIME UP!';
  }

  function resetScoreAndTime() {
    score = 0;
    timeUp = false;
    titleH1.innerHTML = 'WHACK-A-MOLE!';
    scoreBoard.innerHTML = score;
  }

  function peep() {
    if (!timeUp) {
      let time = randomTime(200, 1000);
      let hole = randomHole(holes);
      lastHole = hole;
      comeOutAndStop(hole, time);
    }
  }

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  function randomHole(holes) {
    let holeNumber = randomTime(0, holes.length - 1);
    let hole = holes[holeNumber];
    while (hole === lastHole) {
      hole = randomHole(holes);
    }
    return hole;
  }

  let moleTimeoutID;
  function comeOutAndStop(hole, time) {
    showMole(hole);
    moleTimeoutID = setTimeout(() => {
      hiddenMole(hole);
      peep();
    }, time);
  }

  function showMole(hole) {
    hole.classList.add('up');
  }

  function hiddenMole(hole) {
    hole.classList.remove('up');
  }

  moles.forEach(mole => mole.addEventListener('click', function (e) {
    clearTimeout(moleTimeoutID);
    score += 1;
    scoreBoard.innerHTML = score;
    hiddenMole(lastHole);
    peep();
  }));

};
