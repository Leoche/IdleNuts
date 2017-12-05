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
}
export default Wallet
