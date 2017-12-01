class Wallet {
  constructor(name, defaultBalance, countId) {
    this.name = name
    this.balance = defaultBalance
    this.counter = document.querySelector(countId)
    this.render()

    this.counter.addEventListener('webkitAnimationEnd', (evt) => {
      this.counter.style.webkitAnimationName = ''
    }, false)
  }
  add(num) {
    this.balance += num
    this.pop();
    this.render()
  }
  remove(num) {
    this.add(num * -1)
  }
  canAdd(num) {
    return this.balance - num > 0
  }
  buy(num) {
    if (this.balance - num > 0) {
      this.remove(num);
      return true;
    }
    return false;
  }
  pop() {
    this.counter.style.webkitAnimationName = 'pop';
    this.counter.style.webkitAnimationDuration = '.1s';
  }
  render() {
    this.counter.innerHTML = Math.floor(this.balance)
  }
}
export default Wallet
