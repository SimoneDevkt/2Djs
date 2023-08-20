import GameLoop from './gameLoop.ts'
import Rendering from '../rendering/rendering.ts'
import EntityRender from '../rendering/entityRender.ts'
import Vector from '../tool/vector.ts'
import Command from '../inputs/command.js'
import Camera from '../rendering/camera.ts'
import Entity from '../entity.ts'
import Physics from '../physic/physic.ts'
import BoundingBox from '../physic/BoundingBox.ts'

const level = await import(`../../res/scenes/livello2/mappa.json`)
const atlas = await import('../../res/assets/maps/atlas.json')
const atlasPng = new URL(`../../res/assets/maps/atlas.png`, import.meta.url).href

const imageUrl = new URL(`../../res/assets/characters/test/test.png`, import.meta.url).href
const playerTest = await import('../../res/assets/characters/test/test.json')


export default class Game extends GameLoop{
    command: Command
    rendering: Rendering
    camera: Camera
    declare player: Entity
    declare entitiesRendering: EntityRender[]
    declare collision: BoundingBox[]
	constructor(idCanvas: string) {
		super()
        this.loading = true
        this.command = new Command()
        this.camera = new Camera()
        this.rendering = new Rendering(idCanvas, this.camera, ()=>{})      
	}
    async start(){//loading game
        const atlasImage = new Image()
        atlasImage.src = atlasPng

        this.entitiesRendering = []

        this.loading = true
        for (const layer of level.layers) {
            switch (layer.name) {
                case 'players':
                    const image = new Image()
                    image.src = imageUrl

                    const playerJson = layer.objects![0]
                    
                    this.player = {
                        id: ''+playerJson.id,
                        name: '',
                        physics: new Physics(playerJson.x, playerJson.y-playerJson.height, playerJson.width, playerJson.height)
                    }
                    const player : EntityRender = {
                        position: this.player.physics.position,
                        n: 0,
                        canvasImageSource: image,
                        columns: playerTest.columns,
                        height: playerJson.height,
                        width: playerJson.width,
                        globalAlpha: 1
                    }                    
                    this.entitiesRendering.push(player)
                    break
                case 'collision':
                    this.collision = layer.objects ?? []
                    break            
                default:                    
                    const data: number[] = layer.data ?? []
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i]

                        const x1 = i%level.height * level.tilewidth
                        const y1 = Math.floor(i/level.width) * level.tileheight     
        
                        const currentTile : EntityRender = {
                            position: new Vector(x1,y1),
                            n: element-1,
                            canvasImageSource: atlasImage,
                            columns: atlas.columns,
                            height: level.tilewidth,
                            width: level.tileheight,
                            globalAlpha: layer.opacity
                        }        
                        this.entitiesRendering.push(currentTile)
                    }
                    break
            }
        }
        this.loading = false

        this.GameLoop(0)
    }
    Draw() {//rendering to screen
        this.rendering.clear()
        
        if(!this.loading){          
            this.rendering.drawEntities(this.entitiesRendering)
        }
        
        this.rendering.drawDebug(this.FPS.getFps())
    }
    Update(deltaTimeInMillisecond: number) {//update game
        const deltaTime = deltaTimeInMillisecond/1000

        if(this.loading){//if you are loading not update game
            return
        }
        this.camera.center = this.player.physics.position

        const inputs = this.command.GetCommand()

        this.player.physics.physicStep(deltaTime, inputs.dir, this.collision)

        
    }
}