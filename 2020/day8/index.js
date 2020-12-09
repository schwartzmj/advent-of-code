const fs = require('fs')

const parseInput = (input) => {
    // console.log(input)
    return input.split('\n')
        .map(instruction => {
            const [operation, signedInt] = instruction.split(' ')
            // const argumentOperand = signedInt[0] // e.g. + or -
            // const argumentValue = Number(signedInt.slice(1))
            return {
                argument: Number(signedInt),
                operation,
                // argumentOperand,
                // argumentValue
            }
        })
}

const TEST_INPUT = parseInput(fs.readFileSync('./test-input', 'utf-8'))
const INPUT = parseInput(fs.readFileSync('./input', 'utf-8'))


let ACCUMULATOR = 0;
const INSTRUCTIONS_EXECUTED_BY_INDEX = new Set();

const handleInstruction = (instruction) => {
    switch(instruction.operation) {
        case('acc'):
            ACCUMULATOR += instruction.argument
            return 1;
        case('jmp'):
            return instruction.argument
        case('nop'):
            return 1
        default: throw new Error(`Unknown OPERATION given: ${instruction.operation} in INSTRUCTION: ${JSON.stringify(instruction)}`)
    }
}

const run = (input, instructionIndex = 0) => {
    // check if instruction already ran and stop if so
    if (INSTRUCTIONS_EXECUTED_BY_INDEX.has(instructionIndex)) return // PART 1: CONSOLE.LOG THE ACCUMULATOR HERE

    // if idx is undefined we fixed it
    if (input[instructionIndex] === undefined) return console.log('We fixed it, ACCUMULATOR: ', ACCUMULATOR)
    // run instruction
    const nextIdx = instructionIndex + handleInstruction(input[instructionIndex])


    // if we get an instruction back (success), add the successful (previous) instruction to the "instructions executed" set
    if (nextIdx) INSTRUCTIONS_EXECUTED_BY_INDEX.add(instructionIndex)

    if (!nextIdx) throw new Error(`No 'nextIdx' given`)

    // repeat
    return run(input, nextIdx)
}


const swapNopJmpInstruction = (instruction) => {
    const newInstruction = Object.assign({}, instruction)
    if (instruction.operation === 'jmp') {
        newInstruction.operation = 'nop'
    } else if (instruction.operation === 'nop') {
        newInstruction.operation = 'jmp'
    } else {
        console.log(instruction)
        throw new Error("Didn't find anything to swap even though we thought there would be, so something else probably went wrong dude.")
    }
    return newInstruction

}





// Part 2
const part2 = () => {
    const swapsToTryByIdx = (input, operation) => {
        return input.reduce((acc, cv, idx) => {
            if (cv.operation === operation) acc.push(idx)
            return acc
        }, [])
    }

    const jmpSwapsToTry = swapsToTryByIdx(INPUT, 'jmp')
    const nopSwapsToTry = swapsToTryByIdx(INPUT, 'nop')

    const jmpSwapInputs = jmpSwapsToTry.map(idx => {
        const newInput = [...INPUT]
        newInput[idx] = swapNopJmpInstruction(INPUT[idx])
        return newInput
    })

    const nopSwapInputs = nopSwapsToTry.map(idx => {
        const newInput = [...INPUT]
        newInput[idx] = swapNopJmpInstruction(INPUT[idx])
        return newInput
    })


    const reset = () => {
        // set ACCUMLATOR to 0 and clear INSTRUCTIONS_EXECUTED_BY_INDEX so next loop has defaults
        ACCUMULATOR = 0
        INSTRUCTIONS_EXECUTED_BY_INDEX.clear()
    }

    let loopCount = 0
    for (const input of jmpSwapInputs) {
        run(input)
        reset()
        loopCount += 1
    }

    for (const input of nopSwapInputs) {
        run(input)
        reset()
        loopCount += 1
    }
}
part2()