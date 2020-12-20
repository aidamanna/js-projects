const cardButtons = document.querySelectorAll('.card button');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleCardButton(event) {
    const button = event.currentTarget;
    // To get the closest parent element (could not be the direct parent)
    const card = button.closest('.card');

    const imageSrc = card.querySelector('img').src;
    const description = card.dataset.description;

    modalInner.innerHTML = `
        <img width='400' height="400" src=${imageSrc.replace('200', '400')} alt=${description}/>
        <p>${description}</p>
    `;

    modalOuter.classList.add('open');
}

cardButtons.forEach(cardButton => cardButton.addEventListener('click', handleCardButton));

function closeModal() {
    modalOuter.classList.remove('open');
}

// Close modal when clicking outside the modal, but not inside!!!
modalOuter.addEventListener('click', function(event) {
    const isOutside = !event.target.closest('.modal-inner');
    if (isOutside) {
        closeModal();
    }
})

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModal();
    }
})