import Menu from './Menu.js';
import Utils from '../utils/Utils.js';
import Line from '../objects/primitives/Line.js';
import Circle from '../objects/primitives/Circle.js';
import Elipse from '../objects/primitives/Elipse.js';
import Objects from '../objects/Objects.js';
import TransformationsInput from './TransformationsInput.js';
import ViewPort from './ViewPort.js';

function Canvas() {
    const menu = Menu();
    const objects = Objects();
    const utils = Utils();
    const transformationInput = TransformationsInput();
    const multSelect = document.getElementById('mult-select');
    const selectPoints = document.getElementById('mult-select-points');
    const inputColor = document.getElementById('input-color');

    const factor = 1;
    const state = {
        canvas: document.getElementById('canvas'),
        ctx: canvas.getContext('2d'),
        mousedown: false,
        points: [],
        p1: {x: 0, y: 0},
        p2: {x: 0, y: 0},
        selectedMenuItem: '',
        selectedObject: null
    };
    
    
    state.canvas.width = document.getElementById('canvas-container').offsetWidth / factor;
    state.canvas.height = document.getElementById('canvas-container').offsetHeight / factor;
    
    const viewport = ViewPort(objects, state.canvas.width, state.canvas.height);

    menu.subscribe(handleMenu);
    transformationInput.subscribe(handleTransformationInput);

    multSelect.addEventListener('click', (event) => {
        const {value} = event.target;
        state.selectedObject = objects.getObjects()[value];
        state.selectedObject.index = value;
        const coords = findBox(state.selectedObject.object);
        drawObjects();
        drawBox(coords.xmin, coords.ymin, coords.xmax, coords.ymax);
        handleSelectPoints();
    });

    multSelect.addEventListener('blur', (event) => {
        selectPoints.innerHTML = "";
    });

    document.addEventListener('keydown', (event) => {
        const {ctrlKey, key} = event;
        
        if(ctrlKey && key === 'z') {
            objects.undo();
            updateMultSelect();
            drawObjects();
        }
    });

    state.canvas.addEventListener('mousedown', (event) => {
        const {offsetX, offsetY} = event;

        state.p1.x = offsetX / factor;
        state.p1.y = offsetY / factor;

        state.mousedown = true;
    });

    state.canvas.addEventListener('mousemove', (event) => {
        if(state.mousedown) {
            const {offsetX, offsetY} = event;
            const selectedMenuItemSplit = state.selectedMenuItem.split(' ');
            
            state.p2.x = offsetX / factor;
            state.p2.y = offsetY / factor;

            drawObjects();
            drawObject(selectedMenuItemSplit[0], selectedMenuItemSplit[1]);
        }
    });

    state.canvas.addEventListener('mouseup', (event) => {
        const {offsetX, offsetY} = event;
        const selectedMenuItemSplit = state.selectedMenuItem.split(' ');
        
        state.p2.x = offsetX / factor;
        state.p2.y = offsetY / factor;

        if(selectedMenuItemSplit[0] === 'tint') {
            if(selectedMenuItemSplit[1] === 'floodfill') {
                floodFill(state.p2.x, state.p2.y, inputColor.value);
            }
        }
        else if(selectedMenuItemSplit[0] === 'select') {
            drawObjects();

            const pixel = state.ctx.getImageData(state.p2.x, state.p2.y, 1, 1).data;
            if(pixel[0] === 170) {
                state.selectedObject = objects.findObject(state.p2);
                if(state.selectedObject) {
                    const coords = findBox(state.selectedObject.object);
                    drawBox(coords.xmin, coords.ymin, coords.xmax, coords.ymax);
                }
            }
            else {
                state.selectedObject = null;
            }
        }
        else {
            if(selectedMenuItemSplit[0] === 'line') {
                objects.addLine(state.p1, state.p2, selectedMenuItemSplit[1]);
            }
            else if(selectedMenuItemSplit[0] === 'circle') {
                objects.addCircle(state.p1, state.p2, selectedMenuItemSplit[1]);
            }
            else if(selectedMenuItemSplit[0] === 'elipse') {
                objects.addElipse(state.p1, state.p2, selectedMenuItemSplit[1]);
            }
            else if(selectedMenuItemSplit[0] === 'polygon') {
                if(state.points.length > 0 && utils.distance(state.points[0], state.p2) < 10) {
                    state.points.push({x: state.points[0].x, y: state.points[0].y});
                    objects.addPolygon(state.points);
                    state.points = [];
                }
                else {
                    state.points.push({x: state.p2.x, y: state.p2.y});   
                }
            }

            updateMultSelect();
            drawObjects();
            drawObject(selectedMenuItemSplit[0], selectedMenuItemSplit[1]);
        }

        state.mousedown = false;
    });

    function handleMenu(menuItem) {
        state.selectedMenuItem = menuItem.selected;
        const selectedMenuItemSplit = state.selectedMenuItem.split(' ');
        if(selectedMenuItemSplit[0] === 'tint' && selectedMenuItemSplit[1] === 'scanline') {
            if(state.selectedObject) {
                const tintPoints = objects.scanLine(state.selectedObject.index);
                for(const point of tintPoints) {
                    for(let i = Math.floor(point.xmin); i < Math.ceil(point.xmax); i++)
                        setPixel(i, point.y, 1, 1, inputColor.value);
                }
            }
        }
    }

    function handleTransformationInput(transformationInputItem) {
        if(state.selectedObject) {
            if(transformationInputItem.transformation === 'scale') {
                const {scaleX, scaleY, relationCenter} = transformationInputItem;
                objects.scale(state.selectedObject.index, scaleX, scaleY, relationCenter);
            }
            if(transformationInputItem.transformation === 'translation') {
                const {translationX, translationY} = transformationInputItem;
                objects.translation(state.selectedObject.index, translationX, translationY, true);
            }
            if(transformationInputItem.transformation === 'shear') {
                const {shearX, shearY, relationCenter} = transformationInputItem;
                objects.shear(state.selectedObject.index, shearX, shearY, relationCenter);
            }
            if(transformationInputItem.transformation === 'rotation') {
                const {rotationsDegrees, relationCenter} = transformationInputItem;
                objects.rotation(state.selectedObject.index, rotationsDegrees, relationCenter);
            }
            if(transformationInputItem.transformation === 'mirror') {
                const {mirrorVertical, mirrorHorizontal, relationCenter} = transformationInputItem;
                if(mirrorVertical) {
                    objects.mirrorVertical(state.selectedObject.index, relationCenter);
                }
                if(mirrorHorizontal) {
                    objects.mirrorHorizontal(state.selectedObject.index, relationCenter);
                }
            }
            
            const {object} = state.selectedObject;

            if(state.selectedObject.type === 'line') {}
            else if(state.selectedObject.type === 'circle') {}
            else if(state.selectedObject.type === 'elipse') {}
            else if(state.selectedObject.type === 'polygon') {
                object.midPoint();
            }

            drawObjects();
        }
    }

    function handleSelectPoints() {
        const {object, type} = state.selectedObject;

        selectPoints.innerHTML = "";
        const points = object.getPoints();
        const TL = type === 'polygon' ? object.state.qtdePoints : object.getPoints().length;
        for(let index = 0; index < TL; index++) {
            const point = points[index];
            let opt = `<option value="${1}">`;
            opt += `(${point.x}, ${point.y})`;
            opt += `</option>`;
            selectPoints.innerHTML += opt;
        }
        
    }

    function updateMultSelect() {
        const objs = objects.getObjects();
        multSelect.innerHTML = "";
        for(const index in objs) {
            const obj = objs[index];
            let opt = `<option value="${index}">`;
            opt += `${obj.type}`;
            opt += `</option>`;
            multSelect.innerHTML += opt;
        }
    }

    function floodFill(x, y, color) {
        const stack = [{x, y}];
        const dx = [1, -1, 0, 0];
        const dy = [0, 0, 1, -1];

        while(stack.length > 0) {
            const p = stack.pop();
            if(p.x >= 0 && p.x < canvas.width && p.y >= 0 && p.y < canvas.height) {
                const pixel = state.ctx.getImageData(p.x, p.y, 1, 1).data;    
                if(pixel[0] === 0) {
                    setPixel(p.x, p.y, 1, 1, color);
                    for(let i = 0; i < 4; i++) {
                        stack.push({x: p.x + dx[i], y: p.y + dy[i]});
                    }
                }
            }
        }
    }

    function clear() {
        state.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function setPixel(x, y, width=1, height=1, color="#AAA") {
        state.ctx.fillStyle = color;
        state.ctx.fillRect(Math.round(x), Math.round(y), width, height);
        state.ctx.fill(); 
    }

    function drawObject(object, method) {
        if(object === 'line') {
            const line = Line(state.p1, state.p2);
            if(method === 'equation') {
                const points = line.equation();
                for(const point of points) {
                    setPixel(point.x, point.y);
                }
            }
            else if(method === 'dda') {
                const points = line.dda();
                for(const point of points) {
                    setPixel(point.x, point.y);
                }
            }
            else if(method === 'midpoint') {
                const points = line.midPoint();
                for(const point of points) {
                    setPixel(point.x, point.y);
                }
            }
        }
        else if(object === 'circle') {
            const circle = Circle(state.p1, state.p2);
            if(method === 'equation') {
                const points = circle.equation();
                for(const point of points) {
                    setPixel(point.x, point.y);
                }
            }
            else if(method === 'trigonometry') {
                const points = circle.trigonometry();
                for(const point of points) {
                    setPixel(point.x, point.y);
                }
            }
            else if(method === 'midpoint') {
                const points = circle.midPoint();
                for(const point of points) {
                    setPixel(point.x, point.y);
                }
            }
        }
        else if(object === 'elipse') {
            const elipse = Elipse(state.p1, state.p2);
            if(method === 'midpoint') {
                const points = elipse.midPoint();
                for(const point of points) {
                    setPixel(point.x, point.y);
                }
            }
        }
        else if(object === 'polygon') {
            const points = state.points;
            for(let i = 0; i < points.length - 1; i++) {
                const p1 = points[i];
                const p2 = points[i + 1];
                const line = Line(p1, p2);
                line.midPoint();
                for(const point of line.getPoints()) {
                    setPixel(point.x, point.y);
                }
            }
        }
    }

    function drawObjects() {
        clear();
        for(const obj of objects.getObjects()) {
            const points = obj.object.getPoints();
            for(const point of points) {
                setPixel(point.x, point.y);
            }
        }
    }

    function findBox(object) {
        const coords = {
            xmin: object.getPoints()[0].x, ymin: object.getPoints()[0].y,
            xmax: object.getPoints()[0].x, ymax: object.getPoints()[0].y
        };

        for(const i in object.getPoints()) {
            const point = object.getPoints()[i];
            if(point.x < coords.xmin)
                coords.xmin = point.x;
            if(point.x > coords.xmax)
                coords.xmax = point.x;

            if(point.y < coords.ymin)
                coords.ymin = point.y;
            if(point.y > coords.ymax)
                coords.ymax = point.y;
        }
        return coords;
    } 

    function drawBox(xmin, ymin, xmax, ymax) {
        state.ctx.globalAlpha = 0.1;
        state.ctx.fillStyle = "rgba(255, 255, 255)";
        state.ctx.fillRect(xmin-5, ymin-5, xmax-xmin+12, ymax-ymin+12);
        state.ctx.fill(); 
        state.ctx.globalAlpha = 1.0;
    }
}

export default Canvas;