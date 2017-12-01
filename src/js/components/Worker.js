class Worker {
  // instancie un worker. il travaille sur un wallet,
  //possède un tableau de boutons d'upgrade et un objet de conf permettant de savoir quel bouton augmente quelle upgrade.
  // il est également envisagé de décrire les couts avec des wallets. ceci entrainerait bcp de complexité dans la conf
  constructor(conf, wallet, buttonId, lvlDisplayId, prodDisplayId) {
    this.wallet = wallet;
    this.exponent = conf.exponent;
    this.baseIncome = conf.baseIncome;
    this.baseCost = conf.baseCost;

    this.lvl = 0;
    this.stock = 0;

    this.button = document.querySelector(buttonId);
    this.lvlDisplay = document.querySelector(lvlDisplayId);
    this.prodDisplay = document.querySelector(prodDisplayId);

    this.initGUI();
    this.render()
    /**
          ratio = %age
          number => rez = multicatif
    	    gatherSpeed =

          afkRatio [0,1]

          TODO plusieurs bouton
          differents wallets différents pour le cout des upgrades
          un fichier de conf qui permets de mettre des valeurs par défaut ???
    **/
  }
  initGUI() {
    this.button.addEventListener('click', (evt) => {
      if (this.wallet.buy(this.upgradeCostFloored(1))) {
        this.upgrade();
      }
    })
  }
  upgrade() {

    this.lvl++;
    this.render();
  }
  upgradeCost(nbToBuy) {
    return this.baseCost * (Math.pow(this.exponent, this.lvl) - Math.pow(this.exponent, this.lvl + nbToBuy)) / (1 - this.exponent)
  }
  upgradeCostFloored(nbToBuy) {
    return Math.floor(this.upgradeCost(nbToBuy))
  }

  update(msPerTick) {
    if (this.calculateTotalProduction() <= 0) return;
    /*
     this.calculateTotalProduction() / 1000 * msPerTick = nuts/sec converti en nuts/30ms
    */
    this.stock += this.calculateTotalProduction() / 1000 * msPerTick
    if (this.stock > 1) {
      this.wallet.add(Math.floor(this.stock))
      this.stock = this.stock - Math.floor(this.stock)
    }
  }
  calculateTotalProduction() {
    return this.lvl * this.baseIncome;

  }
  getOneDecimal(num) {
    return Math.round(num * 10) / 10;
  }
  render() {
    this.lvlDisplay.innerHTML = this.lvl;
    this.prodDisplay.innerHTML = this.getOneDecimal(this.calculateTotalProduction()) + "/sec";
    this.button.innerHTML = this.button.attributes["data-text"].value.replace("$", "-" + this.upgradeCostFloored(1));
  }
}
export default Worker
