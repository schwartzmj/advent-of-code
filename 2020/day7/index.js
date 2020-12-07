const { match } = require('assert')
const fs = require('fs')

const RULES = fs.readFileSync('./day7/rules', 'utf-8')
    .split('\n')

const TEST_RULES = fs.readFileSync('./day7/testrules', 'utf-8')
    .split('\n')

const parseRule = (rule) => {
    const [outerBagRaw, contentsRaw] = rule.split('contain')
        .map(s => s.trim())
        const outerBag = outerBagRaw.replace('bags', '').trim()
    const contents = contentsRaw.split(',')
        .map(s => {
            const formatted = s.replace('bags', '').replace('bag', '').replace('.', '').trim()
                .split(' ')
            const quantity = formatted[0]
            const type = formatted.slice(1).join(' ')
            return { quantity, type }
        })
    return {
        outerBag,
        contents
    }
}

const PARSED_RULES = RULES.reduce((acc, rule) => {
    const {outerBag, contents} = parseRule(rule)
    acc[outerBag] = contents
    return acc
}, {})

// console.log(PARSED_RULES)

const getBagsThatCanHoldThisType = (type) => {
    const bags = []
    for (const rule in PARSED_RULES) {
        const matchingContains = PARSED_RULES[rule].filter(r => r.type === type)
        if (matchingContains.length > 0) bags.push({
            type: rule,
            quantity: matchingContains.reduce((acc, cv) => {return acc + Number(cv.quantity)}, 0)
        })
    }
    return bags
}

const uniqueBagsCounted = new Set()
const recursivelyGetBagsThatCanHoldThisType = (type) => {
    const containerBags = getBagsThatCanHoldThisType(type)
    if (containerBags.length === 0) return // if no match, return don't process further

    for (const bag of containerBags) {

        if (!uniqueBagsCounted.has(bag.type)) {
            uniqueBagsCounted.add(bag.type)
        }
        recursivelyGetBagsThatCanHoldThisType(bag.type)
    }
}

recursivelyGetBagsThatCanHoldThisType('shiny gold')
console.log('Part 1: ', uniqueBagsCounted.size)
// console.log('Part 2: ', counter)
