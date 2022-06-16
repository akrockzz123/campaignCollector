const assert = require('assert');

const ganache = require('ganache-cli');

const Web3 = require('web3')

const web3 = new Web3(ganache.provider())

const compiledFactory = require('../etherium/build/CampaignFactory.json');

const compileCampaign = require('../etherium/build/Campaign.json');

let accounts; // all accounts on local ganache network

let factory;

let campaignAddress;

let campaign;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) // idea of contract inside web3
               .deploy({ data: compiledFactory.bytecode })
               .send({ from: accounts[0], gas: '1000000'}); // deployment of compiledfactory code

// javascript representation of deployed contract to access methods and function of the contract

        await factory.methods.createCampaign('100').send({

            from: accounts[0],
            gas: '1000000'
        });// creating one instance of campign from compiledfactory and make it available to each if statement

        //console.log(factory)
        
         const addresses  = await factory.methods.getDeployedCampaigns().call();  // getting list of all deployed camapign contract and get first campaign

         campaignAddress = addresses[0];

        campaign = await new web3.eth.Contract(       // instance of campaign created because it is already deployed
            JSON.parse(compileCampaign.interface),
            campaignAddress
        );

       
});

describe('Campaigns', () => {

    it('deploys a factory and a campaign', () => {

        assert.ok(factory.options.address);

        assert.ok(campaign.options.address);
    });// check if bith contracts have been deployed or not

    it('checks if user is manager or not', async () => {

        const manager = await campaign.methods.manager().call();

        assert.equal(manager,accounts[0]);
    }); // check if user who created factory contract is manager of campaign contract or not

    // can call public variable as a function

    it('allows people to contribute money and make them approver or not', async () => {

        await campaign.methods.contribute().send({
            
            value : '200',
            from: accounts[1]

        }); // making user to contribute by calling contribute function

        const isContributor = await campaign.methods.approvers(accounts[1]).call() //calling approvers map to check if it is contributor or not

        assert(isContributor);
        
    });


    it('requires a minimum contribution',async () => {

        try {

            await campaign.methods.contribute().send({

                value: '5',

                from : accounts[1]
            });

            assert(false);

        } catch (err) {
            
            assert(err);
        }
    });


    it('allows a manager to make a payment request', async () => {

       
            
            await campaign.methods.createRequest("for electronics item", '1000',accounts[2])
                 .send({

                    from : accounts[0],
                    gas: '1000000'
                 });

            const request = await campaign.methods.requests(0).call();

            assert.equal("for electronics item", request.description);

       
    });


    it('processes request', async () => {

        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        }); // contribute to a campaign

        await campaign.methods.createRequest('A', web3.utils.toWei('5' , 'ether'), accounts[1])
              .send({from: accounts[0], gas : '1000000'}); // create new request by manager

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        }); // vote for the request

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        }); // finalize the request

        let balance = await web3.eth.getBalance(accounts[1]); // getBalance returns string 

        balance = web3.utils.fromWei(balance, 'ether');

        balance = parseFloat(balance); // converts string to decimal number

        console.log(balance);

        assert(balance > 104)

    });
});

