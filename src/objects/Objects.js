import Line from './primitives/Line.js';
import Circle from './primitives/Circle.js';
import Elipse from './primitives/Elipse.js';
import Polygon from './primitives/Polygon.js';
import Utils from '../utils/Utils.js';
import Transformation from '../math/Transformation.js';

function Objects() {
    const transformation = Transformation();
    const utils = Utils();
    const state = {
        objects: [],
        copyObjects: []
    };

    function addLine(p1, p2, method) {
        state.objects.push({object: Line(p1, p2), type: 'line', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});
        state.copyObjects.push({object: Line(p1, p2), type: 'line', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});

        if(method === 'equation') {
            state.objects[state.objects.length-1].object.equation();
            state.copyObjects[state.objects.length-1].object.equation();
        }
        else if(method === 'dda') {
            state.objects[state.objects.length-1].object.dda();
            state.copyObjects[state.objects.length-1].object.dda();
        }
        else if(method === 'midpoint') {
            state.objects[state.objects.length-1].object.midPoint();
            state.copyObjects[state.objects.length-1].object.midPoint();
        }
    }

    function addCircle(p1, p2, method) {
        state.objects.push({object: Circle(p1, p2), type: 'circle', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});
        state.copyObjects.push({object: Circle(p1, p2), type: 'circle', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});
        state.objects[state.objects.length-1].object[method];
        state.copyObjects[state.objects.length-1].object[method];

        if(method === 'equation') {
            state.objects[state.objects.length-1].object.equation();
            state.copyObjects[state.objects.length-1].object.equation();
        }
        else if(method === 'trigonometry') {
            state.objects[state.objects.length-1].object.trigonometry();
            state.copyObjects[state.objects.length-1].object.trigonometry();
        }
        else if(method === 'midpoint') {
            state.objects[state.objects.length-1].object.midPoint();
            state.copyObjects[state.objects.length-1].object.midPoint();
        }
    }

    function addElipse(p1, p2, method) {
        state.objects.push({object: Elipse(p1, p2), type: 'elipse', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});
        state.copyObjects.push({object: Elipse(p1, p2), type: 'elipse', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});

        if(method === 'midpoint') {
            state.objects[state.objects.length-1].object.midPoint();
            state.copyObjects[state.objects.length-1].object.midPoint();
        }
    }

    function addPolygon(points) {
        state.objects.push({object: Polygon(points), type: 'polygon', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});
        state.copyObjects.push({object: Polygon(points), type: 'polygon', accMatrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]});
        state.objects[state.objects.length-1].object.midPoint();
        state.copyObjects[state.copyObjects.length-1].object.midPoint();
    }

    function scale(iObject, x, y, relationCenter) {
        const object = state.objects[iObject].object;
        let accMatrix = state.objects[iObject].accMatrix;
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, -object.center.x, -object.center.y);
        }

        accMatrix = transformation.scale(accMatrix, x, y);
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, object.center.x, object.center.y);
        }
        
        for(const index in object.getPoints()) {
            const point = object.getPoints()[index];
            const matrixPoint = [[point.x], [point.y], [1]];
            const newMatrixPoint = utils.multiplyMatrix(accMatrix, matrixPoint);
            const newPoint = {x: newMatrixPoint[0][0], y: newMatrixPoint[1][0]};

            state.copyObjects[iObject].object.getPoints()[index] = newPoint;
        }

        state.objects[iObject].accMatrix = accMatrix;
    }

    function translation(iObject, x, y, changeCenter) {
        const object = state.objects[iObject].object;
        let accMatrix = state.objects[iObject].accMatrix;

        accMatrix = transformation.translation(accMatrix, x, y);
        for(const index in object.getPoints()) {
            const point = object.getPoints()[index];
            const matrixPoint = [[point.x], [point.y], [1]];
            const newMatrixPoint = utils.multiplyMatrix(accMatrix, matrixPoint);
            const newPoint = {x: newMatrixPoint[0][0], y: newMatrixPoint[1][0]};

            state.copyObjects[iObject].object.getPoints()[index] = newPoint;
        }
        if(changeCenter) {
            const point = state.copyObjects[iObject].object.getCenter();
            const matrixPoint = [[point.x], [point.y], [1]];
            const newMatrixPoint = utils.multiplyMatrix(accMatrix, matrixPoint);
            const newPoint = {x: newMatrixPoint[0][0], y: newMatrixPoint[1][0]};

            object.setCenter(newPoint);
        }

        state.objects[iObject].accMatrix = accMatrix;
    }

    function shear(iObject, x, y, relationCenter) {
        const object = state.objects[iObject].object;
        let accMatrix = state.objects[iObject].accMatrix;
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, -object.center.x, -object.center.y);
        }

        accMatrix = transformation.shear(accMatrix, x, y);
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, object.center.x, object.center.y);
        }
        
        for(const index in object.getPoints()) {
            const point = object.getPoints()[index];
            const matrixPoint = [[point.x], [point.y], [1]];
            const newMatrixPoint = utils.multiplyMatrix(accMatrix, matrixPoint);
            const newPoint = {x: newMatrixPoint[0][0], y: newMatrixPoint[1][0]};

            state.copyObjects[iObject].object.getPoints()[index] = newPoint;
        }

        state.objects[iObject].accMatrix = accMatrix;
    }

    function rotation(iObject, a, relationCenter) {
        const object = state.objects[iObject].object;
        let accMatrix = state.objects[iObject].accMatrix;
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, -object.center.x, -object.center.y);
        }

        accMatrix = transformation.rotation(accMatrix, a);
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, object.center.x, object.center.y);
        }
        
        for(const index in object.getPoints()) {
            const point = object.getPoints()[index];
            const matrixPoint = [[point.x], [point.y], [1]];
            const newMatrixPoint = utils.multiplyMatrix(accMatrix, matrixPoint);
            const newPoint = {x: newMatrixPoint[0][0], y: newMatrixPoint[1][0]};

            state.copyObjects[iObject].object.getPoints()[index] = newPoint;
        }

        state.objects[iObject].accMatrix = accMatrix;
    };

    function mirrorHorizontal(iObject, relationCenter) {
        const object = state.objects[iObject].object;
        let accMatrix = state.objects[iObject].accMatrix;
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, -object.center.x, -object.center.y);
        }

        accMatrix = transformation.mirrorHorizontal(accMatrix, );
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, object.center.x, object.center.y);
        }
        
        for(const index in object.getPoints()) {
            const point = object.getPoints()[index];
            const matrixPoint = [[point.x], [point.y], [1]];
            const newMatrixPoint = utils.multiplyMatrix(accMatrix, matrixPoint);
            const newPoint = {x: newMatrixPoint[0][0], y: newMatrixPoint[1][0]};

            state.copyObjects[iObject].object.getPoints()[index] = newPoint;
        }

        state.objects[iObject].accMatrix = accMatrix;
    }

    function mirrorVertical(iObject, relationCenter) {
        const object = state.objects[iObject].object;
        let accMatrix = state.objects[iObject].accMatrix;
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, -object.center.x, -object.center.y);
        }

        accMatrix = transformation.mirrorVertical(accMatrix, );
        
        if(relationCenter) {
            accMatrix = transformation.translation(accMatrix, object.center.x, object.center.y);
        }
        
        for(const index in object.getPoints()) {
            const point = object.getPoints()[index];
            const matrixPoint = [[point.x], [point.y], [1]];
            const newMatrixPoint = utils.multiplyMatrix(accMatrix, matrixPoint);
            const newPoint = {x: newMatrixPoint[0][0], y: newMatrixPoint[1][0]};

            state.copyObjects[iObject].object.getPoints()[index] = newPoint;
        }

        state.objects[iObject].accMatrix = accMatrix;
    }

    function getObjects() {
        return state.copyObjects;
    }

    function findObject(point) {
        for(const i in state.copyObjects) {
            const object = state.copyObjects[i].object;
            for(const j in object.getPoints()) {
                const objPoint = object.getPoints()[j];
                if(utils.distance(point, objPoint) < 3) {
                    const selectedObject = state.copyObjects[i];
                    selectedObject.index = i;
                    return selectedObject;
                }
            }
        }
        return null;
    }

    function scanLine(iObject) {
        const object = state.copyObjects[iObject].object;
        const points = object.getPoints();
        const tintPoints = [];
        const ET = [];
        let max = 0;

        for(let i = 0; i < object.state.qtdePoints - 1; i++) {
            if(max < points[i].y) {
                max = points[i].y;
            }
        }

        for(let i = 0; i <= max; i++)
            ET[i] = [];

        for(let i = 0; i < object.state.qtdePoints - 1; i++) {
            let pmin, pmax;

            if(points[i].y > points[i+1].y) {
                pmin = points[i+1];
                pmax = points[i];
            }
            else {
                pmin = points[i];
                pmax = points[i+1];
            }

            const num = pmax.x - pmin.x;
            const den = pmax.y - pmin.y;
            den !== 0 && ET[Math.round(pmin.y)].push({ymax: Math.round(pmax.y), xmin: Math.round(pmin.x), incr: num/den});
        }

        let AET = [];
        let y = 0;

        while(ET[y].length === 0)
            y++;
        
        for(const obj of ET[y])
            AET.push(obj);

        while(AET.length > 0) {
            AET = AET.filter((value) => {return value.ymax !== y});
            if(AET.length > 0) {
                AET = AET.sort((a, b) => {return a.xmin - b.xmin});
                for(let i = 0; i < AET.length; i+=2) {
                    const range = {y, xmin: AET[i].xmin, xmax: AET[i+1].xmin};
                    tintPoints.push(range);
                }
                AET = AET.map((value) => {return {...value, xmin: value.xmin + value.incr}});
            }
            if(ET[++y]) for(const obj of ET[y]) AET.push(obj);
        }

        return tintPoints;
    }

    function undo() {
        state.objects.pop();
        state.copyObjects.pop();
    }

    return {
        addLine,
        addCircle,
        addElipse,
        addPolygon,
        scale,
        translation,
        shear,
        rotation,
        mirrorHorizontal,
        mirrorVertical,
        getObjects,
        findObject,
        scanLine,
        undo
    };
}

export default Objects;