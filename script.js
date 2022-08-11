'use strict';

const score = document.querySelector('.score');
const popup = document.querySelector('.popup');
const gameArea = document.querySelector('.gameArea');
const gameBoard = document.querySelector('.gameBoard');
let road = gameArea.getBoundingClientRect();

let lines;

let player = { speed: 15, start: false, score: 0 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
gameBoard.addEventListener('click', start);
document.addEventListener('keydown', start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  // console.log(keys);
}

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  // console.log(keys);
}

function gamePlay() {
  console.log('game started');
  let car = document.querySelector('.car');
  let enemy = document.querySelector('.enemy');
  let carD = car.getBoundingClientRect();
  if (player.start) {
    movesLines();
    movesEnemy(car);
    if (keys.ArrowDown && player.y < road.height - carD.height)
      player.y += player.speed;
    if (keys.ArrowUp && player.y > road.height * 0.3) player.y -= player.speed;
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < road.width - carD.width)
      player.x += player.speed;
      
      car.style.top = player.y + 'px';
      car.style.left = player.x + 'px';
      
      window.requestAnimationFrame(gamePlay);
      player.score++;
      score.innerHTML = "SCORE: " + player.score;
  }
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
    );
  }

function movesEnemy(car) {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach(function (item) {
    if (isCollide(car, item)) {
      console.log('BOOM 💥');
      player.start = false;
      popup.classList.remove('hide');
    }
    let enemy = item.getBoundingClientRect();
    if (item.y > road.height) {
      item.y = -700;
      item.style.left = Math.random() * (road.width - enemy.width) + 'px';
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
  });
}
function movesLines() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (item) {
    if (item.y > road.height) {
      item.y = -100;
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
  });
}

function start() {
  if (player.start) return;
  gameArea.innerHTML = '';
  player.score = 0
  for (let i = 0; i < 6; i++) {
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'line');
    roadLine.y = i * 150;
    roadLine.style.top = roadLine.y + 'px';
    gameArea.appendChild(roadLine);
  }
  popup.classList.add('hide');
  player.start = true;
  window.requestAnimationFrame(gamePlay);

  lines = document.querySelectorAll('.line');

  for (let i = 0; i < 3; i++) {
    let enemy = document.createElement('div');
    enemy.setAttribute('class', 'enemy');
    let enemyDimensions = enemy.getBoundingClientRect();
    enemy.y = i * 350;
    enemy.style.top = enemy.y + 'px';
    enemy.style.left =
      Math.random() * (road.width - enemyDimensions.width) + 'px';
    gameArea.appendChild(enemy);
  }

  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);


  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  // console.log('top position' + car.offsetTop);
  // console.log('Left position' + car.offsetLeft);
}
