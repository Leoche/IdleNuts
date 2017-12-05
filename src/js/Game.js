import Wallet from './components/Wallet';
import WalletManager from './components/WalletManager';
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
    this.walletManager = new WalletManager("#wallets-manager");

    this.init()
  }
  init() {
    let nutsTree = new Tree(this.walletManager, "nuts", "#tree-btn", "#pick-btn", "#tree-svg")

    let squirrel = new Worker(this.config.workers.squirrel, this.walletManager, "nuts", "#squirrel-btn", "#lvl-display", "#prod-display")
    let ninjaSquirrel = new Worker(this.config.workers.ninjaSquirrel, this.walletManager, "nuts", "#squirrel-btn-ninja", "#lvl-display-ninja", "#prod-display-ninja")


    this.modules.statics.push(nutsTree)
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
