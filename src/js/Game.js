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

    let squirrel = new Worker(this.config.workers.squirrel, nutsWallet, "#squirrel-btn", "#lvl-display", "#prod-display")
    let ninjaSquirrel = new Worker(this.config.workers.ninjaSquirrel, nutsWallet, "#squirrel-btn-ninja", "#lvl-display-ninja", "#prod-display-ninja")


    this.modules.statics.push(nutsWallet, nutsTree)
    this.modules.dynamics.push(squirrel,ninjaSquirrel)
    this.save();

  }
  update() {
    this.modules.dynamics.forEach((dynamic) => {
      dynamic.update(this.tick)
    })
  }
  run() {
    this.update()
  }
  save(){
    let a = {
      statics:[],
      dynamics:[],
      time:Date.now()

    }
    this.modules.statics.forEach(function(element){
      a.statics.push(element.save());
    })
    this.modules.dynamics.forEach(function(element){
      a.dynamics.push(element.save());
    })
    document.cookie = "username="+JSON.stringify(a)+"; expires=Thu, 18 Dec 2037 12:00:00 UTC"; 



  }
}
export default Game
