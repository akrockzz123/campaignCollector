import web3 from './web3.js'; // small case web3 we aregetting instance that we cretaed




import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(

    JSON.parse(CampaignFactory.interface),

    '0x1473551e9873131Be02890cBcdb1566358E2347f'
); // tell web3 that deployed contract of web3 exists

// use Remix to create new instance of campign contract by entering the address of deployed contract

export default instance;