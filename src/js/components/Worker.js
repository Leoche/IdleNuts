class Worker {
  // instancie un worker. il travaille sur un wallet,
  //possède un tableau de boutons d'upgrade et un objet de conf permettant de savoir quel bouton augmente quelle upgrade.
  // il est également envisagé de décrire les couts avec des wallets. ceci entrainerait bcp de complexité dans la conf
  constructor(wallet, buttonId, lvlDisplayId, prodDisplayId) {
    this.wallet = wallet;
    this.ratio = 1;
    this.upgradeRatio = 1.1;
    this.base = 1
    this.upgradeCost = 1;
    this.upgradeCostIncrease = 1;
    this.lvl = 0;
    this.button = document.querySelector(buttonId);
    this.lvlDisplay = document.querySelector(lvlDisplayId);
    this.prodDisplay = document.querySelector(prodDisplayId);
    this.initGUI();
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
      if (this.wallet.buy(this.upgradeCost)) {
        this.upgrade();
      }
    })
  }
  upgrade() {
    this.ratio *= this.upgradeRatio;
    this.upgradeCost += this.upgradeCostIncrease;
    this.upgradeCostIncrease *= this.upgradeRatio;
    this.lvl++;
    this.render();
  }
  produce() {
    this.wallet.add();
  }
  calculateTotalProduction() {
    return this.base * this.ratio;
  }
  getOneDecimal(num) {
    // return x.x de la valeur
    return Math.round(num * 10) / 10;
  }
  render() {
    this.lvlDisplay.innerHTML = this.lvl;
    this.prodDisplay.innerHTML = this.getOneDecimal(this.calculateTotalProduction());
    this.button.innerHTML = this.button.attributes["data-text"].value.replace("$", "-" + this.getOneDecimal(this.upgradeCost));
  }
}
export default Worker
