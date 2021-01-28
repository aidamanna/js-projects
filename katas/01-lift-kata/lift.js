const lift = document.querySelector('.lift');
const callButtons = document.querySelectorAll('button');
const audio = new Audio('lift-arrived.mp3');

function goToFloor(floorNumber) {
    const classesToRemove = ['floor0', 'floor1', 'floor2', 'floor3'];
    lift.classList.remove(...classesToRemove);
    lift.classList.add(`floor${floorNumber}`);
}

function liftArrivedSound() {
    audio.play();
}

callButtons.forEach(callButton => { 
    callButton.addEventListener('click', () => goToFloor(callButton.dataset.floorNumber));
});

window.addEventListener('transitionend', liftArrivedSound);
