const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');

function handleTabClick(event) {
    const tabButton = event.currentTarget;

    if (tabButton.getAttribute('aria-selected') === 'false') {
        const activeTabButton = tabs.querySelector('[aria-selected="true"]');
        activeTabButton.setAttribute('aria-selected', false);

        const activeTabPanel = tabs.querySelector(`[aria-labelledby='${activeTabButton.id}']`);
        activeTabPanel.hidden = true;

        tabButton.setAttribute('aria-selected', true);
        tabs.querySelector(`[aria-labelledby='${tabButton.id}']`).hidden = false;
    }
}

tabButtons.forEach(tabButton => tabButton.addEventListener('click', handleTabClick));
