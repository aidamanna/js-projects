const lift = document.querySelector('.lift');
const callButtons = document.querySelectorAll('button');
const liftPannels = document.querySelectorAll('.lift-pannel');
const audio = new Audio('lift-arrived.mp3');

let liftFloor = 0;

function goToFloor(floorNumber) {
    const classesToRemove = ['floor0', 'floor1', 'floor2', 'floor3'];
    lift.classList.remove(...classesToRemove);
    lift.classList.add(`floor${floorNumber}`);
    liftFloor = floorNumber;
}

function liftArrivedToFloor() {
    setLiftFloor();
    audio.play();
}

function setLiftFloor() {
    liftPannels.forEach(liftPannel => liftPannel.innerHTML = `Lift in floor ${liftFloor}`);
}

callButtons.forEach(callButton => { 
    callButton.addEventListener('click', () => goToFloor(callButton.dataset.floorNumber));
});

window.addEventListener('transitionend', liftArrivedToFloor);

setLiftFloor();