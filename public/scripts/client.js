/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(data) {
  const userKey = data.user
  return `
    <article class='tweets-container'>
      <header>
        <div>
          <image src='${userKey.avatars}' class="color-red"></image>
          ${userKey.name}
        </div>
        <div>${userKey.handle}</div>
      </header>
      <p>${data.content.text}</p>
      <footer>
        <p class='time' data-time='${data.created_at}'></p>
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
    $('.main-tweet').append($tweet)

    // translates the time in miliseconds to human readable time
    const timeElement = $('.time')
    const time = timeElement.data('time')
    const timeAgo = timeago.format(time)
    timeElement.text(timeAgo)
  }
};

$(document).ready(function() {
  // manages submits post request to /tweets when submit is pressed 
  $('.form-submit').submit(function(event) {
    const $textArea = $('.tweet-text-area')
    event.preventDefault();
    console.log($textArea.val().length)

    // error handling
    if ($textArea.val().length === 0) {
      return alert('Live every day as if it were going to be your last; for one day you’re sure to be right\n\nIt seems you have not entered anything, please try again')
    }
    if ($textArea.val().length > 140) {
      return alert('Talk low, talk slow and don\'t say too much.\n\nIt seems you have used too many characters')
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
  
  const $loadTweets = () => {
    $.get('/tweets', () => {})
    .then(function (tweets) {
      renderTweets(tweets)
    })
  };

  $loadTweets()

});

