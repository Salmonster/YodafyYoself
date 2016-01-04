var m = require('mithril')
var Yoda = module.exports;

// Model -- only 1 API request so not placed in its own module
Yoda.submit = function (phrase) {
  console.log(phrase);
  return m.request({
    method: 'GET', 
    url: "https://yoda.p.mashape.com/yoda?sentence=" + phrase,
    //deserialize tells the API to return the response value as-is, not as JSON
    deserialize: function(value) {return value;},
    config: function(xhr, options) {
        xhr.setRequestHeader("X-Mashape-Key", "Vs6AqovCQ2msh3xrMJLgHUYnSvPXp17ZFcJjsnlqUlWYcq3SS9")
        xhr.setRequestHeader("Accept", "text/plain")
    }
  }).then(function(data) {
        console.log('success: ', data);
        return data;
    }, function(err) {
        console.log('error: ', err)
    })
}


//Controller
Yoda.controller = function () {
  var ctrl = this;

  ctrl.phrase = null;
  ctrl.yodaResponse = null;

  ctrl.yodafy = function () {
    event.preventDefault();
    Yoda.submit(ctrl.phrase)
    .then(function(data) {
      var yodaTimer = setInterval(function() {
        var voices = speechSynthesis.getVoices();
        ctrl.phrase = '';
        if (voices.length !== 0) {
          ctrl.yodaResponse = data;
          var msg = new SpeechSynthesisUtterance(data);
          msg.voice = voices[21];
          speechSynthesis.speak(msg);
          clearInterval(yodaTimer);
          //Because setInterval is outside of mithril's event listening, the page must be redrawn
          //manually after setInterval is completed in order to update the view.
          m.redraw();
        }
      }, 200)
    })
  }
}

//View
Yoda.view = function (ctrl) {
  return m('.my-component', [
    m('p', 'Type and submit to Yoda-fy, you must:'),
    m('form', {
      id: 'target',
      action: '#'
      }, [
      m('input[type=text]', {
        class: 'form-control',
        oninput: function(e) {
          ctrl.phrase = e.currentTarget.value;
        },
        placeholder: 'Write in here...'
        }),
      m('br'),
      m('.submission', [
        m("button", {
          onclick: ctrl.yodafy
          }, "Submit")
      ]),
    ]),
    m('br'),
    m('.yoda', ctrl.yodaResponse)
  ])
}
