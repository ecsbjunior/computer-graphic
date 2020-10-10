function Line(p1, p2) {
    const state = {
        p1,
        p2,
        center: {x: (p1.x+p2.x) >> 1, y: (p1.y+p2.y) >> 1},
        points: []
    };

    function equation() {
        state.points = [];
        
        let dy = state.p2.y - state.p1.y;
        let dx = state.p2.x - state.p1.x;
        let m = dy/dx;

        length = Math.abs(state.p2.x - state.p1.x);
        if(Math.abs(state.p2.y - state.p1.y) > length)
            length = Math.abs(state.p2.y - state.p1.y);

        if(Math.abs(dx) > Math.abs(dy)) {
            const inc = (state.p2.x - state.p1.x) / length;

            for(let x = state.p1.x; Math.round(x) !== state.p2.x; x += inc) {
                const y = state.p1.y + m * (x - state.p1.x);
                state.points.push({x: Math.round(x), y: Math.round(y)});
            }
        }
        else {
            const inc = (state.p2.y - state.p1.y) / length;

            for(let y = state.p1.y; Math.round(y) !== state.p2.y; y += inc) {
                const x = state.p1.x + (y - state.p1.y) / m;
                state.points.push({x: Math.round(x), y: Math.round(y)});
            }
        }

        return state.points;
    }

    function dda() {
        state.points = [];

        let length, X, Y, Xinc, Yinc;

        length = Math.abs(state.p2.x - state.p1.x);
        if(Math.abs(state.p2.y - state.p1.y) > length)
            length = Math.abs(state.p2.y - state.p1.y);

        Xinc = (state.p2.x - state.p1.x) / length;
        Yinc = (state.p2.y - state.p1.y) / length;

        X = state.p1.x;
        Y = state.p1.y;

        while(length-- > 0) {
            state.points.push({x: Math.round(X), y: Math.round(Y)});
            X += Xinc;
            Y += Yinc;
        }

        return state.points;
    }

    function midPoint() {
        state.points = [];

        function MidPointLineHigh(p1, p2) {
            let declive = 1;
            let dx = p2.x - p1.x;
            let dy = p2.y - p1.y;

            if(dx < 0) dx = -dx, declive = -1;

            let incE = dx << 1;
            let incNE = (dx << 1) - (dy << 1);
            let d = (dx - dy) << 1;
            let x = p1.x;

            for(let y = p1.y; y <= p2.y; y++) {
                state.points.push({x, y});

                if(d <= 0) {
                    d += incE;
                }
                else {
                    d += incNE;
                    x += declive;
                }
            }
        }

        function MidPointLineLow(p1, p2) {
            let declive = 1;
            let dx = p2.x - p1.x;
            let dy = p2.y - p1.y;

            if(dy < 0) dy = -dy, declive = -1;

            let incE = dy << 1;
            let incNE = (dy << 1) - (dx << 1);
            let d = (dy - dx) << 1;
            let y = p1.y;

            for(let x = p1.x; x <= p2.x; x++) {
                state.points.push({x, y});

                if(d <= 0) {
                    d += incE;
                }
                else {
                    d += incNE;
                    y += declive;
                }
            }
        }

        let dx = state.p2.x - state.p1.x;
        let dy = state.p2.y - state.p1.y;

        if(Math.abs(dx) > Math.abs(dy)) {
            state.p1.x > state.p2.x ? MidPointLineLow(state.p2, state.p1) : MidPointLineLow(state.p1, state.p2);
        }
        else {
            state.p1.y > state.p2.y ? MidPointLineHigh(state.p2, state.p1) : MidPointLineHigh(state.p1, state.p2);
        }
        
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
        dda,
        midPoint,
        getPoints,
        setCenter,
        getCenter,
        state,
        center: state.center
    };
}

export default Line;