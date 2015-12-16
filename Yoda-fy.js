

$( "#target" ).submit(function( event ) {
  var phrase = $(".form-control").val();
  console.log(phrase);
  $.ajax({
    url: "https://yoda.p.mashape.com/yoda?sentence="+phrase,
    headers: {"X-Mashape-Key": "Vs6AqovCQ2msh3xrMJLgHUYnSvPXp17ZFcJjsnlqUlWYcq3SS9", "Accept": "text/plain"},
    success: function(data) {
            console.log(data);
            $(".yoda").text('');
            $(".form-control").val('');
            $(".yoda").append(data);
            var voices = speechSynthesis.getVoices();
            var msg = new SpeechSynthesisUtterance(data);
            msg.voice = voices[21];
            speechSynthesis.speak(msg);
          },
    error: function(data) {
            console.log(data);
          }
  })
  // return false;
  // event.preventDefault(); 
  // use either of the above lines, or keep 'action="#"' in html form tag--but why?
})
