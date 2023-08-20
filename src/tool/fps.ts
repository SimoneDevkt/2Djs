/** Class for counting Frame per Second */

export default class FPS {
    fps: number;
    frames: number;
    millisec: number;
	constructor() { 
        this.fps = 0;
        this.frames = 0;
        this.millisec = 0;
	}
    addFrame(deltaTimeInMillisecond: number){        
        this.millisec += deltaTimeInMillisecond;
        if(this.millisec >= 1000){
            this.millisec = this.millisec % 1000;
            this.fps = this.frames;
            this.frames = 0;
        }
        this.frames++;
    }
    getFps(){
        return this.fps;
    }
}