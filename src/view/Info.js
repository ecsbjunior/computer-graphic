function Info() {
    const state = {
        info: document.getElementById('info'),
        arrow: document.getElementsByClassName('info-arrow')[0].getElementsByTagName('i')[0],
        infoArrow: document.getElementsByClassName('info-arrow')[0],
        infoOpen: false
    };

    state.infoArrow.addEventListener('click', () => {
        if(!state.infoOpen) {
            state.info.style.width = "75vw";
            if(document.getElementById('swap-button').innerText !== 'Transformations')
                state.info.style.width = "35vw";
            state.arrow.style.transform = "rotate(180deg)";
        }
        else {
            state.info.style.width = "24px";
            state.arrow.style.transform = "rotate(0deg)";
        }
        
        state.infoOpen = !state.infoOpen;
    });

    return {

    };
}

export default Info;