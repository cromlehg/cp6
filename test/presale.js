/*var PreSale = artifacts.require("./PreSale.sol");

contract('PreSale', function(accounts) {
 

  //==================== investments time tests ========================//
  //
  // owner initialized in customer way - changed to customer after deploy
  // wallet initialized as 2
  // otjer fields initialized in after deploy state
  // detailed:
  //   account 0 - old owner
  //   account 1 - current owner
  //   account 2 - wallet
  //   start - 0 - should change in current tests
  //   period - 5
  //   paused = not
  //
  //   work account - 3
  //

  it("investment time test: should not invest before start date", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) + 60*60;
    var invested = web3.toWei(15, 'ether');
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      assert.equal(0, total, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.total.call().then(function(total) {
          assert.equal(0, total, "invested");
        });
      } else {
        throw e;
      }
    });
  });

  it("investment time test: should not invest after start date", function() {
    var meta;
    var startDate = Math.floor(Date.now()/1000) - 10*24*60*60;
    var invested = web3.toWei(15, 'ether');
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested, gas: 180000 })
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      assert.equal(0, total, "invested");
    }).catch(function(e) {
      if(e.toString().indexOf("invalid opcode") != -1) {
        return meta.total.call().then(function(total) {
          assert.equal(0, total, "invested");
        });
      } else {
        throw e;
      }
    });
  });

  //======================= integration test ==========================================//
  //
  // send from account 3 - 15
  // send from account 4 - 40
  // send from account 5 - 65
  //
  it("Integration test during invest time", function() {
    var meta;
    var gasNeeds = 140000;
    var startDate = Math.floor(Date.now()/1000) - 2*24*60*60;
    var invested1 = parseInt(web3.toWei(15, 'ether'));
    var invested2 = parseInt(web3.toWei(40, 'ether'));
    var invested3 = parseInt(web3.toWei(165, 'ether'));
    var invested4 = parseInt(web3.toWei(385, 'ether'));
    var walletBalance;
    return PreSale.deployed().then(function(instance) {
      meta = instance;
      return meta.setStart(startDate, {from: accounts[1]});
    }).then(function(wallet) {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      walletBalance = parseInt(balance);
      return web3.eth.sendTransaction({ from: accounts[3], to: meta.address, value: invested1, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1, total, "wrong total field");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(1, totalInvestors, "wrong investors count");
    }).then(function() {
      return meta.investors.call(0);
    }).then(function(investor) {
      return assert.equal(accounts[3], investor, "wrong investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[3]);
    }).then(function(balance) {
      return assert.equal(invested1, balance, "wrong investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      console.log("Wallet old balance: " + walletBalance);
      console.log("Ivested: " + invested1);
      console.log("Wallet current balance: " + balance);
      console.log("Wallet current balance should be: " + (walletBalance + invested1));
      return assert.equal(walletBalance + invested1, balance, "wrong wallet balance");
    // 2
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[4], to: meta.address, value: invested2, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2, total, "wrong total field after second invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(2, totalInvestors, "wrong investors count - should be 2");
    }).then(function() {
      return meta.investors.call(1);
    }).then(function(investor) {
      return assert.equal(accounts[4], investor, "wrong second investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[4]);
    }).then(function(balance) {
      return assert.equal(invested2, balance, "wrong second investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      return assert.equal(walletBalance + invested1 + invested2, balance, "wrong wallet balance after second investor");
    // 3
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[5], to: meta.address, value: invested3, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2 + invested3, total, "wrong total field after thrid invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(3, totalInvestors, "wrong investors count - should be 3");
    }).then(function() {
      return meta.investors.call(2);
    }).then(function(investor) {
      return assert.equal(accounts[5], investor, "wrong thrid investor address");
    }).then(function() {
      return meta.balanceOf.call(accounts[5]);
    }).then(function(balance) {
      return assert.equal(invested3, balance, "wrong thrid investor balance");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {
      return assert.equal(walletBalance + invested1 + invested2 + invested3, balance, "wrong wallet balance after thrid investor");
    // 3x2
    }).then(function() {
      return web3.eth.sendTransaction({ from: accounts[5], to: meta.address, value: invested4, gas: gasNeeds });
    }).then(function() {
      return meta.total.call();
    }).then(function(total) {
      return assert.equal(invested1 + invested2 + invested3 + invested4, total, "wrong total field after trid twice invest");
    }).then(function() {
      return meta.totalInvestors.call();
    }).then(function(totalInvestors) {
      return assert.equal(3, totalInvestors, "wrong investors count after twice invest - should be 3");
    }).then(function() {
      return meta.balanceOf.call(accounts[5]);
    }).then(function(balance) {
      return assert.equal(invested3 + invested4, balance, "wrong thrid investor balance afte twice invest");
    }).then(function() {
      return web3.eth.getBalance(accounts[2]);
    }).then(function(balance) {

      console.log("====================================================================");
      var invested = invested1 + invested2 + invested3 + invested4;
      console.log("Wallet old balance: " + walletBalance);
      console.log("Ivested: " + invested);
      console.log("Wallet current balance: " + balance);
      console.log("Wallet current balance should be: " + (walletBalance + invested));


      return assert.equal(walletBalance + invested1 + invested2 + invested3 + invested4, balance, "wrong wallet balance after thrid twice invest");
    });

  });


});*/
