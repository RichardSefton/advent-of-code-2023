//We need the puzzle input. 
//We don't care about non numeric chars so we'll remove them. 
//We'll split the string into an array of ints.

import { input } from "./input.js";

const convertInputToArray = (pInput) => pInput.split("\n");
const removeChars = (inputsArr) => inputsArr.map((i) => i.replace(/(\D)*/g, '')).filter(el => !!(el));

const sumOfInputs = (inputsArr) => inputsArr.reduce((acc, curr) => {
    const splitEl = curr.split('');
    const firstEl = splitEl[0];
    const lastEl = splitEl[splitEl.length - 1];
    console.log(`${firstEl}${lastEl}`);
    return acc + parseInt(`${firstEl}${lastEl}`);
}, 0);

console.log(sumOfInputs(removeChars(convertInputToArray(input))));
