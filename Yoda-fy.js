
$( "#target" ).submit(function( event ) {
  var phrase = $(".form-control").val();
  console.log(phrase);
  $.ajax({
    url:"https://yoda.p.mashape.com/yoda?sentence="+phrase,
    headers: {"X-Mashape-Key": "Vs6AqovCQ2msh3xrMJLgHUYnSvPXp17ZFcJjsnlqUlWYcq3SS9", "Accept": "text/plain"},
    success: function(data){
           console.log(data)
           // $('.container').append(JSON.stringify(data))
            $(".yoda").append(data);
          },
    error:function(data){
            console.log(data)
          }
  })
})
