import Vector from '../tool/vector'
import BoundingBox from './BoundingBox'

export default class Physics {
    position: Vector
    vel: Vector
    massInverse: number = 1000
    impulse: number = 1
    damping: number = 0.2
    boundingBox: BoundingBox
    constructor(x: number, y: number, width: number, height: number, xV: number = 0, yV: number = 0) {
        this.vel = new Vector(xV, yV)
        this.position = new Vector(x, y)
        this.boundingBox = {
            x,
            y,
            height,
            width
        }
    }
    physicStep(dt: number, inputDir: Vector, collisions: BoundingBox[]) {
        //Euler integration

        const acc = inputDir.getScale(this.massInverse * this.impulse)

        this.vel = this.vel.getAdd(acc.getScale(dt))

        this.vel = this.vel.getScale(Math.pow(this.damping, dt))

        if (this.vel.length < 0.01) {
            //TO DO evaluate the value
            this.vel = new Vector(0, 0)
        }

        const pos: Vector = this.position.clone
        pos.add(this.vel.getScale(dt))
        if (this.checkCollision(collisions, pos)) {
            this.vel = new Vector(0, 0)
        }

        this.position.add(this.vel.getScale(dt))
    }

    checkCollision(collisions: BoundingBox[], pos: Vector): boolean {
        this.boundingBox.x = pos.x
        this.boundingBox.y = pos.y
        for (const collision of collisions) {
            if (this.isCollide(collision)) {
                return true
            }
        }
        return false
    }

    isCollide(collision: BoundingBox): boolean {
        const pos = this.boundingBox
        if (pos.x + pos.width < collision.x || pos.x > collision.x + collision.width) {
            return false
        }
        if (pos.y + pos.height < collision.y || pos.y > collision.y + collision.height) {
            return false
        }
        return true
    }
}
