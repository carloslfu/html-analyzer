var jsdom = require('jsdom')

const deprecatedElments = [
  'acronym',
  'big',
  'center',
  'font',
  'strike',
  'tt',
  'frame',
  'frameset',
  'noframes',
  'dir',
  'basefont',
  'ap',
]

function getInsights (window) {
  var insights = {
    numberOfElements: 0,
    elementCount: {},
    elementCountOrdered: [],
    elementDeprecated: [],
  }
  var i

  var elements = window.document.querySelectorAll('*')

  // number of elements in the document

  insights.numberOfElements = elements.length

  // element count
  var tagName
  for (i = 0, len = elements.length; i< len; i++) {
    tagName = elements[i].tagName.toLowerCase()
    if (!insights.elementCount.hasOwnProperty(tagName)) {
      insights.elementCount[tagName] = 1
    } else {
      insights.elementCount[tagName]++
    }
  }

  // element count ordered

  var tagNames = Object.keys(insights.elementCount)
  for (i = 0, len = tagNames.length; i < len; i++) {
    insights.elementCountOrdered[i] = [tagNames[i], insights.elementCount[tagNames[i]]]
  }

  insights.elementCountOrdered = insights.elementCountOrdered.sort((a, b) => b[1] - a[1])

  // deprecated elements

  insights.elementDeprecated = insights.elementCountOrdered.filter(item => deprecatedElments.indexOf(item[0]) !== -1)

  return insights

}

module.exports = function (html, cb) { // can be raw html or an url

  jsdom.env(
    html,
    [],
    function (err, window) {
      cb(getInsights(window))
      window.close()
    }
  )

}
