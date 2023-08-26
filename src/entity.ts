import Physics from './physic/physic.ts'

export default interface Entity {
    physics: Physics
    name: string
    id: string
}
