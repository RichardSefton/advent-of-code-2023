import { input } from './input.js';

// const input = `...............547..............25*32.......*..*.......64..-813..........405.........802...*............188............246.236..............
// 652................*426...................74.....822...*.................*...533....*....764..............*....................%............
// ....920.64......437......598....738..#..............+..44...625...*....879......*..879.......668.#.......509...385..123....677..553.62......
// ....*....+.783..........*..........*.552...534...............*.....312........=.........@...-....819............#..-..........*.............
// ....779.......&....21..582......264.........*.............564...............561........811...........................943....68..$...........
// .....................&.....................915.472*918.................848.......943.........803....................*..........386..........`

// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`

//Looks like we get to have fun with a matrix (n, m) in this one.
//This would probably be easier in python...

export const parseInput = (pInput) => pInput.split('\n');

const inputArr = parseInput(input);

const findValidEngineParts = (arr) => {
    const potentialEngineParts = {};
    arr.forEach((row, i) => {
        potentialEngineParts[i] = [...row.split(/\D/)?.filter(el => !!el)].map(el => {
            //we want to record the number along with the metadat (index, length)
            //build a regex to isolate the number. it should be a non int char followed byt the number followed by a non int char
            let regex = new RegExp(`\\D?${el}\\D`);
            if (!row.match(regex)) regex = new RegExp(`\\D?${el}$`);
            const substring = row.match(regex)[0];

            const meta = {
                num: parseInt(el),
                index: row.indexOf(substring),
                length: substring.length
            };
            
            //for instances of repeated data. 
            row = row.replace(regex, '.'.repeat(substring.length));

            return meta;
        });
    });

    const validEngineParts = [];
    Object.keys(potentialEngineParts).forEach((key) => {
        const row = parseInt(key);
        potentialEngineParts[key].forEach((el, i) => {
            //for each element we should isolate the relevant row in the matrix
            const { num, index: col, length } = el;
            //make a scan array of 3 rows and columns equal to length + 2. This should be populated with the values
            //in the matrix. rows should be row - 1, row, row + 1. columns should be col - 1, ...length, length + 1
            //if the row is first or last we should adjust the scan array rows accordingly
            const scanArray = makeScanArray(arr, row, col, length);
            if (scanArrayIsValid(scanArray, row)) {
                validEngineParts.push(num);
            }
        });
    });
    return validEngineParts;
};

const scanArrayIsValid = (scan, row) => {
    let pass = false;
    if (row === 0) {
        //first row should contain the number so we only care about first and last cols here.
        const split = scan[0].split(/(?!^)/);
        if ((split[0] !== '.' && /[\D]/.test(split[0])) || (split[split.length - 1] !== '.' && /[\D]/.test(split[split.length - 1]))) pass = true;
        //check the line below
        else if (/[^\.]/.test(scan[1])) pass = true;
        //otherwise return false
        return pass;
    }
    //otherwise we can iterate. 
    for (let i = 0; i < scan.length; i++) {
        //middle row only care about first ans last
        const split = scan[1].split(/(?!^)/);
        if (i === 1 && ((split[0] !== '.' && /[\D]/.test(split[0])) || (split[split.length - 1] !== '.' && /[\D]/.test(split[split.length - 1])))) {
            pass = true;
        } else if (i !== 1 && (/[^\.]/.test(scan[i]))) {
            pass = true;
        }
    }
    return pass;
}

const makeScanArray = (arr, row, col, length) => {    
    const scanArray = [];
    const rowAbove = row -1;
    const rowBelow = row + 1;
    const colLeft = col;
    const colRight = col + length;
    const rowAboveExists = !!arr[rowAbove];
    const rowBelowExists = !!arr[rowBelow];

    if (rowAboveExists) {
        scanArray.push(arr[rowAbove].slice(colLeft, colRight));
    }
    scanArray.push(arr[row].slice(colLeft, colRight));
    if (rowBelowExists) {
        scanArray.push(arr[rowBelow].slice(colLeft, colRight));
    }
    return scanArray;
}

const validEngineParts = findValidEngineParts(inputArr)
console.log(validEngineParts.reduce((acc, cur) => acc + parseInt(cur), 0));