$('documents').ready(function() {
  
  $('.quick-link').click(function() {
    
    $('.new-tweet').first().is(':hidden') ? $('.new-tweet').slideDown(): $('.new-tweet').slideUp()

  })
})