import {Liveblocks} from "@liveblocks/node";
const key=process.env.LIVEBLOCKS_PRIVATE_KEY;
if(!key){
    throw new Error("LIVEBLOCKS_PRIVATE_KEY is not set")
}
const liveblocks = new Liveblocks({
    secret: "sk_dev_Hq6SAOVU4P69rMgb-DyHkEWqQOsoKmECgiD2p9qTZfiyw9BByawsTbrNJJnEzwyF",
  });
export default liveblocks;