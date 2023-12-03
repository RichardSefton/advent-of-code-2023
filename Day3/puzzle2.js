//Going to take a different approach to this one.

import { input } from './input.js';
import { parseInput } from './puzzle.js';

const inputArr = parseInput(input).map(el => el.split(/(?!^)/));

const gearRatios = arr => {
    const ratios = [];
    for (let r = 0; r < arr.length; r++) {
            //boundaries
        if (r > 1 && r < arr.length - 1)
            handleNormalLine(r, arr);

        else
            continue;
    }
};

const handleNormalLine = (r, arr) => {
    const upper = arr[r - 1];
    const lower = arr[r + 1];

    for (let c = 0; c < arr[r].length; c++) {
        if (arr[r][c] === '*') {
            const product = handleNormalCol(r, c, arr, upper, arr[r], lower);
        }
    }
};

const handleNormalCol = (r, c, arr, upper, row, lower) => {
    const u = upper.slice(c - 1, c + 2);
    const m = row.slice(c - 1, c + 2);
    const l  = lower.slice(c - 1, c + 2);

    const numberInUpper = u.findIndex(el => /\d/.test(el)).length;
    const numberInMiddle = m.findIndex(el => /\d/.test(el)).length;
    const numberInLower = l.findIndex(el => /\d/.test(el)).length;

    const n1 = [], n2 = [];
    console.log({numberInUpper, numberInMiddle, numberInLower})
    if (numberInUpper) {
        if (numberInUpper === 0) {
            let startOffset = numberInUpper;
            while (!isNaN(u[(c-1) - startOffset])) {
                startOffset--;
            }
            console.log(startOffset);
        }
    }
}

gearRatios(inputArr);