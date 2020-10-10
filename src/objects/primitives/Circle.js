import Utils from '../../utils/Utils.js';

function Circle(p1, p2) {
    const utils = Utils();

    const state = {
        p1,
        radius: utils.distance(p1, p2),
        center: {x: p1.x, y: p1.y},
        points: []
    };

    function equation() {
        state.points = [];

        const length = state.radius/Math.sqrt(2);

        for(let x = 0; x <= length+1; x++) {
            const y = Math.sqrt(Math.pow(state.radius, 2) - (Math.pow(x, 2)));
            state.points.push({x, y});
        }

        utils.simetry8(state.points);
        utils.correct(state.p1, state.points);

        return state.points;
    }

    function trigonometry() {
        state.points = [];

        const gap = 360/(2*Math.PI*state.radius);

        if(gap == 0) gap = 360;

        for(let a = 0; a < 46; a+=gap) {
            const x = state.radius*Math.cos(utils.radToDegrees(a));
            const y = state.radius*Math.sin(utils.radToDegrees(a));

            state.points.push({x, y});
        }

        utils.simetry8(state.points);
        utils.correct(state.p1, state.points);

        return state.points;
    }

    function midPoint() {
        state.points = [];

        let x = 0;
        let y = state.radius;
        let d = 1 - state.radius;
        
        
        for(; y > x; x++) {
            state.points.push({x, y});

            if(d < 0) {
                d += 2 * x + 3;
            }
            else {
                d += 2 * (x - y) + 5;
                y--;
            }
        }
        state.points.push({x, y});

        utils.simetry8(state.points);
        utils.correct(state.p1, state.points);

        return state.points;
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

    return {
        equation,
        trigonometry,
        midPoint,
        getPoints,
        setCenter,
        getCenter,
        state,
        center: state.center
    };
}

export default Circle;