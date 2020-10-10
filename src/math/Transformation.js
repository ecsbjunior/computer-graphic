import Utils from '../utils/Utils.js';

function Transformation() {
    const utils = Utils();

    function scale(accMatrix, x, y) {
        const matrix = [
            [x, 0, 0],
            [0, y, 0],
            [0, 0, 1]
        ];

        accMatrix = utils.multiplyMatrix(matrix, accMatrix);

        return accMatrix;
    }

    function translation(accMatrix, x, y) {
        const matrix = [
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ];

        accMatrix = utils.multiplyMatrix(matrix, accMatrix);

        return accMatrix;
    }

    function shear(accMatrix, x, y) {
        const matrix = [
            [1, x, 0],
            [y, 1, 0],
            [0, 0, 1]
        ];

        accMatrix = utils.multiplyMatrix(matrix, accMatrix);

        return accMatrix;
    }

    function rotation(accMatrix, a) {
        const matrix = [
            [Math.cos(utils.degreesToRad(a)), -Math.sin(utils.degreesToRad(a)), 0],
            [Math.sin(utils.degreesToRad(a)), Math.cos(utils.degreesToRad(a)), 0],
            [0, 0, 1]
        ];

        accMatrix = utils.multiplyMatrix(matrix, accMatrix);

        return accMatrix;
    }

    function mirrorHorizontal(accMatrix) {
        const matrix = [
            [-1, 0, 0],
            [ 0, 1, 0],
            [ 0, 0, 1]
        ];

        accMatrix = utils.multiplyMatrix(matrix, accMatrix);

        return accMatrix;
    }

    function mirrorVertical(accMatrix) {
        const matrix = [
            [1,  0, 0],
            [0, -1, 0],
            [0,  0, 1]
        ];

        accMatrix = utils.multiplyMatrix(matrix, accMatrix);

        return accMatrix;
    }

    return {
        scale,
        translation,
        shear,
        rotation,
        mirrorHorizontal,
        mirrorVertical
    };
};

export default Transformation;