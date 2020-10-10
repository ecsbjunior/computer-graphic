function Utils() {
    function distance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    
    function multiplyMatrix(m1, m2) {
        const m3 = [];

        for(let i = 0; i < m1.length; i++) {
            const line = [];
            for(let j = 0; j < m2[0].length; j++) {
                let sum = 0;
                for(let k = 0; k < m2.length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                line.push(sum);
            }
            m3.push(line);
        }

        return m3;
    }

    function radToDegrees(a) {
        return a*Math.PI/180;
    }

    function degreesToRad(a) {
        return a*Math.PI/180;
    }

    function correct(p, points) {
        for(const point of points) {
            point.x += p.x;
            point.y += p.y
        }
    }

    function simetry8(points) {
        for(let i = points.length - 1; i >= 0; i--) {
            const x = points[i].x;
            const y = points[i].y;

            points.push({x: - x, y: - y});
            points.push({x: + x, y: - y});
            points.push({x: - x, y: + y});

            points.push({x: + y, y: + x});
            points.push({x: - y, y: - x});
            points.push({x: + y, y: - x});
            points.push({x: - y, y: + x});
            
        }
    }

    function simetry4(points) {
        for(let i = points.length - 1; i >= 0; i--) {
            const x = points[i].x;
            const y = points[i].y;

            points.push({x: - x, y: - y});
            points.push({x: + x, y: - y});
            points.push({x: - x, y: + y});            
        }
    }

    return {
        distance,
        multiplyMatrix,
        radToDegrees,
        degreesToRad,
        simetry8,
        simetry4,
        correct
    }
};

export default Utils;