import Vector from "../tool/vector"
import Camera from "./camera"
import EntityRender from "./entityRender"

const Ingrandimento = 3
const DebugRendering = true

export default class Rendering {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private ingrandimento: number
    commandCallBack: any
    declare half: Vector
    camera: Camera
    constructor(id: string, camera: Camera, commandCallBack: any) {
        this.canvas = <HTMLCanvasElement>document.getElementById(id)
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d')//context where to draw      
        this.ingrandimento = Ingrandimento
        this.camera = camera
        this.commandCallBack = commandCallBack
        window.onresize = this.resize
        this.resize()
    }
    private resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.half = new Vector(Math.trunc(this.canvas.width / 2), Math.trunc(this.canvas.height / 2))

        this.commandCallBack(this.canvas);
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    drawDebug(fps: number) {
        const array = [
            fps + " FPS",
        ]
        if (DebugRendering) {
            let rigaStart = 30
            const aCapo = 10
            this.context.strokeStyle = "#000"
            this.context.fillStyle = "#fff"
            for (const element of array) {
                this.context.fillText(element, 30, rigaStart)
                rigaStart += aCapo
            }
        }
    }
    private drawEntity(e: EntityRender) {//draw a tile in tileset
        let { n, height, width, canvasImageSource, columns, position, globalAlpha } = e
        if (n > -1) {
            this.context.imageSmoothingEnabled = false
            const pos = position.clone
            pos.sub(this.camera.center)
            const { x, y } = pos
            const riga = n % columns;
            const colonna = Math.trunc(n / columns);
            this.context.globalAlpha = e.globalAlpha
            this.context.drawImage(canvasImageSource,
                Math.trunc(riga * width),
                Math.trunc(colonna * height),
                Math.trunc(width),
                Math.trunc(height),
                Math.trunc((x * this.ingrandimento) + this.half.x),
                Math.trunc((y * this.ingrandimento) + this.half.y),
                Math.trunc(width * this.ingrandimento),
                Math.trunc(height * this.ingrandimento)
            )
        }
    }

    drawEntities(entities: EntityRender[]) {
        for (const e of entities) {
            this.drawEntity(e)
        }
    }
}