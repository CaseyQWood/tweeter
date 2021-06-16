$(document).ready(function() {
  console.log('start')

  $('.tweet-text').on('keyup', function(event) {
    let numCount = 140 - $(this).val().length;

    if (numCount < 0) {
      $('#number').addClass('color-red');
    } 
    if (numCount >= 0) {
      $('#number').removeClass('color-red')
    }

    $('#number').text(`${numCount}`);
  })
});

