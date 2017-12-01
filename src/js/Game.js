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

    let squirrel = new Worker(this.config.workers.squirrel, nutsWallet, "#squirrel-btn", "#lvlDisplay", "#prodDisplay")
    let ninjaSquirrel = new Worker(this.config.workers.ninjaSquirrel, nutsWallet, "#squirrel-btn-ninja", "#lvlDisplayNinja", "#prodDisplayNinja")


    this.modules.statics.push(nutsWallet, nutsTree)
    this.modules.dynamics.push(squirrel,ninjaSquirrel)

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
