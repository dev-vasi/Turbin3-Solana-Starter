import wallet from "../../Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const image = await readFile('/Users/vasi/myGitHub/Turbin3/solana-starter/generug.png');
        //2. Convert image to generic file.
        const genericFile = await createGenericFile(image, 'bigrug.png', {
            tags: [{ name: 'Content-Type', value: 'image/png' }],
          });
        //3. Upload image
        const [myUri] = await umi.uploader.upload([genericFile]);
            console.log('Your image URI: ', myUri);

        //const image = "https://devnet.irys.xyz/Gs9hGCTF5yhNyuBdcNtYhjN21SEYMJGcsDPPUuHHUjzx"

        // const [myUri] = ??? 
        // console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
