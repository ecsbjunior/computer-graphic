import Line from '../objects/primitives/Line.js';

function ViewPort(objects, sourceWidth, sourceHeight) {
    const state = {
        viewCanvas: document.getElementById('view-port-canvas'),
        viewContext: {},
        sourceWidth,
        sourceHeight,
        button: document.getElementById('view-button'),
        iWidth: document.getElementById('view-input-width'),
        iHeight: document.getElementById('view-input-height')
    };

    state.iWidth.value = sourceWidth;
    state.iHeight.value = sourceHeight;
    state.viewContext = state.viewCanvas.getContext('2d');

    state.button.addEventListener('click', () => {
        state.viewCanvas.width = state.iWidth.value;
        state.viewCanvas.height = state.iHeight.value;
        const sx = state.iWidth.value/sourceWidth, sy = state.iHeight.value/sourceHeight;

        clear();
        for(const obj of objects.getObjects()) {
            const points = obj.object.getPoints();
            for(const point of points) {
                setPixel(point.x*sx, point.y*sy);
            }
        }
        document.getElementById('canvas-container').focus();
    });

    function clear() {
        state.viewContext.clearRect(0, 0, state.viewCanvas.width, state.viewCanvas.height);
    }

    function setPixel(x, y, width=1, height=1, color="#AAA") {
        state.viewContext.fillStyle = color;
        state.viewContext.fillRect(x, y, width, height);
        state.viewContext.fill(); 
    }

    return {};
}

export default ViewPort;