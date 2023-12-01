//We need the puzzle input. 
//We don't care about non numeric chars so we'll remove them. 
//We'll split the string into an array of ints.
import { input } from "./input.js";

const convertInputToArray = (pInput) => pInput.split("\n").filter(el => !!(el));

//So some of the inputs have the numbers spelt out. They are valid and should be 
//converted to a string representation of their numeric char also.
const convertStringToNumber = (str) => {
    //We could do a switch, but this feels messy. Lets see if we can get a regex patten to replace the string with the number.
    const strMap = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9' };
    const regex = new RegExp(Object.keys(strMap).join("|"), "gi");

    //because the numbers are daisychained sometimes we want the chars just jammed into the middle of the str representation of the number.
    const onePass = str.replace(regex, (matched) => `${matched.slice(0, matched.length/2)}${strMap[matched.toLowerCase()]}${matched.slice(matched.length/2)}`);
    //Might not be effective on one pass because of how the regex works.
    return onePass.replace(regex, (matched) => `${matched.slice(0, matched.length/2)}${strMap[matched.toLowerCase()]}${matched.slice(matched.length/2)}`);
}

const removeChars = (inputsArr) => inputsArr.map((i) => convertStringToNumber(i).replace(/(\D)*/g, ''));

const sumOfInputs = (inputsArr) => inputsArr.reduce((acc, curr) => {
    const splitEl = curr.split('');
    const firstEl = splitEl[0];
    const lastEl = splitEl[splitEl.length - 1];
    return acc + parseInt(`${firstEl}${lastEl}`);
}, 0);

console.log(sumOfInputs(removeChars(convertInputToArray(input))));
