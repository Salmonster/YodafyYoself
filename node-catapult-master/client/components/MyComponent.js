var m = require('mithril')
var Yoda = module.exports;

//Model -- only 1 API request so not placed in its own module
Yoda.submit = function (phrase) {
  console.log(phrase);
  return m.request({ 
    method: 'GET', 
    url: "https://yoda.p.mashape.com/yoda?sentence=" + phrase, 
    headers: {"X-Mashape-Key": "Vs6AqovCQ2msh3xrMJLgHUYnSvPXp17ZFcJjsnlqUlWYcq3SS9", 
              "Accept": "text/plain"}
    });
}

//Controller
Yoda.controller = function () {
  var ctrl = this;

  ctrl.phrase = null;
  ctrl.yodaResponse = null;

  ctrl.yodafy = function () {
    Yoda.submit(ctrl.phrase)
    .then(function(data) {
      console.log(data);
      // deserialize: function(value) {return value;}
      ctrl.phrase = '';
      // ctrl.yodaResponse = '';
      ctrl.yodaResponse = data;
      var voices = speechSynthesis.getVoices();
      var msg = new SpeechSynthesisUtterance(data);
      msg.voice = voices[21];
      speechSynthesis.speak(msg);
      event.preventDefault();
    }).then(null, function(data) {
        console.log(data);
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
        // aria-describedby: 'basic-addon1'
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
