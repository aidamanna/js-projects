const MOVE_AMOUNT = 20;

const canvas = document.querySelector('#etch-a-sketch');
const context = canvas.getContext('2d');

const shakeButton = document.querySelector('.shake');

const { width, height } = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;

context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 10;
context.strokeStyle = `hsl(${hue}, 100%, 50%)`;

context.beginPath(); // start the drawing
context.moveTo(x, y);
context.lineTo(x, y);
context.stroke();

function draw(key) {
  hue += 5;
  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  context.beginPath();
  context.moveTo(x, y);

  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    default:
      break;
  }

  context.lineTo(x, y);
  context.stroke();
}

function handleKey(event) {
  if (event.key.includes('Arrow')) {
    event.preventDefault();
    draw(event.key);
  }
}

function clearCanvas() {
  canvas.classList.add('shake');
  context.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function () {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
