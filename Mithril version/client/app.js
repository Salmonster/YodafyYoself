var m = require('mithril')
var MyComponent = require('./components/MyComponent')

// Global variable for global state (e.g. currentUser)
//
// window.App = {}

//
// Client-side routing
//
m.route.mode = 'pathname'
m.route(document.getElementById('app'), '/', {

  '/': MyComponent

})
