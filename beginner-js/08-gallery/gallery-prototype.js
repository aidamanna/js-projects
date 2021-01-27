function Gallery(gallery) {

    if (!gallery) {
        throw new Error('No Gallery Found');
    }

    this.gallery = gallery;

    this.images = Array.from(gallery.querySelectorAll('img'));
    this.modal = document.querySelector('.modal');
    this.prevButton = document.querySelector('.prev');
    this.nextButton = document.querySelector('.next');

    //bind our methods to the instance
    //we create an instance property of the same prototype function but bound with this (which now is the instance).
    //bind() allows as to supply what this will be equal to, and in our constructor this is equal to the instance
    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.images.forEach(image => image.addEventListener('click', (event) => this.showImage(event.currentTarget)))
    this.images.forEach(image => image.addEventListener('keyup', (event) => {
        if(event.key === 'Enter') {
            showImage(event.currentTarget);
        }
        
    }));
    this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function() {
    if(this.modal.matches('.open')) {
        console.info('Modal already open');
        return;
    }
    this.modal.classList.add('open');

    window.addEventListener('keydown', this.handleKeyUp);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function() {
    this.modal.classList.remove('open');

    window.removeEventListener('keydown', handleKeyUp);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.showImage = function(el) {
    if(!el) {
        console.info('No image to show');
        return;
    }
    
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();
}

Gallery.prototype.showNextImage = function() {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild); 
}

Gallery.prototype.showPrevImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild); 
}

Gallery.prototype.handleClickOutside = function(event) {
    if (event.target !== event.currentTarget) {
        return;
    }

    this.closeModal();
}

Gallery.prototype.handleKeyUp = function(event) {
    if (event.key === 'Escape') return this.closeModal();
    if (event.key === 'ArrowRight') return this.showNextImage();
    if (event.key === 'ArrowLeft') return this.showPrevImage();
}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));