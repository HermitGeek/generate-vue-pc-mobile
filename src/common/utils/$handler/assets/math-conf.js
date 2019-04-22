/**
 * 按需引入 mathjs
 * https://mathjs.org/docs/custom_bundling.html
 * https://mathjs.org/docs/datatypes/numbers.html
*/
const core = require('mathjs/core');

const math = core.create();


math.import(require('mathjs/lib/expression/function/eval'));
math.import(require('mathjs/lib/function/string/format'));

// create simple functions for all operators
math.import({
    // arithmetic
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
    multiply(a, b) {
        return a * b;
    },
    divide(a, b) {
        return a / b;
    },
    mod(a, b) {
        return a % b;
    },
    unaryPlus(a) {
        return a;
    },
    unaryMinus(a) {
        return -a;
    },

    // bitwise
    // bitOr(a, b) {
    //     return a | b;
    // },
    // bitXor(a, b) {
    //     return a ^ b;
    // },
    // bitAnd(a, b) {
    //     return a & b;
    // },
    // bitNot(a) {
    //     return ~a;
    // },
    // leftShift(a, b) {
    //     return a << b;
    // },
    // rightArithShift(a, b) {
    //     return a >> b;
    // },
    // rightLogShift(a, b) {
    //     return a >>> b;
    // },

    // logical
    or(a, b) {
        return !!(a || b);
    },
    xor(a, b) {
        return !!a !== !!b;
    },
    and(a, b) {
        return !!(a && b);
    },
    not(a) {
        return !a;
    },

    // relational
    equal(a, b) {
        return a === b;
    },
    unequal(a, b) {
        return a !== b;
    },
    smaller(a, b) {
        return a < b;
    },
    larger(a, b) {
        return a > b;
    },
    smallerEq(a, b) {
        return a <= b;
    },
    largerEq(a, b) {
        return a >= b;
    },

    // matrix
    // matrix: function (a) { return a },
    matrix() {
        throw new Error('Matrices not supported');
    },
    index() {
        throw new Error('Matrix indexes not supported');
    },

    // add pi and e as lowercase
    pi: Math.PI,
    e: Math.E,
    true: true,
    false: false,
    null: null
});

export default math;
