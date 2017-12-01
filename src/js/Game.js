import Wallet from './components/Wallet';
import Tree from './components/Tree';
import Worker from './components/Worker';

class Game {
  constructor() {
    this.tick = 30
    this.interval = setInterval(() => this.run(), this.tick)
    this.modules = {
      statics: [],
      dynamics: []
    }
    this.init()
  }
  init() {
    let nutsWallet = new Wallet("nuts", 0, ".nuts-count")
    let nutsTree = new Tree(nutsWallet, "#tree-btn", "#pick-btn", "#tree-svg")
    let nutsWorker = new Worker(60, 1.15, 20, nutsWallet, "#squirrel-btn", "#lvlDisplay", "#prodDisplay")

    this.modules.statics.push(nutsWallet, nutsTree)
    this.modules.dynamics.push(nutsWorker)
  }
  update() {
    this.modules.dynamics.forEach((dynamic) => {
      dynamic.update(this.tick)
    })
  }
  run() {
    this.update()
  }
}
export default Game
