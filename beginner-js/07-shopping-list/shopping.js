const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = [];

function handleSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    
    if (!name) return;
    
    const item = {
        name,
        id: Date.now(),
        complete: false
    };

    items.push(item);
    e.target.reset(); //to clear all inputs in a form
    //Create custom event
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    const html = items.map(item => `<li class="shopping-item">
        <input type="checkbox" value=${item.id} ${item.complete && 'checked'}>
        <span class="itemName">${item.name}</span>
        <button aria-label="Remove ${item.name}" value=${item.id}>&times;</button>
    </li>`
    ).join('');
    list.innerHTML = html;
}

function mirrorToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    if (localStorageItems.length > 0) {
        items = localStorageItems;
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id)
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function handleDelete(event) {
    if(event.target.matches('button')) {
        deleteItem(parseInt(event.target.value)); 
    }
}

function markAsComplete(id) {
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function handleCheckbox(event) {
    if(event.target.matches('input')) {
        markAsComplete(parseInt(event.target.value));
    }
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
list.addEventListener('click', handleDelete)
list.addEventListener('input', handleCheckbox)

restoreFromLocalStorage();



