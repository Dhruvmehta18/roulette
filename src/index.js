import chalk from "chalk";
import prompt from "prompt-sync";
import { Keypair } from "@solana/web3.js";
import { getReturnAmount, randomNumber } from "./helper.js";
import { getWalletBalance, airDropSol, transferSOL } from "./solana.js";

const log = console.log;
const p = prompt({sigint: true})

const askQuestion = (question = "") => {
    return p(chalk.green("? ") + question);
}

const userWallet= Keypair.fromSecretKey(Uint8Array.from(new Keypair()._keypair.secretKey));
const stakeWallet= Keypair.fromSecretKey(Uint8Array.from(new Keypair()._keypair.secretKey));

const incLiquidity = async (wallet = new Keypair()) => {
    await airDropSol(wallet.publicKey, 5);
}

const gameExecution = async () => {
    let currBalance = await getWalletBalance(userWallet.publicKey);
    log(chalk.yellow("The max bidding amount is 2.5 SOL here\n"));
    let amount = parseInt(askQuestion('What is the amount of SOL you want to stake? '))
    await airDropSol(userWallet.publicKey, amount - currBalance);
    const ratios = askQuestion('What is the ratio of staking? (e.g 1:2 or 1:1.5) ').split(":")
    const ratio = parseFloat(ratios[1])/parseFloat(ratios[0]);
    log(chalk.white(`\nYou need to pay ${chalk.green(amount)} to move forward`));
    const returnAmount = getReturnAmount(amount, ratio);
    log(chalk.green(`You will get ${chalk.bold(returnAmount)} if guessing the number correctly`));
    const guess = parseInt(askQuestion("Guess a number from 1 to 5 (both inclusive)"))
    const signaturePayment = await transferSOL(userWallet, stakeWallet, amount);
    log(chalk.white(`Signature of payment for playing the game ${signaturePayment}`))
    if(randomNumber(1, 5) === guess){
        log(chalk.green.bold("Your guess is absolutely correct"));
        const signaturePrice = await transferSOL(stakeWallet, userWallet, returnAmount);
        log(chalk.white(`here is the price signature ${signaturePrice}`))
    } else {
        log(chalk.yellow("Better luck next time"));
    }
}
await incLiquidity(stakeWallet);
await gameExecution();