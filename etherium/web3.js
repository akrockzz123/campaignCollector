import Web3 from 'web3'; // windows is not available in server side ans next js try to run our code on server side 


let web3;

if(typeof(windows) !== 'undefined' && typeof(window.web3) !== 'undefined') {

    // we are in the browser and metamak is running

    web3 =new Web3(window.web3.currentProvider);


} else {

    // we are on the server or the user is not working on metamask

    const provider = new Web3.providers.HttpProvider(    
        'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c'
    
    );

    web3 = new Web3(provider);
}

export default web3;