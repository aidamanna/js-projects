const options = {
    SIZE: 8,
    SCALE: 1.3
}

const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const canvasContext = canvas.getContext('2d');

const faceCanvas = document.querySelector('.face');
const faceCanvasContext = faceCanvas.getContext('2d');

const optionsInputs = document.querySelectorAll('.controls input[type="range"]');
console.log(optionsInputs)

function handleOption(event) {
    const { value, name } = event.currentTarget;
    options[name] = value;
}

optionsInputs.forEach(input => input.addEventListener('input', handleOption));

const faceDetector = new window.FaceDetector();

async function populateVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
    });

    video.srcObject = stream;
    await video.play();

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
}

async function detect() {
    const faces = await faceDetector.detect(video);
    //faces.forEach(drawFace);
    faces.forEach(censor);
    requestAnimationFrame(detect);
}

function drawFace(face) {
    const { width, height, top, left } = face.boundingBox;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.strokeStyle = 'orange';
    canvasContext.lineWidth = 2;
    canvasContext.strokeRect(left, top, width, height);
}

function censor({ boundingBox:face }) {
    faceCanvasContext.imageSmoothingEnabled = false;
    faceCanvasContext.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

    faceCanvasContext.drawImage(
        video,
        face.x,
        face.y,
        face.width,
        face.height,
        face.x,
        face.y,
        options.SIZE,
        options.SIZE);

    const width = face.width * options.SCALE;
    const height = face.height * options.SCALE;
    const x = face.x - (width - face.width) / 2;
    const y = face.y - (height - face.height) / 2;

    faceCanvasContext.drawImage(
        faceCanvas,
        face.x,
        face.y,
        options.SIZE,
        options.SIZE,
        x,
        y,
        width,
        height);
}

populateVideo().then(detect);