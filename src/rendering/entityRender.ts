import Vector from '../tool/vector.ts'

export default interface EntityRender {
    position: Vector
    canvasImageSource: HTMLImageElement
    width: number
    height: number
    n: number //number of current tile in path image
    columns: number //number of tiles in single row
    globalAlpha: number
}
