import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x6c4Ea5Cd6BC45387e8D029B1486Cd16B402511a5"
);

export default instance;