import Wallet from './Wallet';

class WalletManager {
   constructor(walletsId) {
      this.walletsListDOM = document.querySelector(walletsId)
      this.wallets = []
   }
   createWallet(currency) {
      console.log("create wallet:" +  currency)
      this.wallets.push(new Wallet(currency, 0))
      return this.wallets[this.wallets.length -1]
   }
   getWallet(currency) {
      let wallet = this.wallets.filter(wallet => wallet.name === currency)
      return (wallet.length > 0) ? wallet[0] : this.createWallet(currency)
   }
   add(quantity, currency) {
      let wallet = this.getWallet(currency)
      wallet.add(quantity)
      this.renderWallet(wallet)
   }
   buy(quantity, currency) {
      let wallet = this.getWallet(currency)
      if(wallet.buy(quantity)) {
         this.renderWallet(wallet)
         return true
      }
      return false
   }
   renderWallet(wallet) {
      let walletDOM = this.walletsListDOM.querySelector("#wallet-count-"+wallet.name)
      if (walletDOM) {
         walletDOM.innerHTML = wallet.balance
      }
      else {
         this.createWalletRender(wallet);
      }
   }
   render() {
      this.wallets.forEach((wallet) => this.renderWallet(wallet))
   }
   createWalletRender(wallet) {
      let template = `
      <li class="menu-item">
      <div id="wallet-count-`+wallet.name+`" class="menu-badge">`+wallet.balance+`</div>
      <label>`+wallet.name+`</label>
      </li>`
      this.walletsListDOM.innerHTML += template
   }
}
export default WalletManager