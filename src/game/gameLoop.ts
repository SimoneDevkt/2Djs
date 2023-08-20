import FPS from '../tool/fps.ts'

export default abstract class GameLoop {
    paused: boolean
    loading: boolean
    previousTime: number
    FPS: FPS
	constructor() {
        this.paused = false
        this.loading = false
        this.previousTime = 0
        this.FPS = new FPS()//fps counter
	}
    GameLoop(deltaTimeInMillisecond: number) {
        this.FPS.addFrame(deltaTimeInMillisecond)
        if(!this.paused) {
            this.Update(deltaTimeInMillisecond)//update element
        }
        this.Draw()//draw the scenes on the screen
        window.requestAnimationFrame(currentTimeInMillisecond => { 
            const deltaTimeInMillisecond = currentTimeInMillisecond - this.previousTime
            this.previousTime = currentTimeInMillisecond
            this.GameLoop(deltaTimeInMillisecond)// call GameLoop every frame
        })
    }
    abstract Update(deltaTimeInMillisecond: number) :void

    abstract Draw() :void
}