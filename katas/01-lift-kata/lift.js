console.log("it works!");

const lift = document.querySelector('.lift');

buttonFloor0 = document.querySelector('.floor0 button');
buttonFloor1 = document.querySelector('.floor1 button');
buttonFloor2 = document.querySelector('.floor2 button');
buttonFloor3 = document.querySelector('.floor3 button');


function goToFloor(floorNumber) {
    console.log(`calling floor ${floorNumber}`)
    const classesToRemove = ['to-floor-0', 'to-floor-1', 'to-floor-2', 'to-floor-3'];
    lift.classList.remove(...classesToRemove);
    lift.classList.add(`to-floor-${floorNumber}`);
}

buttonFloor0.addEventListener('click', () => goToFloor(0));
buttonFloor1.addEventListener('click', () => goToFloor(1));
buttonFloor2.addEventListener('click', () => goToFloor(2));
buttonFloor3.addEventListener('click', () => goToFloor(3));
