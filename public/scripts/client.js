/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = function(data) {
  const userKey = data.user
  const timeAgo = timeago.format(data.created_at)
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
   

  return `
    <article class='tweets-container'>
      <header>
        <div>
          <image src='${escape(userKey.avatars)}' class="color-red"></image>
          <p>${escape(userKey.name)}</p>
        </div>
        <div>${escape(userKey.handle)}</div>
      </header>
      <p id='wrap'>${escape(data.content.text)}</p>
      <footer>
        <p class='time'>${escape(timeAgo)}</p>
        <div>
          <i class="tiny-icon fas fa-heart"></i>
          <i class="tiny-icon fas fa-share-square"></i>
          <i class="tiny-icon far fa-flag"></i>
        </div>
      </footer>
    </article>
  `
};

const renderTweets = function(data) {
  for (const index of data) {
    const $tweet = createTweetElement(index)
    $('#history').prepend($tweet)
  }
};

 //loads tweets on initial load 
 const $loadTweets = () => {
  $.get('/tweets', () => {})
  .then(function (tweets) {
    renderTweets(tweets)
  })
};

$(document).ready(function() {

  $('span.error-message').hide()
  $('span.error-message').on('click', function() {
    $(this).fadeOut()
  })

  // manages the submit button for new tweets,  
  $('.form-submit').submit(function(event) {
    const $textArea = $('.tweet-text-area')
    event.preventDefault();

    

    // error handling ( this could be turned intoa function and used in char counter)
    if ($textArea.val().length === 0) {
      return $('span.error-message').fadeIn().text('It seems you have not entered anything, please try again')
      // return alert('Live every day as if it were going to be your last; for one day you’re sure to be right\n\nIt seems you have not entered anything, please try again')
    }
    if ($textArea.val().length > 140) {
      return $('span.error-message').fadeIn().text('It seems you have used too many characters')
      // return alert('Talk low, talk slow and don\'t say too much.\n\nIt seems you have used too many characters')
    }

    const textInput = $(this).serialize()

    $.post('/tweets', textInput)
      .then(function (tweets) {
        renderTweets(tweets)
      });

  // clears text area once submited and resets the counter
    $textArea.val('');
    $('#number').text(`140`);
  });
  
   $loadTweets()

});

