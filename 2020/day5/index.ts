import * as fs from 'fs'

const BOARDING_PASSES = fs.readFileSync('./day5/boarding-passes', 'utf-8')
    .split('\n')


const getNextNumberRow = (min, max, input, idx = 0) => { // F or B (0 - 127)
    if (idx > input.length - 1) throw new Error("Went over length of input")
    const char = input[idx]

    let newMin
    let newMax

    const rawPivot = (max + min) / 2


    if (char === 'F') { // get lower half (127 / 2 = 63.5, so this would be '63' as a new maximum (0-63, inclusive))
        newMax = Math.floor(rawPivot);
        newMin = min
    }

    if (char === 'B') { // get upper half (127 / 2 = 63.5, so this would be '64' as a new minimum (64-127, inclusive))
        newMax = max
        newMin = Math.ceil(rawPivot);
    }

    if (newMax - newMin === 1) {
        const newChar = input[idx+1]
        if (newChar === 'F') {
            return newMin
        } else if (newChar === 'B') {
            return newMax
        } else {
            console.warn('Min, Max, newChar, Idx, Input: ', min, max, newChar, idx, input)
            throw new Error('Current character not a B or F!')
        }
    }

    return getNextNumberRow(newMin, newMax, input, idx + 1)
}

const getNextNumberColumn = (min, max, input, idx = 0) => { // R or L (0 - 7)
    if (idx > input.length - 1) throw new Error(`Went over length of input: ${min} ${max} ${idx}`)
    const char = input[idx]


    let newMin
    let newMax

    const rawPivot = (max + min) / 2

    if (char === 'L') { // get lower half (7 / 2 = 3.5, so this would be '3' as a new maximum (0-3, inclusive))
        newMax = Math.floor(rawPivot);
        newMin = min
    }

    if (char === 'R') { // get upper half (7 / 2 = 3.5, so this would be '4' as a new minimum (3-7, inclusive))
        newMax = max
        newMin = Math.ceil(rawPivot);
    }

    if (newMax - newMin === 1) {
        const newChar = input[idx+1]
        if (newChar === 'L') {
            return newMin
        } else if (newChar === 'R') {
            return newMax
        } else {
            console.warn('Min, Max, newChar, Idx, Input: ', min, max, newChar, idx, input)
            throw new Error('Current character not a L or R!')
        }
    }
    return getNextNumberColumn(newMin, newMax, input, idx + 1)
}

const getRowColStrings = (boardingPass) => {
    return [boardingPass.slice(0, 7), boardingPass.slice(7)]
}

const boardingPassesByRowCol = BOARDING_PASSES.map(bp => {
    const [rowStr, colStr] = getRowColStrings(bp)

    const rowNumber = getNextNumberRow(0, 127, rowStr)
    const colNumber = getNextNumberColumn(0, 7, colStr)
    return [rowNumber, colNumber, rowStr, colStr]


})

const seatIds = boardingPassesByRowCol.map(bp => {
    return bp[0] * 8 + bp[1]
    // return{ id: bp[0] * 8 + bp[1], row: bp[0], col: bp[1], rowStr: bp[2], colStr: bp[3]}
})

// const sortedSeatIds = seatIds.sort((a,b) => a.id-b.id)
const sortedSeatIds = seatIds.sort((a,b) => a-b)

// console.log(sortedSeatIds)

sortedSeatIds.forEach((seatId, idx) => {
    if (idx === sortedSeatIds.length - 1) return
    if (sortedSeatIds[idx + 1] !== seatId + 1) console.log('Your seat ID is: ', seatId + 1)
})