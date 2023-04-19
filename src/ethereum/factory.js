import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x6DF373ce401B63792dFa558AE5AFF7A6A1145af5"
);

export default instance;