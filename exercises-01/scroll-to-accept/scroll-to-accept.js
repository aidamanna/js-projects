const terms = document.querySelector('.terms-and-conditions');
const watch = document.querySelector('.watch');
const button = document.querySelector('.accept');

function observerCallback(payload) {
    if (payload[0].intersectionRatio === 1) {
        button.disabled = false;
    } else {
        // stop the observer
        observer.unobserve(terms.lastElementChild);
    }
}

const observer = new IntersectionObserver(observerCallback, {
    root: terms,
    threshold: 1
});
observer.observe(terms.lastElementChild);
