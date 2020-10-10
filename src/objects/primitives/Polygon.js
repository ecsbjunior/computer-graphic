import Line from './Line.js';

function Polygon(points) {
    const state = {
        center: {
            x: points.reduce((acc, value) => acc + value.x, 0) / points.length,
            y: points.reduce((acc, value) => acc + value.y, 0) / points.length
        },
        points: [],
        qtdePoints: points.length
    };

    for(const point of points) {
        state.points.push({x: point.x, y: point.y});
    }

    function setCenter(point) {
        state.center.x = point.x;
        state.center.y = point.y;
    }

    function getCenter() {
        return state.center;
    }

    function getPoints() {
        return state.points;
    }

    function midPoint() {
        state.points = state.points.slice(0, state.qtdePoints);

        for(let i = state.points.length - 1; i > 0; i--) {
            const p1 = state.points[i-1];
            const p2 = state.points[i];
            const line = Line(p1, p2);
            for(const linePoint of line.midPoint()) {
                state.points.push(linePoint);
            }
        }
    }

    return {
        getPoints,
        state,
        midPoint,
        setCenter,
        getCenter,
        center: state.center
    };
}

export default Polygon;