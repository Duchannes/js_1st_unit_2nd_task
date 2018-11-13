// "flag" - boolean
// "myPromises" - array
// "element" - object
// "screenshot" - null
// "elementText" - string
// "allElementsText" - contain "const" in string
// "counter" - more than 10
// "config" - equal "Common"
// "const" - equal "FiRst" (case insensitive)
// "parameters" - array with length 8
// "description" - string with length more than 5 but less than 13

let json = require('./2.json')
let numOfWrongProperties = 0
let fs = require('fs')
let log = ''

chechJsonObject(json)

function chechJsonObject (object) {
  if (typeof json.flag !== 'boolean') {
    propertyIsWrong(json.flag, 'flag')
  }
  if (!Array.isArray(json.myPromises)) {
    propertyIsWrong(json.myPromises, 'myPromises')
  }
  if (typeof json.element !== 'object') {
    propertyIsWrong(json.element, 'element')
  }
  if (!json.screenshot) {
    propertyIsWrong(json.screenshot, 'screenshot')
  }
  if (typeof json.elementText !== 'string') {
    propertyIsWrong(json.elementText, 'elementText')
  }
  if (!json.allElementsText.toString().includes('const')) {
    propertyIsWrong(json.allElementsText, 'allElementsText')
  }
  if (isNaN(parseFloat(json.counter)) || parseFloat(json.counter) < 10) {
    propertyIsWrong(json.counter, 'counter')
  }
  if (!json.config === 'Common') {
    propertyIsWrong(json.config, 'config')
  }
  if (!(/FiRst/i).test(json.const)) {
    propertyIsWrong(json.const, 'const')
  }
  if (typeof json.parameters !== 'object' || json.parameters.length !== 8) {
    propertyIsWrong(json.parameters, 'parameters')
  }
  if (typeof json.description !== 'string' || json.description.length <= 5 || json.description.length >= 13) {
    propertyIsWrong(json.description, 'description')
  }
}

function propertyIsWrong (property, name) {
  numOfWrongProperties++
  log += numOfWrongProperties + '. Property ' + name + ' is wrong.\r\n' + 'value: ' + property + '\r\n'
}

if (numOfWrongProperties === 0) {
  console.log('OK')
} else {
  fs.writeFile('log.txt', log.toString(), 'utf-8', () => { console.log('File log.txt was created') })
}
