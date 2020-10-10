function TransformationsInput() {
    const state = {
        observers: [],
        scaleX: document.getElementById('scale-x'),
        scaleY: document.getElementById('scale-y'),
        translationX: document.getElementById('translation-x'),
        translationY: document.getElementById('translation-y'),
        shearX: document.getElementById('shear-x'),
        shearY: document.getElementById('shear-y'),
        rotationDegrees: document.getElementById('rotation-degrees'),
        mirrorVertical: document.getElementById('mirror-vertical'),
        mirrorHorizontal: document.getElementById('mirror-horizontal'),
        relationCenter: document.getElementById('relation-center'),
        relationSource: document.getElementById('relation-source'),
        buttonScale: document.getElementById('button-scale'),
        buttonTranslation: document.getElementById('button-translation'),
        buttonShear: document.getElementById('button-shear'),
        buttonRotation: document.getElementById('button-rotation'),
        buttonMirror: document.getElementById('button-mirror')
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(data) {
        for(const observerFunction of state.observers) {
            observerFunction(data);
        }
    }

    state.buttonScale.addEventListener('click', () => {
        const scaleX = state.scaleX.value;
        const scaleY = state.scaleY.value;

        notifyAll({transformation: 'scale', scaleX, scaleY, relationCenter: state.relationCenter.checked});
    });
    
    state.buttonTranslation.addEventListener('click', () => {
        const translationX = state.translationX.value;
        const translationY = state.translationY.value;

        notifyAll({transformation: 'translation', translationX, translationY, relationCenter: state.relationCenter.checked});
    });
    
    state.buttonShear.addEventListener('click', () => {
        const shearX = state.shearX.value;
        const shearY = state.shearY.value;

        notifyAll({transformation: 'shear', shearX, shearY, relationCenter: state.relationCenter.checked});
    });
    
    state.buttonRotation.addEventListener('click', () => {
        const rotationsDegrees = state.rotationDegrees.value;

        notifyAll({transformation: 'rotation', rotationsDegrees, relationCenter: state.relationCenter.checked});
    });

    state.buttonMirror.addEventListener('click', () => {
        const mirrorVertical = state.mirrorVertical.checked;
        const mirrorHorizontal = state.mirrorHorizontal.checked;

        notifyAll({transformation: 'mirror', mirrorVertical, mirrorHorizontal, relationCenter: state.relationCenter.checked});
    });

    return {
        subscribe
    };
}

export default TransformationsInput;