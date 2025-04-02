import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../../Turbin3-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("28t2kUraauxhmF1GETaXRFMJN2fTsMbvM9dtdtzEPdMR");

// Recipient address
const to = new PublicKey("BBWpMG3mXtGVMNVzGJSAVjkKqVixMXepWELv3fBL1RtU");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it

    let fromAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it

    let toAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );

    // Transfer the new token to the "toTokenAccount" we just created

    const transferSig = await transfer(
      connection,
      keypair,
      fromAccount.address,
      toAccount.address,
      keypair.publicKey,
      Number(1_000_000n)
    );

    console.log(`Your transfer txid: ${transferSig}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
