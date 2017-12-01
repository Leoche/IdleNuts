class Tree {
  constructor(wallet, actionShakeId, actionPickId, graphicId) {
    this.wallet = wallet
    this.cooldown = 1500
    this.shakeButton = document.querySelector(actionShakeId)
    this.pickButton = document.querySelector(actionPickId)
    this.graphic = document.querySelector(graphicId)
    this.initGUI()
  }
  initGUI() {
    this.shakeButton.addEventListener('click', (evt) => {
      this.shake()
    })
    this.pickButton.addEventListener('click', (evt) => {
      this.pick()
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
  pick() {
    this.wallet.add(1)
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
