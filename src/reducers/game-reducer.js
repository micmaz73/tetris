import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, PAUSE, RESTART, RESUME, ROTATE, GAME_OVER } from "../actions";
import { defaultState, nextRotation, canMoveTo, addBlocktoGrid, checkRows, randomShape } from "../utils";


const gameReducer = (state = defaultState(), action) => {
    const {shape, grid, x, y, rotation, nextShape, score, isRunning} = state
    switch(action.type){
        case ROTATE:
            const newRotation = nextRotation(shape, rotation)
            if(canMoveTo(shape, grid, x, y, newRotation)){
                return {...state, rotation: newRotation}
            }
            return state
        case MOVE_RIGHT:
            if(canMoveTo(shape, grid, x + 1 , y, rotation)){
                return{...state, x : x+1}
            }
            return state
        case MOVE_LEFT:
            // subtract 1 from the x and check if this new position is possible by calling `canMoveTo()
            if(canMoveTo(shape, grid, x-1, y, rotation)){return{...state, x: x - 1}}
            return state
        case MOVE_DOWN:
            // Get the next potential Y position
            const maybeY = y + 1
            // Check if the current block can move here and If so move the block
            if(canMoveTo(shape, grid, x, maybeY, rotation)){return{...state, y: maybeY}}
            // If not place the block
            // (this returns an object with a grid and gameover bool)
            const obj = addBlocktoGrid(shape, grid, x, y, rotation)
            const newGrid = obj.grid
            const gameOver = obj.gameOver

            if (gameOver){
                const newState = {...state}
                newState.shape = 0
                newState.grid = newGrid
                return {...state, gameOver: true}
            }

            // reset some things to start a new shape/block
            const newState = defaultState()
            newState.grid = newGrid
            newState.shape = nextShape
            //newState.nextShape = randomShape()
            newState.score = score
            newState.isRunning = isRunning

            // Update the score based on if rows were completed or not
            newState.score = score + checkRows(newGrid)
            return newState
        case RESUME:
            return {... state, isRunning: true}
        case PAUSE:
            return {... state, isRunning: false}
        case GAME_OVER:
            return state
        case RESTART:
            return defaultState()

        default:
            return state
    }
}

export default gameReducer