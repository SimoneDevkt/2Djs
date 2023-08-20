import Vector from "../tool/vector"

export default class Camera{
    center: Vector
    constructor(x: number = 0, y: number = 0){
        this.center = new Vector(x,y)
    }
    setCamera(x: number, y: number){
        this.center = new Vector(x,y)
    }
}