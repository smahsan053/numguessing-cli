#! /usr/bin/env Node
import chalk from "chalk";
import inquirer from "inquirer";
let score = 100;
let chance = 0;
let randNum = Math.floor(Math.random() * 100) + 1;
// console.log(randNum);
let guesedNum = await inquirer.prompt([
    {
        message: "Guess the Random Number",
        type: "number",
        name: "guesedNumber",
    },
]);
const initApp = async () => {
    while (guesedNum.guesedNumber !== randNum) {
        score--;
        chance++;
        if (guesedNum.guesedNumber === undefined ||
            Number.isNaN(guesedNum.guesedNumber) ||
            guesedNum.guesedNumber === null ||
            guesedNum.guesedNumber <= 0 || guesedNum.guesedNumber > 100) {
            console.log(`${chalk.red("Please Enter a Valid Number between 1 & 100")}`);
        }
        else if (guesedNum.guesedNumber < randNum) {
            console.log(`${chalk.yellow(`${`Your Guessed Number is too Low.`}\n`)}${chalk.blueBright(`${`Please Try Again!`}`)}`);
        }
        else if (guesedNum.guesedNumber > randNum) {
            console.log(`${chalk.yellow(`${`Your Guessed Number is too High.`}\n`)}${chalk.blueBright(`${`Please Try Again!`}`)}`);
        }
        guesedNum = await inquirer.prompt([
            {
                message: "Guess the Random Number",
                type: "number",
                name: "guesedNumber",
            },
        ]);
    }
    console.log(`${chalk.green(`${`Congratulations! You Guessed it Right in ${chance + 1} tries`} \n ${`Your Score is ${score}`}`)}`);
    const newGame = await inquirer.prompt([{
            message: 'Do You Want to Play Again',
            type: "list",
            name: 'Play',
            choices: ['Y', 'N']
        }]);
    if (newGame.Play === 'Y') {
        score = 100;
        chance = 0;
        randNum = Math.floor(Math.random() * 100) + 1;
        console.log(`${chalk.greenBright('Game Restarted')}`);
        guesedNum = await inquirer.prompt([
            {
                message: "Guess the Random Number",
                type: "number",
                name: "guesedNumber",
            }
        ]);
        initApp();
    }
    else {
        console.log(`${chalk.rgb(102, 0, 102)('Quitting Game ...')}`);
    }
    return guesedNum.guesedNumber;
};
initApp();
// const main = async () => {
//     const userGuessedNum: number = await initApp()
//     return userGuessedNum
// }
// main()
