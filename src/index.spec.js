let htmlAnalyzer = require('./index')

htmlAnalyzer('https://www.google.com/', insights => {
  console.log(insights)
})
