import './style.css'

import Game from './game/game.ts'

const idCanvas = 'gameCanvas'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<canvas id="${idCanvas}"></canvas>`

window.addEventListener('load', function() {

}, true)
const game = new Game(idCanvas)
game.start()
