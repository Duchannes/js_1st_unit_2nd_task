let json = require('./2.json')
let numOfWrongProperties = 0
let fs = require('fs')
let log = ''
let conditions = {
  flag: 'typeof json.flag !== \'boolean\'',
  myPromises: '!Array.isArray(json.myPromises)',
  element: 'typeof json.element !== \'object\'',
  screenshot: 'json.screenshot',
  elementText: 'typeof json.elementText !== \'string\'',
  allElementsText: '!json.allElementsText.toString().includes(\'const\')',
  counter: 'isNaN(parseFloat(json.counter)) || parseFloat(json.counter) < 10',
  config: 'json.config !== \'Common\'',
  const: '!(/FiRst/i).test(json.const)',
  parameters: 'typeof json.parameters !== \'object\' || json.parameters.length !== 8',
  description: 'typeof json.description !== \'string\' || json.description.length <= 5 || json.description.length >= 13'
}

function chechJsonObject (conditions, json) {
  for (var propertyName in conditions) {
    // eslint-disable-next-line no-eval
    if (eval(conditions[propertyName])) {
      propertyIsWrong(json[propertyName], propertyName)
    }
  }
  if (numOfWrongProperties === 0) {
    console.log('OK')
  } else {
    fs.writeFile('log.txt', log, 'utf-8', () => { console.log('File log.txt was created') })
  }
}

function propertyIsWrong (propertyValue, propertyName) {
  numOfWrongProperties++
  log += numOfWrongProperties + '. Property ' + propertyName + ' is wrong.\r\n' + 'value: ' + propertyValue + '\r\n'
}

chechJsonObject(conditions, json)
