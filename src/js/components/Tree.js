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
      evt.stopPropagation()
      this.shake()
    })
    this.pickButton.addEventListener('click', (evt) => {
      evt.stopPropagation()
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
    this.addPop(1);
  }
  result() {
    let gain = 1 + Math.ceil(Math.random() * 5)
    this.wallet.add(gain)
    this.addPop(gain);
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
}
export default Tree
