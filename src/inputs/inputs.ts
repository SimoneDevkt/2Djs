export default class Inputs {
	MOUSE_LEFT: number = 0
	MOUSE_MIDDLE: number = 1
	MOUSE_RIGHT: number = 2
	KEY_LEFT: string = 'ArrowLeft'
	KEY_RIGHT: string = 'ArrowRight'
	KEY_UP: string = 'ArrowUp'
	KEY_DOWN: string = 'ArrowDown'
	KEY_ENTER: number = 13
	KEY_ESC: number = 27
	KEY_CTRL: number = 17
	KEY_SPACE: number = 32

	KEY_NUMBER_1: string = 'Digit1'
	KEY_NUMBER_2: string = 'Digit2'
	KEY_NUMBER_3: string = 'Digit3'
	KEY_NUMPAD_NUMBER_1: string = 'Numpad1'
	KEY_NUMPAD_NUMBER_2: string = 'Numpad2'
	KEY_NUMPAD_NUMBER_3: string = 'Numpad3'
	KEY_Z: string = 'KeyZ'
	CONTROLLER_UP: number = 12
	CONTROLLER_LEFT: number = 14
	CONTROLLER_DOWN: number = 13
	CONTROLLER_RIGHT: number = 15
	CONTROLLER_STICK_LEFT_X: number = 0
	CONTROLLER_STICK_LEFT_Y: number = 1
	CONTROLLER_X: number = 2

	mouseX: number = 0
	mouseY: number = 0
	key: any = {}
	keyPress: any = {}
	keyRel: any = {}
	keyMouse: any[] = []
	keyMousePress: any[] = []
	keyMouseRel: any[] = []
	declare mouseMoved: boolean
	constructor() {
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			if(!this.key[e.code]){
				this.keyPress[e.code] = true
				this.key[e.code] = true
			}
		}, false)

		window.addEventListener('keyup', (e: KeyboardEvent) => {
			this.keyRel[e.code] = true
			this.key[e.code] = false 
		}, false)

		window.addEventListener('mousemove', (e: MouseEvent) => {
			this.mouseMoved = true
			this.mouseX = e.pageX
			this.mouseY = e.pageY
		}, false)

		window.addEventListener('mousedown', (e: MouseEvent) => {
			if(!this.keyMouse[e.button]){
				this.keyMousePress[e.button] = true
				this.keyMouse[e.button] = true
			}
		}, false)

		window.addEventListener('mouseup',  (e: MouseEvent) => {
			this.keyMouseRel[e.button] = true
			this.keyMouse[e.button] = false
		}, false)


		window.addEventListener('touchmove', (e) => {
			this.mouseX = e.changedTouches[0].pageX
			this.mouseY = e.changedTouches[0].pageY
		}, false)

		window.addEventListener('touchstart', (e) => {			
			if(!this.keyMouse[this.MOUSE_LEFT]){
				this.keyMousePress[this.MOUSE_LEFT] = true
				this.keyMouse[this.MOUSE_LEFT] = true
			}
		}, false)

		window.addEventListener('touchend', () => {			
			this.keyMouseRel[this.MOUSE_LEFT] = true
			this.keyMouse[this.MOUSE_LEFT] = false
		}, false)
	}
	Clear(){
		this.mouseMoved = false 
		this.keyPress = []
		this.keyRel= []
		this.keyMousePress = []
		this.keyMouseRel= []
	}

	//keyboard
	GetKeyDown(k: string){
		return !!this.key[k]
	}
	GetKeyPress(k: string){
		return !!this.keyPress[k]
	}
	GetKeyRelease(k: string){
		return !!this.keyRel[k]
	}

	//mouse
	GetMouseDown(k: number){
		return !!this.keyMouse[k]
	}
	GetMousePress(k: number){
		return !!this.keyMousePress[k]
	}
	GetMouseRelease(k: number){
		return !!this.keyMouseRel[k]
	}

	//controller
	GetButtonController(k: number){
		let gamepads = navigator.getGamepads()
		if(gamepads.length > 0 && gamepads[0]){
			let gamepad = gamepads[0]
			return gamepad.buttons[k].pressed
		}
	}
	GetAxis(axis: number){		
		let gamepads = navigator.getGamepads()
		if(gamepads.length > 0 && gamepads[0]){
			let gamepad = gamepads[0]			
			return gamepad.axes[axis]
		}
	}	
	ControllerVib(ms = 100){	
		let gamepads = navigator.getGamepads()
		if(gamepads.length > 0 && gamepads[0]){
			let gamepad = gamepads[0]
			this.vibrate(gamepad, ms)
		}
	}
	vibrate(gamepad: Gamepad, duration = 50) {// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/vibrationActuator
		if (!('vibrationActuator' in gamepad)) {
			return
		}
		gamepad.vibrationActuator?.playEffect('dual-rumble', {
			startDelay: 0,
			duration: duration,
			weakMagnitude: 1.0,
			strongMagnitude: 1.0,
		})
	}
}