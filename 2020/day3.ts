import * as fs from 'fs'

const map = fs.readFileSync('map', 'utf-8')
    .split('\n')

type Coordinates = {
    x: number,
    y: number
}

const moveHorizontal = (coordinates: Coordinates, amount: number): Coordinates => {
    const newCoordinates = {x: null, y: coordinates.y}
    const row = map[coordinates.y]


    if (coordinates.x + amount < 0) throw new Error("Haven't implemented negative result in horizontal move yet")

    if (coordinates.x + amount > row.length - 1) { // if overflow horizontal, we need to wrap back to beginning
        newCoordinates.x = ((coordinates.x + amount) - (row.length))  // calculate the overflow to "wrap around".
    } else {
        newCoordinates.x = coordinates.x + amount
    }
    return newCoordinates
}

const moveVertical = (coordinates: Coordinates, amount: number) => {
    if (!map[coordinates.y + amount]) return false // if we can't move down
    return {
        x: coordinates.x,
        y: coordinates.y + amount
    }
}

const getPosition = (coordinates: Coordinates) => { // returns the value at the position (maybe name better or change return value)
    const row = map[coordinates.y]
    const result = row[coordinates.x] // the column
    return result
}

const isOnTree = (coordinates: Coordinates) => {
    return getPosition(coordinates) === "#"
}


const move = (coordinates: Coordinates, instructions: Coordinates) => {
    const canMoveVertical = moveVertical(coordinates, instructions.y)
    if (!canMoveVertical) return false // if we can no longer move vertical, return false

    const newPosition = moveHorizontal(canMoveVertical, instructions.x) // since we moved vertical successfully, now move horizontal for final position
    return newPosition
}

const recursivelyMove = (startingCoordinates: Coordinates, instructions: Coordinates) => {
    let treeCounter = 0;
    let continueMoving = true
    const movementHistory = [startingCoordinates]
    while(continueMoving) {
        // console.log('Running: ', movementHistory[movementHistory.length - 1], instructions)
        const result = move(movementHistory[movementHistory.length - 1], instructions)
        if (!result) { // if we don't get a result, then that means we can no longer move, so we should stop
            continueMoving = false;
        } else {
            // if (process.env.DEBUG) console.log(debugPosition(result))
            if (isOnTree(result)) {
                treeCounter++
                // console.log('\n')
                // console.log('Hit a tree at new position: ', result)
            }
            movementHistory.push(result)
        }
    }
    return {
        treeCounter,
        movementHistory
    }
}

// const debugPosition = (coordinates: Coordinates) => {
//     const marker = isOnTree(coordinates) ? "X" : "O"
//     const newMap = [...map] // clone array to manipulate
//     const row = newMap[coordinates.x]
//     const newRowAsArr = row[coordinates.y].split('')
//     newRowAsArr[coordinates.y] = marker
//     const newRow = newRowAsArr.join(',')

//     newMap[coordinates.x] = newRow

//     console.log(newMap)
// }

console.log(recursivelyMove({
        x: 0,
        y: 0
    },
    {
        x: 1,
        y: 1
    }
).treeCounter)

console.log(recursivelyMove({
    x: 0,
    y: 0
},
{
    x: 3,
    y: 1
}
).treeCounter)

console.log(recursivelyMove({
    x: 0,
    y: 0
},
{
    x: 5,
    y: 1
}
).treeCounter)

console.log(recursivelyMove({
    x: 0,
    y: 0
},
{
    x: 7,
    y: 1
}
).treeCounter)

console.log(recursivelyMove({
    x: 0,
    y: 0
},
{
    x: 1,
    y: 2
}
).treeCounter)