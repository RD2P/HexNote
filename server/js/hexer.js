const fs = require('fs')
const path = require('path')

const { hexToString, stringToHex } = require('./functions')

const data = fs.readFileSync(path.join(__dirname, '..', 'data', 'sometext.txt'), 'utf-8')

// const hexed = stringToHex(data)
const unhexed = hexToString(data)

fs.writeFileSync(path.join(__dirname, '..', 'data', 'sometext.txt'), unhexed)
