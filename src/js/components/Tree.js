class Tree {
  constructor(walletManager, currency, actionShakeId, actionPickId, graphicId) {
    this.walletManager = walletManager;
    console.log(walletManager)
    this.currency = currency;
    this.cooldown = 1500
    this.shakeButton = document.querySelector(actionShakeId)
    this.pickButton = document.querySelector(actionPickId)
    this.graphic = document.querySelector(graphicId)
    this.initGUI()
  }
  initGUI() {
    this.shakeButton.addEventListener('click', (evt) => {
      evt.stopPropagation()
      this.shake()
    })
    this.pickButton.addEventListener('click', (evt) => {
      evt.stopPropagation()
      this.pick()
    })
    document.querySelector("#debug10")
      .addEventListener('click', (evt) => { //debug to remove
        evt.stopPropagation()
        this.pickTen()
      })
    this.graphic.addEventListener('webkitAnimationEnd', (evt) => {
      this.graphic.style.webkitAnimationName = ''
      if (evt.animationName != "shake") return;
      this.result()
    }, false)
  }
  shake() {
    this.disableButtons()
    this.graphic.style.webkitAnimationName = 'shake';
    this.graphic.style.webkitAnimationDuration = '1s';
  }
  pick() {
    this.walletManager.add(1, this.currency)
    this.graphic.style.webkitAnimationName = 'minishake';
    this.graphic.style.webkitAnimationDuration = '.1s';
    this.addPop(1);
  }
  pickTen() { //debug to remove
    this.walletManager.add(10, this.currency)
    this.graphic.style.webkitAnimationName = 'minishake';
    this.graphic.style.webkitAnimationDuration = '.1s';
    this.addPop(10);
  }
  result() {
    let gain = 3 + Math.ceil(Math.random() * 10)
    this.walletManager.add(gain, this.currency)
    this.addPop(gain);
    let oldLabel = this.shakeButton.innerHTML;
    this.shakeButton.innerHTML = "+" + gain + " " + this.currency
    setTimeout(() => {
      this.shakeButton.innerHTML = oldLabel
      this.enableButtons()
    }, this.cooldown)
  }
  disableButtons() {
    this.shakeButton.disabled = true;
    this.pickButton.disabled = true;
  }
  enableButtons() {
    this.shakeButton.disabled = false;
    this.pickButton.disabled = false;
  }
  addPop(num) {
    var el = document.createElement('span');
    el.innerHTML = "+" + num;
    el.className = "tree-notification notification-anim"

    el.style.marginLeft = Math.round(-50 + Math.random() * 100) + "px"; // Random x entre -50 et 50
    el.style.marginTop = Math.round(Math.random() * -50) + "px"; // Random y entre 0 et -50

    el.addEventListener('webkitAnimationEnd', (evt) => { //Retire le span quand l'anim est finie
      evt.target.remove();
    }, false)

    this.graphic.parentNode.appendChild(el)
  }
  save(){
    
  }
}
export default Tree
