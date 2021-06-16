$(document).ready(function() {
  console.log('start')

  $('#tweet-text').on('keyup', function() {
    let numCount = 140 - $(this).val().length
    // numCount -= 140
    if (numCount < 0) {
      $('#number').addClass('too-much-char') 
    }
    $('#number').text(`${numCount}`);
  })
});

