class Wallet {
   constructor(name, defaultBalance, countId) {
      this.name = name
      this.balance = defaultBalance
      this.counters = document.querySelectorAll(countId)
      this.render()
   }
   add(num) {
      this.balance += num
      this.render()
   }
   remove(num) {
      this.add( num*1 )
   }
   canAdd(num) {
      return this.balance - num > 0
   }
   render() {
      this.counters.forEach((item) => {
         item.innerHTML = this.balance
      });
   }
}
export { Wallet }