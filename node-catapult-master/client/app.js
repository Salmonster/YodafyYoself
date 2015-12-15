var m = require('mithril')
var MyComponent = require('./components/MyComponent')

//FILL OUT THIS PAGE WITH ANY JS CODE FROM YODA-FY.JS??

//
// Global variable for global state (e.g. currentUser)
//
window.App = {}

//
// Client-side routing
//
m.route.mode = 'pathname'
m.route(document.getElementById('app'), '/', {

  '/': MyComponent

})
