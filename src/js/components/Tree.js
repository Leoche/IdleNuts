class Tree {
  constructor(wallet, actionId, graphicId) {
    this.wallet = wallet
    this.cooldown = 1500
    this.button = document.querySelector(actionId)
    this.graphic = document.querySelector(graphicId)
    this.initGUI()
  }
  initGUI() {
    this.button.addEventListener('click', (evt) => {
      this.shake()
    })
    this.graphic.addEventListener('webkitAnimationEnd', (evt) => {
      this.graphic.style.webkitAnimationName = ''
      this.result()
    }, false)
  }
  shake() {
    this.disableButton()
    this.graphic.style.webkitAnimationName = 'shake';
  }
  result() {
    let gain = 1 + Math.ceil(Math.random() * 5)
    this.wallet.add(gain)
    let oldLabel = this.button.innerHTML;
    this.button.innerHTML = "+" + gain + " " + this.wallet.name
    setTimeout(() => {
      this.button.innerHTML = oldLabel
      this.enableButton()
    }, this.cooldown)
  }
  disableButton() {
    this.button.disabled = true;
  }
  enableButton() {
    this.button.disabled = false;
  }
}
export default Tree
