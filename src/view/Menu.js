function Menu() {
    const state = {
        swapButton: document.getElementById('swap-button'),
        selected: '',
        observers: []
    };
    
    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(selected) {
        for(const observerFunction of state.observers) {
            observerFunction({selected});
        }
    }

    state.swapButton.addEventListener('click', () => {
        const viewPort = document.getElementById('view-port');
        const optionsContainer = document.getElementById('options-container');
        const info = document.getElementById('info');
        
        if(state.swapButton.innerText === 'Transformations') {
            info.style.width = "35vw";
            viewPort.classList.add('hidden-component');
            optionsContainer.classList.remove('hidden-component');
            state.swapButton.innerText = 'View Port';
        }
        else { 
            info.style.width = "75vw";
            viewPort.classList.remove('hidden-component');
            optionsContainer.classList.add('hidden-component');
            state.swapButton.innerText = 'Transformations';
        }
    });

    function clearSelected() {
        for(const item of document.getElementsByClassName('menu-item')) {
            for(const subitem of item.getElementsByClassName('menu-subitem')) {
                subitem.classList.remove('selected');
            }
            item.classList.remove('selected');
        }
    }

    for(const item of document.getElementsByClassName('menu-item')) {
        const itemName = item.getElementsByTagName('p')[0].innerText.toLowerCase();
        const subitems = item.getElementsByClassName('menu-subitem');
        
        if(subitems.length === 0) {
            item.addEventListener('mousedown', () => {
                clearSelected();
                item.classList.add('selected');
                state.selected = itemName;
                notifyAll(state.selected);
            });
        }
        else {
            for(const subitem of subitems) {
                subitem.addEventListener('mousedown', () => {
                    clearSelected();
                    
                    const subItemName = subitem.getElementsByTagName('p')[0].innerText.toLowerCase();
                    const subItemNameSplit = subItemName.split(' ');
                    
                    if(!subItemNameSplit[1]) subItemNameSplit[1] = '';

                    subitem.classList.add('selected');
                    state.selected = itemName + ' ' + subItemNameSplit[0] + subItemNameSplit[1];
                    notifyAll(state.selected);
                });
            }
        }
    }

    return {
        subscribe
    };
}

export default Menu;