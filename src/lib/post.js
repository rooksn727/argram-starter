import { split, map, trim} from "ramda";
import { WarpFactory } from "warp-contracts";
import { DeployPlugin, ArweaveSigner } from "warp-contracts-plugin-deploy";

const SRC = 'NecNCKFl4PzmmqkRp76gdrkDMcdW5YlWU9jd7augwP0';


// function to convert input image to type `ArrayBuffer`
// takes in image file
const toArrayBuffer = (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.addEventListener("loadend", (evt) => {
      resolve(evt.target.result);
    });
  });


// intiating new warp instance for mainnet
const warp = WarpFactory.forMainnet().use(new DeployPlugin());


// function to post asset to network
// takes in 'asset' information
export async function postAsset(asset) {

    // converts file to 'ArrayBuffer'
    const data = await toArrayBuffer(asset.file);

    // array of input tags
  const inputTags = [
    { name: 'Creator-Name', value: asset.username },
    { name: 'Creator', value: asset.userid },
    { name: 'Title', value: asset.title },
    { name: 'Description', value: asset.description },
    { name: 'Type', value: 'image' },
  ];

    // adding hashtags passed in by users to the 'inputTags' array
  map(trim, split(',', asset.topics)).forEach(t => {
    inputTags.push({ name: 'Topic:' + t, value: t });
  });
  
  // creating dummy wallet
  const { jwk } = await warp.generateWallet();

    // function call to create post referencing the contract source
  const { contractTxId } = await warp.deployFromSourceTx({
    wallet: new ArweaveSigner(jwk),
    initState: JSON.stringify({
      creator: asset.userid,
      ticker: "ARGRAM-ASSET",
      balances: {
        [asset.userid]: 10000
      },
      contentType: asset.file.type,
      comments: [],
      likes: {},
    }),
    srcTxId: SRC,
    data: { 'Content-Type': asset.file.type, body: data },
    tags: inputTags,
  });

    // returns transaction id of post
  return contractTxId;
}
