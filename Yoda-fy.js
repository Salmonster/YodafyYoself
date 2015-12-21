

$( "#target" ).submit(function( event ) {
  var phrase = $(".form-control").val();
  console.log(phrase);
  $.ajax({
    url: "https://yoda.p.mashape.com/yoda?sentence="+phrase,
    headers: {"X-Mashape-Key": "Vs6AqovCQ2msh3xrMJLgHUYnSvPXp17ZFcJjsnlqUlWYcq3SS9", "Accept": "text/plain"},
    success: function(data) {
      //Use setInterval to keep checking if voices array has been filled prior to creating speech utterance
          var yodaTimer = setInterval(function() {
            var voices = speechSynthesis.getVoices();
            console.log(data);
            $(".yoda").text('');
            $(".form-control").val('');
            console.log(voices.length);
            if (voices.length !== 0) {
              $(".yoda").append(data);
              var msg = new SpeechSynthesisUtterance(data);
              msg.voice = voices[21];
              speechSynthesis.speak(msg);
              clearInterval(yodaTimer);
            }
          }, 200)
        },
    error: function(data) {
            console.log(data);
          }
  })
  // return false;
  event.preventDefault(); 
  // use either of the above lines, or keep 'action="#"' in html form tag
})
