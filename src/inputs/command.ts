import Inputs from './inputs.ts'
import Vector from '../tool/vector.ts'

export default class Command {
    stickDeadZone: number = 0.2
    inputs: Inputs
	constructor() {
        this.inputs = new Inputs()
	}
    GetCommand(): {dir: Vector}{
        const cmd = {
            dir: this.getDirection(),
        }
        this.inputs.Clear()
        return cmd
    }
    getDirection(): Vector{//torna la direzione indicata dall utente
        let dirX = 0
        let dirY = 0

        //movement keyboard and controller button
        if(this.inputs.GetKeyDown(this.inputs.KEY_LEFT) || this.inputs.GetButtonController(this.inputs.CONTROLLER_LEFT)){
            dirX += -1
        }
        if(this.inputs.GetKeyDown(this.inputs.KEY_RIGHT) || this.inputs.GetButtonController(this.inputs.CONTROLLER_RIGHT)){  
            dirX += 1
        }
        if(this.inputs.GetKeyDown(this.inputs.KEY_UP) || this.inputs.GetButtonController(this.inputs.CONTROLLER_UP)){            
            dirY += -1
        }
        if(this.inputs.GetKeyDown(this.inputs.KEY_DOWN) || this.inputs.GetButtonController(this.inputs.CONTROLLER_DOWN)){ 
            dirY += 1
        }
        //movement stick controller 
        const axisX: number = this.inputs.GetAxis(this.inputs.CONTROLLER_STICK_LEFT_X) ?? 0
        if(Math.abs(axisX) > this.stickDeadZone) {
            dirX = axisX
        }
        const axisY: number = this.inputs.GetAxis(this.inputs.CONTROLLER_STICK_LEFT_Y) ?? 0
        if(Math.abs(axisY) > this.stickDeadZone) {
            dirY = axisY
        }
            
        return new Vector(dirX,dirY)
	}
    ControllerVib(ms = 200){//vibration for controller
        this.inputs.ControllerVib(ms)
    }
}