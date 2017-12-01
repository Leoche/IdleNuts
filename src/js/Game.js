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
    this.config = require("./config.json");
    this.init()
  }
  init() {
    let nutsWallet = new Wallet("nuts", 0, ".nuts-count")
    let nutsTree = new Tree(nutsWallet, "#tree-btn", "#pick-btn", "#tree-svg")

    let nutsWorker = new Worker(nutsWallet, "#squirrel-btn", "#lvlDisplay", "#prodDisplay",this.config.workerConf)
    let ninjaWorker = new Worker(nutsWallet, "#squirrel-btn-ninja", "#lvlDisplayNinja", "#prodDisplayNinja",this.config.ninjaConf)


    this.modules.statics.push(nutsWallet, nutsTree)
    this.modules.dynamics.push(nutsWorker)
    this.modules.dynamics.push(ninjaWorker)

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
