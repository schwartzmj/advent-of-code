// @ts-ignore

// part 1
// const fs = require('fs')
// const passwords = fs.readFileSync('passwords', 'utf8')
//     .split('\n')
//     .map(x => {
//         const [range, letter, password] = x.split(' ')
//         const [min, max] = range.split('-')
//         // console.log(range, letter, password)
//         return {
//             range: {
//                 min,
//                 max
//             },
//             letter: letter.replace(':', ''),
//             password
//         }
//     }
//     )

// const hasValidLetterCount = (passwordObject) => {
//     const letterCount = getLetterCountInPassword(passwordObject.letter, passwordObject.password)
//     return ( passwordObject.range.min <= letterCount && passwordObject.range.max >= letterCount )
// }

// const getLetterCountInPassword = (letter, password) => {
//     return password.split('').filter(char => char === letter).length
// }

// const validPasswords = passwords.filter(pw => hasValidLetterCount(pw))

// console.log(validPasswords.length)


// part 2
const fs = require('fs')

type Password = {
    indexes: [];
    letter: string;
    password: string;
}
const passwords: Password[] = fs.readFileSync('passwords', 'utf8')
    .split('\n')
    .map(x => {
        const [range, letter, password] = x.split(' ')
        const indexes = range.split('-')

        return {
            indexes: indexes.map(s => Number(s)),
            letter: letter.replace(':', ''),
            password
        }
    }
    )

const getCountOfMatchingLetterAtEachIndex = (letter, pw: Password) => {
    let count = 0;
    pw.indexes.forEach((oneBasedIndex) => {
        if (typeof oneBasedIndex === 'string') throw new Error('The "one-based index" given is a string and needs to be a number.')
        if (pw.password[oneBasedIndex - 1] == letter) {
            count++
        }
    })
    return count;
}

const hasValidIndexAtLetterCount = (pw) => {
    const letterCount = getCountOfMatchingLetterAtEachIndex(pw.letter, pw)
    return letterCount === 1
}


const validPasswords = passwords.filter(pw => hasValidIndexAtLetterCount(pw))

console.log(validPasswords.length)
