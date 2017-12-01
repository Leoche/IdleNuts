import { Wallet } from './components/Wallet';
import { Tree } from './components/Tree';
import { Worker } from './components/Worker';
window.onload = function() {

   let nutsWallet = new Wallet("nuts", 0, ".nuts-count")

   let nutsTree = new Tree(nutsWallet, "#tree-btn", "#tree-svg")
   let nutsWorker = new Worker(nutsWallet,"#squirrel-btn","#lvlDisplay","#prodDisplay")
}
