import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/Agrements.json";
import {default as contract} from 'truffle-contract'


let Series = contract(metaCoinArtifact);


const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      
      // get contract instance
      Series.setProvider(web3.currentProvider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = _build_contracts_Agrements_json__WEBPACK_IMPORTED_MODULE_1__.networks[5777];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      // this.refreshBalance();
     
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
    App.refreshContractData();
  },
  refreshContractData: function(){
    let series;
    Series.deployed().then(function (instance) {
      // we keep a reference to the contract instance in order to be able to call several functions on it
      series = instance;
      // since we have the contract instance's address, we update the link in the support modal
      //$('#supportContractAddress').prop('href', 'https://etherscan.io/address/' + instance.address);
      // we load the title of the series contract
      return series.purchaser();
  }).then(function (purchaser) {
    console.log(purchaser)
    $('#title').html('Purchaser ' + purchaser);
    return series.seller()
  }).then(function(seller){
    $('#title').html( $('#title').html() + '/ Seller ' + seller);
    
    return series.totalTransactions()
  }).then(function(tx){
    
    $('#totalTransactions').html(tx.c[0] + ' Transactions' )
    return series.totalAmountTransfered()
  }).then(function(amount){
    debugger
    $('#amountTransfered').html(amount.c[0])
  })


  },
  publish: function () {
debugger
        web3.eth.getAccounts(function (error, accounts) {
          // we make sure an account is selected (Metamask is unlocked)
        
              Series.deployed().then(function (instance) {
                  // the user specifies the pledge value in ETH, so we need to convert it into wei before calling the contract
                
                  // we call the pledge function on the contract, specifying a gas value that corresponds to an upper value estimation
                  // of how complex this operation will be
                  return instance.tarnsaction({from: accounts[0], value: web3.toWei(10, "ether"), gas: 500000});
              }).then(function (result) {
                  // result contains the receipt of the transaction that was triggered
                  console.log(result);
                  App.refreshContractData();
              });
            });

  },



  // refreshBalance: async function() {
  //   const { getBalance } = this.meta.methods;
  //   const balance = await getBalance(this.account).call();

  //   const balanceElement = document.getElementsByClassName("balance")[0];
  //   balanceElement.innerHTML = balance;
  // },

  // sendCoin: async function() {
  //   const amount = parseInt(document.getElementById("amount").value);
  //   const receiver = document.getElementById("receiver").value;

  //   this.setStatus("Initiating transaction... (please wait)");

  //   const { sendCoin } = this.meta.methods;
  //   await sendCoin(receiver, amount).send({ from: this.account });

  //   this.setStatus("Transaction complete!");
  //   this.refreshBalance();
  // },

  // setStatus: function(message) {
  //   const status = document.getElementById("status");
  //   status.innerHTML = message;
  // },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
  }

  App.start();
});
