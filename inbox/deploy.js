const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    'pave afraid tennis amazing concert toe dog explain glimpse asthma obscure abandon', // replace mnemonic with your own
    'https://rinkeby.infura.io/v3/0acfebeade894b578dd109dcd0662137' // replace rinkeby with your own network
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi there']})
        .send({gas: '1000000', from: accounts[0]});
    
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();