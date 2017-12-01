class Tree {
  constructor(wallet, actionId, graphicId) {
    this.wallet = wallet
    this.cooldown = 1500
    this.shakeButton = document.querySelector(actionId)
    this.graphic = document.querySelector(graphicId)
    this.initGUI()
  }
  initGUI() {
    this.shakeButton.addEventListener('click', (evt) => {
      this.shake()
    })
    this.graphic.addEventListener('webkitAnimationEnd', (evt) => {
      this.graphic.style.webkitAnimationName = ''
      this.result()
    }, false)
  }
  shake() {
    this.disableShakeButton()
    this.graphic.style.webkitAnimationName = 'shake';
  }
  result() {
    let gain = 1 + Math.ceil(Math.random() * 5)
    this.wallet.add(gain)
    let oldLabel = this.shakeButton.innerHTML;
    this.shakeButton.innerHTML = "+" + gain + " " + this.wallet.name
    setTimeout(() => {
      this.shakeButton.innerHTML = oldLabel
      this.enableShakeButton()
    }, this.cooldown)
  }
  disableShakeButton() {
    this.shakeButton.disabled = true;
  }
  enableShakeButton() {
    this.shakeButton.disabled = false;
  }
}
export default Tree
