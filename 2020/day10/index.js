const fs = require('fs')

const sortInput = (input) => input.sort((a, b) => a - b)

const parseInput = (input) => {
    return sortInput(
            input.split('\n')
            .map(str => Number(str))
    )
}

const INPUT = parseInput(fs.readFileSync('./input', 'utf-8'))
const TEST_INPUT = parseInput(fs.readFileSync('./test-input', 'utf-8'))

// const getAllOccurencesFromSortedNumArray = (needle, haystack) => {
//     const allValues = []
//     const firstIdx = haystack.indexOf(needle)
//     if (firstIdx === -1) return allValues // if the value does not exist in the array, return empty array

//     for (const val of haystack.slice(firstIdx)) { // .slice to start at the first occurrence of the value instead of needlessly looping through entire array
//         if (val !== needle) break // stop loop if value is not the same as needle. the array is sorted so we won't miss any.
//         allValues.push(val)
//     }
//     return allValues
// }

const getCompatibleAdapters = (joltage, input) => {
    // const oneOver = getAllOccurencesFromSortedNumArray(joltage + 1, input)
    // const twoOver = getAllOccurencesFromSortedNumArray(joltage + 2, input)
    // const threeOver = getAllOccurencesFromSortedNumArray(joltage + 3, input)

    const oneOver = input.includes(joltage + 1) && joltage + 1
    const twoOver = input.includes(joltage + 2) && joltage + 2
    const threeOver = input.includes(joltage + 3) && joltage + 3

    return [oneOver, twoOver, threeOver]
}






// Part 1
// const recursiveCheckCompatible = (joltage, input, chain = [joltage], loopIdx = 0) => {
//     if (joltage === input[input.length - 1]) { // return the result (and add the 'wall adapter' and 'built-in adapter')
//         const newChain = [...chain]
//         newChain.unshift(0)
//         newChain.push(chain[chain.length - 1] + 3)
//         return newChain
//     }

//     const adapters = getCompatibleAdapters(joltage, input)

//     for (const [idx, adapter] of adapters.entries()) {
//         if (adapter) {
//             chain.push(adapter)
//             return recursiveCheckCompatible(adapter, input, chain)
//         } else {
//             // do nothing
//         }
//     }
// }

// const chain = recursiveCheckCompatible(TEST_INPUT[0], TEST_INPUT)
// const tallyDifferences = (chain) => {
//     const tally = {}
//     for (const [idx, voltage] of chain.entries()) {
//         const nextVal = chain[idx + 1]
//         if (!nextVal) break // stop at last idx, b/c nothing to compare to at next idx

//         const difference = nextVal - voltage

//         if (!tally[difference]) { // if key doesnt exist
//             tally[difference] = 1
//         } else {
//             tally[difference] += 1
//         }
//         console.log(idx, voltage, nextVal, tally)
//     }
//     return tally
// }
// console.log(tallyDifferences(chain))



// Part 2

let counter = 0
// const joltagesWithNoCompatible = new Set()
const recursiveCheckCompatible = (joltage, input, chain = [joltage]) => {
    if (joltage === input[input.length - 1]) { // if we reach the end, count it
        // const newChain = [...chain]
        // newChain.unshift(0)
        // newChain.push(chain[chain.length - 1] + 3)
        counter++
        // console.log('answers: ', counter)
        // counter = 0
        // return newChain
    }

    // if (!joltagesWithNoCompatible.has(joltage)) { // if the joltage was not previously compatible, don't even start searching
        const adapters = getCompatibleAdapters(joltage, input)

        // if (adapters.filter(Boolean).length === 0) joltagesWithNoCompatible.add(joltage)

        for (const [idx, adapter] of adapters.entries()) {
            if (adapter) {
                chain.push(adapter)
            //    process.nextTick(() =>
               recursiveCheckCompatible(adapter, input, chain)
            //    )
            } else {
                // do nothing
            }
        }
    // }

}

const breakIntoChunks = (input) => {
    let chunks = []
    let iteration = 0
    for (const [idx, jolt] of input.entries()) { // chunk it whenever it jumps by 3
        if (!chunks[iteration]) chunks[iteration] = []

        chunks[iteration].push(jolt)

        if (input[idx + 1] === jolt + 3) {
            iteration++
        }

    }
    return chunks
}

const chunkedAdapterChain = chunks => {
    let newChunks = []
    let iteration = 0
    for (const [idx, chunk] of chunks.entries()) {
        if (!newChunks[iteration]) newChunks[iteration] = []
        for (const jolt of chunk) {
            newChunks[iteration].push(jolt)
        }

        if (chunk.length === 1) {
            iteration++
        }
    }
    return newChunks
}
INPUT.unshift(0)
INPUT.push(INPUT[INPUT.length - 1] + 3)
const chunks = breakIntoChunks(INPUT)
const chunkedChain = chunkedAdapterChain(chunks)
// console.log(chunks)
// console.log(chunkedChain)


// console.log(chunkedChain[0])
// recursiveCheckCompatible(chunkedChain[0][0], chunkedChain[0])
const toMultiply = []
chunkedChain.forEach(chnk => {
    // console.log(chnk)
    // console.log('----------')
    let before = counter
    recursiveCheckCompatible(chnk[0], chnk)



    toMultiply.push(counter - before)
    // console.log(counter)

})
console.log(toMultiply.reduce((acc, cV) => acc * cV))



// const getReverseCompatibleAdapters = (joltage, input) => {
//     // const oneOver = getAllOccurencesFromSortedNumArray(joltage + 1, input)
//     // const twoOver = getAllOccurencesFromSortedNumArray(joltage + 2, input)
//     // const threeOver = getAllOccurencesFromSortedNumArray(joltage + 3, input)

//     const oneUnder = input.includes(joltage - 1) && joltage - 1
//     const twoUnder = input.includes(joltage - 2) && joltage - 2
//     const threeUnder = input.includes(joltage - 3) && joltage - 3

//     return [oneUnder, twoUnder, threeUnder]
// }

// const tooFarApart = []
// INPUT.forEach()
// const arr = []
// TEST_INPUT.forEach((joltage, idx) => {
//     const results = getCompatibleAdapters(joltage, TEST_INPUT).filter(Boolean)
//     let count = 0
//     // console.log(results)
//     // results.forEach(count => {
//     //     count++
//     // })
//     count += results.length

//     arr.push(count)
// })

// const answer = arr.reduce((acc, cV, idx) => {
//     console.log(acc, cV)
//     return acc * cV
// })
// console.log(answer)









// // const dfsSearch = (first, input) => {
// //     const visited = new Map();
// //     const visitList = [];

// //     visitList.unshift(first);

// //     while(visitList.length > 0) {
// //       const node = visitList.shift();
// //       if(node && !visited.has(node)) {
// //         visited.set(node);
// //         list[node.toString()].forEach(adj => visitList.unshift(adj));
// //       }
// //     }

// //     return visited
// // }
// // dfsFromFirst = dfsSearch('0', TEST_INPUT)


// const adjacenyList = input => {
//     const list = {}

//     for (const joltage of input) {
//         const [oneOver, twoOver, threeOver] = getCompatibleAdapters(joltage, input)
//         list[joltage] = [oneOver, twoOver, threeOver].filter(Boolean)
//     }
//     return list
// }

// INPUT.unshift(0)
// INPUT.push(INPUT[INPUT.length - 1] + 3)

// const list = adjacenyList(INPUT)
// function findAllPaths(source, destination, path = new Map()) {
//     const sourceNode = list[source.toString()];
//     const destinationNode = list[destination.toString()];
//     const newPath = new Map(path);

//     if (!destinationNode || !sourceNode) return [];

//     newPath.set(sourceNode);

//     if (source.toString() === destination.toString()) {
//       return [Array.from(newPath.keys())];
//     }

//     const paths = [];
//     sourceNode.forEach((node) => {
//       if (!newPath.has(node)) {
//         const nextPaths = findAllPaths(node, destination, newPath);
//         nextPaths.forEach((nextPath) => paths.push(nextPath));
//       }
//     });
//     return paths;
//   }

//   const source = '0'
// const destination = '159'

// // console.log(findAllPaths(source, destination).length)

// let result
// for (const key in list) {
//     const length = list[key].length
//     if (length === 0) return

//     let toAdd = list[key].reduce((acc, cV) => acc + cV)

//     if (!result) {
//         result = toAdd
//     } else {
//         result = result * toAdd

//         console.log(result)
//     }

// }

// console.log(result)