import Inputs from './inputs.ts';
import Vector from '../tool/vector.ts';

export default class Command {
    //zonaMortaInPixel = 5;
    stickDeadZone = 0.2;
    inputs: Inputs;
    /*stickTouch: { active: boolean; x: number; y: number; x2: number; y2: number; };
    offsetLeft: any;
    offsetTop: any;
    width: any;
    height: any;
    declare stickOnlyLeftSize: boolean;*/
	constructor() {
        this.inputs = new Inputs();
        /*this.stickTouch = {
            active: false,
            x: 0, 
            y: 0,
            x2: 0,
            y2: 0
        };*/
	}
    /*setCanvasTouchCommand = (canvas: HTMLCanvasElement)=>{
        this.offsetLeft = canvas.offsetLeft;
        this.offsetTop = canvas.offsetTop;
        this.width = canvas.width;
        this.height = canvas.height;
        this.stickOnlyLeftSize = true;//comando movimento solo sul lato sinistro
        if(this.stickOnlyLeftSize){
            this.width /= 2;
        }
    }*/
    GetCommand(): {dir: Vector}{
        const cmd = {
            dir: this.getDirection(),
            //attack: this.getAttack(),
            //teleport: this.getTeleport(),
        }
        this.inputs.Clear();
        return cmd;
    }
    /*getTeleport(){
        const teleportKey: any = {
            1: [this.inputs.KEY_NUMBER_1, this.inputs.KEY_NUMPAD_NUMBER_1],
            2: [this.inputs.KEY_NUMBER_2, this.inputs.KEY_NUMPAD_NUMBER_2],
            3: [this.inputs.KEY_NUMBER_3, this.inputs.KEY_NUMPAD_NUMBER_3],
        }
        for (const n in teleportKey) {
            for (const key of teleportKey[n]) {  
                if (this.inputs.GetKeyPress(key)) {
                    return n;
                }
            }
        }
        return false;
    }*/
    /*getAttack(){        
        if(this.inputs.GetKeyPress(this.inputs.KEY_Z) || this.inputs.GetButtonController(this.inputs.CONTROLLER_X)){
            return true
        }
        return false;
    }*/
	getDirection(): Vector{//torna la direzione indicata dall utente
        let dirX = 0;
        let dirY = 0;

        //comandi direzione touch
        /*if(this.inputs.GetMousePress(this.inputs.MOUSE_LEFT)){
            this.stickTouch.x = Math.round(this.inputs.mouseX - this.offsetLeft);
			this.stickTouch.y = Math.round(this.inputs.mouseY - this.offsetTop);
            if(this.stickTouch.x > 0 && this.stickTouch.x < this.width && this.stickTouch.y > 0 && this.stickTouch.y < this.height){                
                this.stickTouch.active = true;
            }else{
                this.stickTouch.active = false;
            }
        }
        if(this.stickTouch.active && this.inputs.GetMouseDown(this.inputs.MOUSE_LEFT)){            
            this.stickTouch.x2 = Math.round(this.inputs.mouseX - this.offsetLeft);
            this.stickTouch.y2 = Math.round(this.inputs.mouseY - this.offsetTop);
            let diffX = this.stickTouch.x2 - this.stickTouch.x;
            if(Math.abs(diffX) > this.zonaMortaInPixel) {
                dirX = diffX;
            }
            let diffY = this.stickTouch.y2 - this.stickTouch.y;
            if(Math.abs(diffY) > this.zonaMortaInPixel) {
                dirY = diffY;
            }
        }else{            
            this.stickTouch.active = false;
        }*/
        //comandi movimento tastiera e controller
        if(this.inputs.GetKeyDown(this.inputs.KEY_LEFT) || this.inputs.GetButtonController(this.inputs.CONTROLLER_LEFT)){
            dirX += -1;
        }
        if(this.inputs.GetKeyDown(this.inputs.KEY_RIGHT) || this.inputs.GetButtonController(this.inputs.CONTROLLER_RIGHT)){  
            dirX += 1;
        }
        if(this.inputs.GetKeyDown(this.inputs.KEY_UP) || this.inputs.GetButtonController(this.inputs.CONTROLLER_UP)){            
            dirY += -1;
        }
        if(this.inputs.GetKeyDown(this.inputs.KEY_DOWN) || this.inputs.GetButtonController(this.inputs.CONTROLLER_DOWN)){ 
            dirY += 1;
        }
        //comandi movimento controller stick
        const axisX: number = this.inputs.GetAxis(this.inputs.CONTROLLER_STICK_LEFT_X) ?? 0
        if(Math.abs(axisX) > this.stickDeadZone) {
            dirX = axisX;
        }
        const axisY: number = this.inputs.GetAxis(this.inputs.CONTROLLER_STICK_LEFT_Y) ?? 0
        if(Math.abs(axisY) > this.stickDeadZone) {
            dirY = axisY;
        }
            
        return new Vector(dirX,dirY);
	}
    ControllerVib(ms = 200){//fa vibrare il controller
        this.inputs.ControllerVib(ms);
    }
}