import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x2e52e22be00eD6827e2bd08614358a4305D96DbA"
);

export default instance;