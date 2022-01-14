import {
     Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, Transaction, sendAndConfirmTransaction 
    } from "@solana/web3.js";

const getWalletBalance = async (pubk) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletBalance = await connection.getBalance(new PublicKey(pubk));
        console.log(`=> For wallet address ${pubk}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
        return walletBalance/LAMPORTS_PER_SOL;
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (pubk, amount) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        console.log(`-- Airdropping ${amount} SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(pubk),
            2.5 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const transferSOL=async (from,to,transferAmt)=>{
    try{
        const connection=new Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const transaction=new Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey:new PublicKey(from.publicKey.toString()),
                toPubkey:new PublicKey(to.publicKey.toString()),
                lamports:transferAmt*web3.LAMPORTS_PER_SOL
            })
        )
        const signature=await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    }catch(err){
        console.log(err);
    }
}

export {
    getWalletBalance,
    airDropSol,
    transferSOL
}