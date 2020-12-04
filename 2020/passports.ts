import * as fs from 'fs'

const passports = fs.readFileSync('passports', 'utf-8')
    .split('\n\n')
    .map(passport => passport.split(/ |\n/)
    .reduce((acc, cv) => { // cv e.g. = hgt:3404
        const [key, value] = cv.split(':')
        if (key in acc) throw new Error(`Duplicate key detected in passport. Key: ${key} Value: ${value}`)
        acc[key] = value
        return acc
    }, {}))


const FIELDS = [
    {
        name: 'byr',
        requirements: ['required'],
        validator: function(passport) {
            return (passport.byr.length == 4 &&
                (Number(passport.byr) >= 1920 &&
                Number(passport.byr <= 2002))
                )
        }
    },
    {
        name: 'iyr',
        requirements: ['required'],
        validator: function(passport) {
            return (passport.iyr.length == 4 &&
                (Number(passport.iyr) >= 2010 &&
                Number(passport.iyr <= 2020))
                )
        }
    },
    {
        name: 'eyr',
        requirements: ['required'],
        validator: function(passport) {
            return (passport.eyr.length == 4 &&
                (Number(passport.eyr) >= 2020 &&
                Number(passport.eyr <= 2030))
                )
        }
    },
    {
        name: 'hgt',
        requirements: ['required'],
        validator: function(passport) {
            const measurementLabel = passport.hgt.slice(passport.hgt.length - 2)
            const value = passport.hgt.slice(0, passport.hgt.length - 2)
            if (!measurementLabel) return false
            if (measurementLabel == 'cm') {
                return (
                    Number(value) >= 150 &&
                    Number(value) <= 193
                )
            }
            if (measurementLabel == 'in') {
                return (
                    Number(value) >= 59 &&
                    Number(value) <= 76
                )
            } else {
                return false
            }
        }
    },
    {
        name: 'hcl',
        requirements: ['required'],
        validator: function(passport) {
            if (passport.hcl[0] !== '#') return false
            const colorWithoutPound = passport.hcl.slice(1)
            if (colorWithoutPound.length !== 6) return false
            let charactersInvalid = false
            const validCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
            for (const char of colorWithoutPound.split('')) {
                if (!validCharacters.includes(char)) {
                    charactersInvalid = true
                }
            }
            return !charactersInvalid
        }
    },
    {
        name: 'ecl',
        requirements: ['required'],
        validator: function(passport) {
            const valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
            return valid.includes(passport.ecl)
        }

    },
    {
        name: 'pid',
        requirements: ['required'],
        validator: function(passport) {
            const isANumber = !isNaN(passport.pid)
            return passport.pid.length == 9 && isANumber
        }
    },
    {
        name: 'cid',
        requirements: ['optional']
    },
]
const REQUIRED_FIELDS = FIELDS.filter(field => field.requirements.includes('required'))

const getMissingFields = (passport) => {
    return REQUIRED_FIELDS.filter(rField => {
        return !(rField.name in passport)
    })
}

const runCustomValidators = passport => {
    const valid =[]
    const invalid =[]
    for (const field of FIELDS) {
        if ('validator' in field) {
            const result = field.validator(passport)

            if (result) {
                valid.push(field)
            } else {
                    // console.log("FAILED")
                    // console.log("Field: ", field.name)
                    // console.log("PP value: ", passport[field.name])
                    // console.log('\n')
                invalid.push(field)
            }
        }
    }
    return { validThroughValidators: valid, invalidThroughValidators: invalid }
}

const validatePassports = (passports) => {
    const valid = []
    const invalid = []
    for (const passport of passports) {
        const missingFields = getMissingFields(passport)
        if (missingFields.length > 0) {
            invalid.push({passport, errors: {
                required: missingFields
            }})
        } else {

            const { validThroughValidators, invalidThroughValidators } = runCustomValidators(passport)
            if (invalidThroughValidators.length >0) {
                invalid.push(passport)
            } else {
                valid.push(passport)
            }
        }
    }
    console.log('valid: ', valid)
    return {valid, invalid}
}
// console.log(passports)
const {valid, invalid} = validatePassports(passports)
console.log(valid.length)
