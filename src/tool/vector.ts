/** "2D Vector class " */

export default class Vector {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    get length() {
        return Math.hypot(this.x, this.y)
    }
    get coordinate(){
        return [this.x, this.y]
    }
    get degree(){
        return this.toDegrees(this.radian)
    }
    get radian(){
        return Math.atan2(this.x, this.y)
    }
	get componentX(){
		return new Vector(this.x, 0)
	}
	get componentY(){
		return new Vector(0, this.y)
	}
    get opposite(){
        return new Vector(-this.x, -this.y)
    }
    get oppositeX(){
        return new Vector(-this.x, this.y)
    }
    get oppositeY(){
        return new Vector(this.x, -this.y)
    }
	get clone(){
		return new Vector(this.x, this.y)
	}    
    set(x: any, y: any){
        this.x = x
        this.y = y
    }
    add(v: { x: any; y: any }){
        this.x += v.x
        this.y += v.y
    }
    getAdd(v: { x: any; y: any }){
        const add = this.clone
        add.add(v)
        return(add)
    }
    sub(v: { x: number; y: number }){
        this.x -= v.x
        this.y -= v.y
    }
    dotProd(v: { x: number; y: number }){
        return this.x * v.x + this.y * v.y
    }
    crossProduct(v: { y: number; x: number }) {
        return this.x * v.y - v.x * this.y
    }
    toString(){
        return " X: " + this.x + " Y: " + this.y 
    }
    toDegrees(radians: number){
        return (radians * 180) / Math.PI
    }
    toRadians(degrees: number){
        return (degrees * Math.PI) / 180
    }
    rotate(radians: number) {
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)
        return new Vector(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        )
    }
    isGreaterThan(v: string | any[]){
        return this.length > v.length
    }
    scale(scaleFactor: number){
        this.x *= scaleFactor 
        this.y *= scaleFactor 
    }
    getScale(scaleFactor: number){
        const scale = this.clone
        scale.scale(scaleFactor)
        return(scale)
    }
    scaleX(scaleFactor: number){
        this.x *= scaleFactor 
    }
    scaleY(scaleFactor: number){
        this.y *= scaleFactor 
    }
    normalize() {
        let s = this.length === 0 ? 0 : 1 / this.length
        this.scale(s)
        return this
    }
    set length(lenght){
        this.normalize().scale(lenght)
    }
    projectOn(other: { length: number; x: number; y: number }) {
        const amt = this.dotProd(other) / other.length
        return new Vector(amt * other.x, amt * other.y)
    }
    /*reflect(normal) {
        return this.subtract(this.projectOn(normal).scaleBy(2))
    }*/
    angleBetween(other: any) {
        return this.toDegrees(
            Math.atan2(this.crossProduct(other), this.dotProd(other))
        )
    }
}