let htmlAnalyzer = require('./index')

htmlAnalyzer('https://www.facebook.com/', insights => {
  console.log(insights)
})
