const json = require('./2.json')
const fs = require('fs')

const conditions = {
  flag: 'typeof json.flag !== \'boolean\'',
  myPromises: '!Array.isArray(json.myPromises)',
  element: 'typeof json.element !== \'object\'',
  screenshot: 'json.screenshot !== null',
  elementText: 'typeof json.elementText !== \'string\'',
  allElementsText: '!json.allElementsText.toString().includes(\'const\')',
  counter: 'isNaN(parseFloat(json.counter)) || parseFloat(json.counter) < 10',
  config: 'json.config !== \'Common\'',
  const: '!(/FiRst/i).test(json.const)',
  parameters: 'typeof json.parameters !== \'object\' || json.parameters.length !== 8',
  description: 'typeof json.description !== \'string\' || json.description.length <= 5 || json.description.length >= 13'
}

let numOfWrongProperties = 0
let wrongProperties = {}

function chechJsonObject (conditions, json) {
  const objKeys = Object.keys(conditions)
  objKeys.forEach((propertyName, index, array) => {
  // eslint-disable-next-line no-eval
    if (eval(conditions[propertyName])) {
      propertyIsWrong(json[propertyName], propertyName)
    }
  })
}

function propertyIsWrong (propertyValue, propertyName) {
  numOfWrongProperties++
  wrongProperties[propertyName] = propertyValue
}

function checkProperties () {
  if (!numOfWrongProperties) {
    console.log('OK')
  } else {
    fs.writeFile('Wrong_Properties.json', JSON.stringify(wrongProperties, null, ' '), 'utf-8', () => console.log(numOfWrongProperties + ' properties are wrong. File Wrong_Properties.json was created'))
  }
}

chechJsonObject(conditions, json)
checkProperties()
