var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
// var axios = require('axios')
var routes = express.Router()

//
// Provide a browserified file at a specified path
//
// The next line of code looks at app.js and all of its "required" modules, which should
// include all of your app's JS files, and then refers to them all as "app-bundle.js" or
// whatever you want to call it, so you can have just one script tag in your html.
// That's your Express and Browserify working for you!
routes.get('/app-bundle.js', browserify('./client/app.js'))

//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'mithril'])
})

//NPM install --save axios to do an API request
// routes.get('/phrase', function (req, res) {
  // axios.get('...', { headers: {} })
// })

//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))


if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express()

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() )

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}
