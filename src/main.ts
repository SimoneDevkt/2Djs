import './style.css'

import Game from './game/game.ts'

const idCanvas = 'gameCanvas';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<canvas id="${idCanvas}"></canvas>`

window.addEventListener('load', function() {
  const game = new Game(idCanvas)
  game.start()
}, true)

