import Utils from '../../utils/Utils.js';

function Elipse(p1, p2) {
    const utils = Utils();

    const state = {
        p1,
        p2,
        center: {x: p1.x, y: p1.y},
        points: []
    };

    function midPoint() {
        state.points = [];
        
        const a = Math.abs(state.p1.x - state.p2.x);
        const b = Math.abs(state.p1.y - state.p2.y);

        let x, y, d1, d2;

        x = 0;
        y = b;
        d1 = Math.pow(b, 2) - Math.pow(a, 2) * b + (Math.pow(a, 2) >> 2);

        while(Math.pow(a, 2) * (y - 0.5) > Math.pow(b, 2) * (x + 1)) {
            state.points.push({x, y});

            if(d1 < 0) {
                d1 = d1 + Math.pow(b, 2) * (2 * x + 3);
            }
            else {
                d1 = d1 + Math.pow(b, 2) * (2 * x + 3) + Math.pow(a, 2) * (-2 * y + 2);
                y--;
            }

            x++;
        }
        state.points.push({x, y});

        d2 = Math.pow(b, 2) * Math.pow(x + 0.5, 2) + Math.pow(a, 2) * Math.pow(y - 1, 2) - Math.pow(a, 2) * Math.pow(b, 2);
        while(y > 0) {
            state.points.push({x, y});

            if(d2 < 0) {
                d2 = d2 + Math.pow(b, 2) * (2 * x + 2) + Math.pow(a, 2) * (-2 * y + 3);
                x++;
            }
            else {
                d2 = d2 + Math.pow(a, 2) * (-2 * y + 3);
            }

            y--;
        }
        state.points.push({x, y});

        utils.simetry4(state.points);
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
        midPoint,
        getPoints,
        setCenter,
        getCenter,
        center: state.center
    };
}

export default Elipse;