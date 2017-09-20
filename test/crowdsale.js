
import ether from './helpers/ether'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'
import EVMThrow from './helpers/EVMThrow'

const BigNumber = web3.BigNumber

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()


const PreSale = artifacts.require('PreSale')

contract('PreSale', function(wallets) {

  const owner = wallets[0]

  const notOwner = wallets[1]

  const newOwner = wallets[2]

  const wallet = wallets[3]

  const newWallet = wallets[4]

  const period = new BigNumber(60)

  const min = new BigNumber(1000000000000000000)

  const start = new BigNumber(1613205200)

  const hardcap = new BigNumber(9000000000000000000)

  const newMin = new BigNumber(1000000000000000000)

  const newPeriod = new BigNumber(70)

  const newStart = new BigNumber(1614505200)

  const newHardcap = new BigNumber(10000000000000000000)


  before(async function() {
   //Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
   await advanceBlock()
  })


  beforeEach(async function () {
    this.presale = await PreSale.new()
  })	 


  describe('owner tests', function () {

    it('should be owner', async function () {
      owner.should.equal(await this.presale.owner())
    })	 

    it('should reject transfer ownership if not owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: notOwner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject setMin if not owner', async function () {
      await this.presale.setMin(min, {from: notOwner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject setWallet if not owner', async function () {
      await this.presale.setWallet(wallet, {from: notOwner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject setHardcap if not owner', async function () {
      await this.presale.setHardcap(hardcap, {from: notOwner}).should.be.rejectedWith(EVMThrow)
    })	 
    
    it('should reject setStart if not owner', async function () {
      await this.presale.setStart(start, {from: notOwner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject setPeriod if not owner', async function () {
      await this.presale.setPeriod(period, {from: notOwner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should changed min if owner', async function () {
      await this.presale.setMin(min, {from: owner})
      min.should.be.bignumber.equal(await this.presale.min())
    })	 

    it('should changed wallet if owner', async function () {
      await this.presale.setWallet(wallet, {from: owner})
      wallet.should.equal(await this.presale.wallet())
    })	 

    it('should changed hardcap if owner', async function () {
      await this.presale.setHardcap(hardcap, {from: owner})
      hardcap.should.be.bignumber.equal(await this.presale.hardcap())
    })	 
    
    it('should changed start if owner', async function () {
      await this.presale.setStart(start, {from: owner})
      start.should.be.bignumber.equal(await this.presale.start())
    })	 

    it('should changed period if owner', async function () {
      await this.presale.setPeriod(period, {from: owner})
      period.should.be.bignumber.equal(await this.presale.period())
    })	 

    it('owner should changed if owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      newOwner.should.equal(await this.presale.owner())
    })

    it('should reject setMin if old owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setMin(min, {from: owner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject setWallet if old owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setWallet(newOwner, {from: owner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject transfer ownership if old owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.transferOwnership(newOwner, {from: owner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject setHardcap if old owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setHardcap(hardcap, {from: owner}).should.be.rejectedWith(EVMThrow)
    })	 
    
    it('should reject setStart if old owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setStart(start, {from: owner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should reject setPeriod if old owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setPeriod(period, {from: owner}).should.be.rejectedWith(EVMThrow)
    })	 

    it('should changed min if new owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setMin(newMin, {from: newOwner})
      newMin.should.be.bignumber.equal(await this.presale.min())
    })	 

    it('should changed wallet if new owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setWallet(newWallet, {from: newOwner})
      newWallet.should.equal(await this.presale.wallet())
    })	 

    it('should changed hardcap if new owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setHardcap(newHardcap, {from: newOwner})
      newHardcap.should.be.bignumber.equal(await this.presale.hardcap())
    })	 
    
    it('should changed start if new owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setStart(newStart, {from: newOwner})
      newStart.should.be.bignumber.equal(await this.presale.start())
    })	 

    it('should changed period if new owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.setPeriod(newPeriod, {from: newOwner})
      newPeriod.should.be.bignumber.equal(await this.presale.period())
    })	 

    it('owner should changed if new owner', async function () {
      await this.presale.transferOwnership(newOwner, {from: owner})
      await this.presale.transferOwnership(owner, {from: newOwner})
      owner.should.equal(await this.presale.owner())
    })

  })

/*
  it('common sale should add/insert/remove/clear/change milestone', async function () {
    await this.crowdsale.addMilestone(m0Period, m0Bonus, {from: owner})
    const m0 = await this.crowdsale.milestones(0)
    m0[0].should.be.bignumber.equal(m0Period)
    m0[1].should.be.bignumber.equal(m0Bonus)
    const count0 = await this.crowdsale.milestonesCount()
    count0.should.be.bignumber.equal(1)
    m0Period.should.be.bignumber.equal(await this.crowdsale.totalPeriod())
    await this.crowdsale.addMilestone(m1Period, m1Bonus, {from: owner})
    const m1 = await this.crowdsale.milestones(1)
    m1[0].should.be.bignumber.equal(m1Period)
    m1[1].should.be.bignumber.equal(m1Bonus)
    const count1 = await this.crowdsale.milestonesCount()
    count1.should.be.bignumber.equal(2)
    m0Period.add(m1Period).should.be.bignumber.equal(await this.crowdsale.totalPeriod())
    await this.crowdsale.addMilestone(m3Period, m3Bonus, {from: owner})
    const m3 = await this.crowdsale.milestones(2)
    m3[0].should.be.bignumber.equal(m3Period)
    m3[1].should.be.bignumber.equal(m3Bonus)
    const count2 = await this.crowdsale.milestonesCount()
    count2.should.be.bignumber.equal(3)
    m0Period.add(m1Period).add(m3Period).should.be.bignumber.equal(await this.crowdsale.totalPeriod())
    await this.crowdsale.insertMilestone(m1Period, m2Period, m2Bonus, {from: owner})
    const m2 = await this.crowdsale.milestones(3)
    m2[0].should.be.bignumber.equal(m2Period)
    m2[1].should.be.bignumber.equal(m2Bonus)
    const count3 = await this.crowdsale.milestonesCount()
    count3.should.be.bignumber.equal(4)
    m0Period.add(m1Period).add(m2Period).add(m3Period).should.be.bignumber.equal(await this.crowdsale.totalPeriod())
    // TODO: change it
    // TODO: remove it
    // clear all
  })	 


  describe('accepting payments', function () {

    beforeEach(async function () {
      await this.crowdsale.setStart(start)
      await this.crowdsale.addMilestone(m0Period, m0Bonus)
      await this.crowdsale.addMilestone(m1Period, m1Bonus)
      await this.crowdsale.addMilestone(m2Period, m2Bonus)
      await this.crowdsale.setHardcap(hardcap)
      await this.crowdsale.setPrice(price)
    })	 

    it('should set hardcap correct', async function () {
      hardcap.should.be.bignumber.equal(await this.crowdsale.hardCap())
    })

    it('should start time correct', async function () {
      start.should.be.bignumber.equal(await this.crowdsale.start())
    })

    it('should reject payments before start', async function () {
      await this.crowdsale.send(value).should.be.rejectedWith(EVMThrow)
    })

    it('should accept payments after start', async function () {
      await increaseTimeTo(start.add(10))
      await this.crowdsale.send(value).should.be.fulfilled
    })

    it('should reject payments after end', async function () {
      await increaseTimeTo(await this.crowdsale.lastSaleDate())
      await this.crowdsale.send(value).should.be.rejectedWith(EVMThrow)
    })

  })
*/
 
})

