// import * as fs from 'fs'


// const expenseReport: number[] = fs.readFileSync('./expense-report', 'utf-8').split('\n').map(str => Number(str))

// const getMatching = (arr, toMatch) => {
//     const validCounterParts = new Set()
//     for (const expense of arr) {

//         // const matches = hasMatchingPair(expense, toMatch)
//         const remainder = toMatch - expense
//         if (validCounterParts.has(remainder)) {
//             return [remainder, expense]
//         } else {
//             validCounterParts.add(expense)
//             validCounterParts.add(toMatch - expense)
//         }
//     }
// }


// // const matching = getMatching(expenseReports, toMatch)
// // console.log(getMatching()) // tuple of matching values that sum to 2020
// // console.log(matching[0] * matching[1])

// const sortedExpenseReport = expenseReport.sort((a,b) => a - b)



// let totals = []
// for (const expense of expenseReport) {
//     expenseReport.slice(expenseReport.indexOf(expense) + 1).forEach(x => {
//         if (expense + x < 2020) {
//                 totals.push(expense + x)
//         }
//     })
// }


// const [remainder, first] = getMatching(totals, 2020)

// // const [second, third] = getMatching(expenseReport, remainder)

// // console.log(remainder)
// // console.log(first, second, third)



// const getMatchingForFirstStepIn3 = () => {
//     const validCounterParts = new Set(expenseReport)

//     totals.forEach(total => {
//         const remainder = 2020 - total
//         // console.log(total, remainder)
//         if (validCounterParts.has(remainder)) {
//             return [remainder, total]
//         }
//     })
// }
// console.log(getMatchingForFirstStepIn3())

// @ts-ignore
const fs = require('fs')
const expenseReport = fs.readFileSync('expense-report', 'utf8')
    .split('\n')
    .map(c => +c)

// part 1
for (const a of expenseReport) {
	for (const b of expenseReport) {
		if (a + b === 2020) {
			console.log( a * b);
		}
	}
}

// part 2
for (const a of expenseReport) {
	for (const b of expenseReport) {
		for (const c of expenseReport) {
			if (a + b + c === 2020) {
				console.log( a * b * c);
			}
		}
	}
}