#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
const enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
// Game Variables
let maxEnemyHealth = 75; // maxmimum health for enemy
let enemyAttackDamage = 25; // maximum damage from enemy
// Player variables
let health = 100; // user Health in begining of the Game
let attackDamage = 50; // user maxmimum attack
let numhealthPotions = 3; // Health potion to reheal
let healthPotionHealAmount = 30; // Rehealing amount to user HP
let healthPotionDropChance = 50; // fifty percent chance, will enemy drop a potion or No
let running = true; // condition for play game
console.log(chalk.black(chalk.bgRgb(252, 186, 3)("\tWelcome To The Dungeon!"))); // welcome Note
Game: while (running) {
    console.log("---------------------------------------------------------------------------");
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth); //randomly genrating enemy health (0 - 75)
    let enemy = enemies[Math.floor(Math.random() * enemies.length)]; // randomly genrating enemy from arry[]
    console.log(chalk.rgb(252, 186, 3)(`\t# ${enemy} has appeared! #\n`)); // declaring which enemy has appeared
    while (enemyHealth > 0) { // game will continue until emeny's health greater than zero
        console.log(chalk.rgb(224, 81, 200)(`\tYour HP: ${health}`)); // showing user hp in the starting of game
        console.log(chalk.rgb(224, 81, 200)(`\t${enemy}'s HP: ${enemyHealth}`)); // showing enemy's hp in the starting of game
        let answer = await inquirer.prompt([
            {
                name: "choice",
                message: "\n\tWhat would you Like to Do?",
                type: "list",
                choices: ["\t1. Attack", "\t2. Drink Health Potion", "\t3. Run!"]
            }
        ]);
        if (answer.choice === "\t1. Attack") {
            let damageDealt = Math.floor(Math.random() * attackDamage);
            let damageTaken = Math.floor(Math.random() * enemyAttackDamage);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log(chalk.rgb(207, 114, 33)(`\tYou Strike The ${enemy} for ${damageDealt} Damage`));
            console.log(chalk.rgb(186, 136, 9)(`\tYou Recive ${damageTaken} in retaliation`));
            if (health < 1) {
                console.log(chalk.redBright(`\t> You have taken too much damage, You are too week to go on! `));
                break;
            }
        }
        else if (answer.choice === "\t2. Drink Health Potion") {
            if (numhealthPotions > 0) {
                health += healthPotionHealAmount;
                numhealthPotions--;
                console.log(chalk.rgb(247, 103, 7)(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.`));
                console.log(chalk.rgb(161, 214, 2)(`\n\t> You Now have ${health} HP.`));
                console.log(chalk.rgb(5, 247, 211)(`\n\t> You have ${numhealthPotions} Health potion left.\n`));
            }
            else {
                console.log(`\t> You have no Health potion left! Defeat enemies for a chance to get one!\n`);
            }
        }
        else {
            console.log(chalk.rgb(27, 191, 114)(`\t You Run away from the ${enemy}!`));
            continue Game;
        }
    }
    if (health < 1) {
        console.log(chalk.red(`\tYou limp out of the dugeon, weak from battle.\n`));
        break;
    }
    console.log("---------------------------------------------------------------------------");
    console.log(chalk.rgb(247, 42, 80)(` # ${enemy} was defeated! # `));
    console.log(chalk.rgb(10, 250, 50)(` # You have ${health} HP left. # `));
    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
        numhealthPotions++;
        console.log(chalk.bgCyan(chalk.black(`# The ${enemy} droped a Health potion! #`)));
        console.log(chalk.cyan(`# You now have ${numhealthPotions} Health potion(s) #`));
    }
    console.log("---------------------------------------------------------------------------");
    let userinput = await inquirer.prompt({
        name: "input",
        message: "\tWhat would you like to do now?\n",
        type: "list",
        choices: ["1. Continue Fighting", "2. Exit dugeon"]
    });
    if (userinput.input == "1. Continue Fighting") {
        console.log(`\t\nYou Continue on your adventure`);
    }
    else if (userinput.input == "2. Exit dugeon") {
        console.log(chalk.bgGreenBright(chalk.black(`\t\nYou Exit the dugeon, successful from Your adventure!\n`)));
        break;
    }
}
console.log((chalk.red(`\t######################`)));
console.log((chalk.red("\t#")) + chalk.yellow(" Thanks for Playing ") + (chalk.red("#")));
console.log((chalk.red(`\t######################`)));
