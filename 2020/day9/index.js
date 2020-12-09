const fs = require('fs')

const parseInput = (input) => {
    return input.split('\n')
        .map(x => Number(x))
}

// const INPUT = parseInput(fs.readFileSync('./test-input', 'utf-8'))
const INPUT = parseInput(fs.readFileSync('./input', 'utf-8'))



const LENGTH = 25
let CURRENT_IDX = 25 // starting at the 26th element

// Part 1
const hasSum = () => {
    const currentSlice = INPUT.slice(CURRENT_IDX - LENGTH, LENGTH + CURRENT_IDX)
    const nextNumber = INPUT[CURRENT_IDX] // our 'sum'

    const validRemainders = []
    const validCombo = []
    for (const num of currentSlice) {
        const remainder = nextNumber - num
        if (validRemainders.includes(remainder)) {
            validCombo.push(num)
            validCombo.push(remainder)
            break
        } else {
            validRemainders.push(num)
        }
    }
    return validCombo
}

const run = () => {
    const sumPair = hasSum()
    if (sumPair.length === 2) {
        CURRENT_IDX++
        return run()
    } else {
        return INPUT[CURRENT_IDX]
    }
}

// console.log(run())

// Part 2

const INVALID_NUMBER = run() // 1492208709
// const INVALID_NUMBER = 127

console.log('Input length: ', INPUT.length)


const search = (currentlySearchingIdx = 0, nextIdx = currentlySearchingIdx, numbers = [], sum = 0) => {
    const cV = INPUT[nextIdx]

    numbers.push(cV) // add current value to the tracking array
    const newSum = sum + cV

    if (currentlySearchingIdx === INPUT.length -1) throw new Error('Woops, we hit the end of the INPUT')
    if (newSum > INVALID_NUMBER) return search(currentlySearchingIdx + 1) // all params get set back to default, so we're starting over (numbers is empty array, sum is 0)

    if (newSum === INVALID_NUMBER) { // success
        console.log(numbers)
        const sorted = numbers.sort((a, b) => a-b)
        const min = sorted[0]
        const max = sorted[sorted.length - 1]
        const answer = min + max
        return console.log(answer)
    }

    // newSum is less than INVALID_NUMBER, so let's keep searching
    return process.nextTick(() => search(currentlySearchingIdx, nextIdx + 1, numbers, newSum))
}



search()
