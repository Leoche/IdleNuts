class Wallet {
  constructor(name, defaultBalance) {
    this.name = name
    this.balance = defaultBalance
  }
  add(num) {
    this.balance += num
  }
  remove(num) {
    this.add(num * -1)
  }
  canAdd(num) {
    return this.balance - num > 0
  }
  buy(num) {
    if (this.balance - num >= 0) {
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
  save(){
    return {
      name:this.name,
      balance:this.balance
    }
  }
}
export default Wallet
  