const fs = require('fs')

const ANSWERS = fs.readFileSync('./day6/answers', 'utf-8')
    .split('\n\n')
    .map(x => x.split('\n'))

const getUniqueAnswersFromGroup = (group) => {
    const uniqueAnswers = new Set
    for (const singlePersonsAnswers of group) {
        for (const char of singlePersonsAnswers) {
            uniqueAnswers.add(char)
        }
    }
    return uniqueAnswers
}

const eachGroupUniqueAnswers = ANSWERS.map(getUniqueAnswersFromGroup)


let totalAnswersCount = 0

for (const groupUniqueAnswers of eachGroupUniqueAnswers) {
    totalAnswersCount += groupUniqueAnswers.size
}

console.log('Part 1: ', totalAnswersCount)

const didEveryoneAnswerYes = (group) => {
    // console.log(Array.from(getUniqueAnswersFromGroup(group)))
    let obj = {}
    for (const uniqueAnswer of Array.from(getUniqueAnswersFromGroup(group))) {
        let didAllAnswerYes = true
        for (const person of group) {
            if (!person.includes(uniqueAnswer)) didAllAnswerYes = false
        }
            if (didAllAnswerYes) obj[uniqueAnswer] = true
    }
    return obj
}

// for (const groupUniqueAnswers of eachGroupUniqueAnswers) {
//     const everyoneAnsweredYesToThese = didEveryoneAnswerYes(groupUniqueAnswers)
// }

const eachGroupAnswersThatEveryoneAnsweredYesTo = ANSWERS.map(groupAnswers => {
    return didEveryoneAnswerYes(groupAnswers)
})

let eachGroupAnswersThatEveryoneAnsweredYesToCounter = 0

eachGroupAnswersThatEveryoneAnsweredYesTo.forEach(group => {
    eachGroupAnswersThatEveryoneAnsweredYesToCounter += Object.keys(group).length
})

console.log('Part 2: ', eachGroupAnswersThatEveryoneAnsweredYesToCounter)