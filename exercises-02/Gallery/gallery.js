function Gallery(gallery) {

    if (!gallery) {
        throw new Error('No Gallery Found');
    }

    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentImage;

    function openModal() {
        if(modal.matches('.open')) {
            console.info('Modal already open');
            return;
        }
        modal.classList.add('open');

        window.addEventListener('keydown', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);
    }

    function closeModal() {
        modal.classList.remove('open');

        window.removeEventListener('keydown', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        prevButton.removeEventListener('click', showPrevImage);
    }

    function showImage(el) {
        if(!el) {
            console.info('No image to show');
            return;
        }
        
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        currentImage = el;
        openModal();
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild); 
    }

    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild); 
    }

    function handleClickOutside(event) {
        if (event.target !== event.currentTarget) {
            return;
        }

        closeModal();
    }

    function handleKeyUp(event) {
        if (event.key === 'Escape') return closeModal();
        if (event.key === 'ArrowRight') return showNextImage();
        if (event.key === 'ArrowLeft') return showPrevImage();
    }

    images.forEach(image => image.addEventListener('click', (event) => showImage(event.currentTarget)))
    images.forEach(image => image.addEventListener('keyup', (event) => {
        if(event.key === 'Enter') {
            showImage(event.currentTarget);
        }
        
    }));
    modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));