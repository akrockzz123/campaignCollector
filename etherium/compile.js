const path = require('path');

const solc = require('solc'); // solidity compiler

const fs = require('fs-extra');


const buildPath = path.resolve(__dirname,'build') // finding address build folder

fs.removeSync(buildPath); // delete entire build folder

const CampaignPath = path.resolve(__dirname,'contracts','Campaign.sol'); // finding address of Campaign.sol file

const source = fs.readFileSync(CampaignPath,'utf8'); // read Campaign.sol file

const output = solc.compile(source,1).contracts // compiling source using solidity compiler

fs.ensureDirSync(buildPath) //create build folder

// saving compiled out put in build folder

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':', '') + '.json'),

        output[contract]
    );
}




