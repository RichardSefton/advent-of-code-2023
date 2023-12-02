import { input } from "./input.js";

// const input = `Game 1: 1 blue, 1 red; 10 red; 8 red, 1 blue, 1 green; 1 green, 5 blue
// Game 2: 9 green, 11 red; 1 green, 7 red, 1 blue; 1 red, 1 blue, 1 green; 11 green, 3 red, 1 blue; 5 green, 12 red; 8 green, 1 blue, 7 red
// Game 3: 16 blue, 2 red, 4 green; 8 red, 4 green; 7 green, 16 blue
// Game 4: 3 green, 4 blue, 6 red; 7 red, 12 green, 5 blue; 5 green, 16 red, 8 blue
// Game 5: 4 green, 4 blue, 3 red; 4 green, 7 red, 1 blue; 2 blue, 2 red, 4 green; 3 green, 7 red, 4 blue; 2 blue, 3 green, 8 red
// Game 6: 3 green, 4 blue, 10 red; 13 red, 3 green, 4 blue; 11 red; 14 red, 1 green; 6 red, 2 green, 1 blue; 10 red, 1 blue, 1 green
// Game 7: 2 green, 9 red, 9 blue; 12 red, 14 blue; 8 red, 3 green
// Game 8: 9 green, 1 red; 18 green, 2 red, 7 blue; 1 blue, 9 green, 3 red; 3 red, 15 blue, 18 green
// Game 9: 2 red, 1 blue, 10 green; 4 red, 1 blue, 5 green; 6 green, 3 red; 1 green, 2 blue; 8 red
// Game 10: 9 green; 6 red, 4 green, 4 blue; 9 red, 2 blue, 9 green; 8 blue, 9 red, 12 green; 4 red, 8 green, 2 blue; 6 green, 7 blue`;

const parseInput = (pInput) => {
    const lines = pInput.split("\n").filter(el => !!(el));
    //We need a data structure that will hold the data in a way that we can easily access it.
    //Order matters here so instead of an object we're going to build a hashmap. 
    const hashmap = {};
    lines.forEach((l, i)=> {
        const hashGameLines = {};
        const gameLines = l.split(/[:|;]/).splice(1);
        gameLines.forEach((gl, j) => {
            const game = {};
            const split = gl.split(',');
            split.forEach((sub, k) => {
                const subSplit = sub.trim().split(' ');
                game[`${subSplit[1]}`] = subSplit[0];
            });
            hashGameLines[`${j+1}`] = game;
        });
        const rgbMaxHash = { red: 0, green: 0, blue: 0 };
        Object.keys(hashGameLines).forEach(key => {
            if (!!(hashGameLines[key].red) && parseInt(hashGameLines[key].red) > rgbMaxHash.red)
                rgbMaxHash.red = parseInt(hashGameLines[key].red);
            if (!!(hashGameLines[key].green) && parseInt(hashGameLines[key].green) > rgbMaxHash.green)
                rgbMaxHash.green = parseInt(hashGameLines[key].green);
            if (!!(hashGameLines[key].blue) && parseInt(hashGameLines[key].blue) > rgbMaxHash.blue)
                rgbMaxHash.blue = parseInt(hashGameLines[key].blue)
        })
        hashGameLines.rgb = rgbMaxHash;
        hashmap[`${i+1}`] = hashGameLines;
    });
    return hashmap;
}

const checkValues = (hashmap) => {
    //possible game values = 12 red cubes, 13 green cubes, and 14 blue cubes.
    let sum = 0;
    Object.keys(hashmap).forEach(key => {
        if (hashmap[key].rgb.red <= 12 && hashmap[key].rgb.green <= 13 && hashmap[key].rgb.blue <= 14) {
            sum = sum + parseInt(key);
        }
    });
    console.log(sum);
};

const rgbMinPowers = (hashmap) => {
    let sum = 0;
    Object.keys(hashmap).forEach(key => {
        const p = hashmap[key].rgb.red * hashmap[key].rgb.green * hashmap[key].rgb.blue;
        sum += p;
    });
    console.log(sum);
};

checkValues(parseInput(input));
rgbMinPowers(parseInput(input));
