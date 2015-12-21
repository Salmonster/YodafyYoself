var m = require('mithril')
// var unirest = require('unirest')
var Yoda = module.exports;

// Model -- only 1 API request so not placed in its own module
Yoda.submit = function (phrase) {
  console.log(phrase);
  return m.request({method: 'GET', url: "https://yoda.p.mashape.com/yoda?sentence=" + phrase,
    config: function(xhr, options) {
        xhr.setRequestHeader("X-Mashape-Key", "Vs6AqovCQ2msh3xrMJLgHUYnSvPXp17ZFcJjsnlqUlWYcq3SS9")
        xhr.setRequestHeader("Accept", "text/plain")
    }}).then(function(data) {
        console.log('success: ', data)
    }, function(err) {
        console.log('error: ', err)
    })
}

// Yoda.submit = function (phrase) {
//   unirest.get("https://yoda.p.mashape.com/yoda?sentence=You+will+learn+how+to+speak+like+me+someday.++Oh+wait.")
//   .header("X-Mashape-Key", "Vs6AqovCQ2msh3xrMJLgHUYnSvPXp17ZFcJjsnlqUlWYcq3SS9")
//   .header("Accept", "text/plain")
//   .end(function (result) {
//     console.log(result.status, result.headers, result.body);
//   });
// }

//Controller
Yoda.controller = function () {
  var ctrl = this;

  ctrl.phrase = null;
  ctrl.yodaResponse = null;

  ctrl.yodafy = function () {
    Yoda.submit(ctrl.phrase)
    .then(function(data) {
      var yodaTimer = setInterval(function() {
        var voices = speechSynthesis.getVoices();
        console.log(data);
        // deserialize: function(value) {return value;}
        ctrl.phrase = '';
        // ctrl.yodaResponse = '';
        if (voices.length !== 0) {
          ctrl.yodaResponse = data;
          var msg = new SpeechSynthesisUtterance(data);
          msg.voice = voices[21];
          speechSynthesis.speak(msg);
          clearInterval(yodaTimer);
        }
        event.preventDefault();
      }, 200).then(null, function(data) {
          console.log(data);
      })
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
