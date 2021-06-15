$(document).ready(function() {
  console.log('start')

  $('#tweet-text').on('keypress', function(event) {
    console.log(event.originalEvent)
  })
});

