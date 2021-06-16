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
  }
};

$(document).ready(function() {
  // renderTweets(data)

  // translates the time in miliseconds to human readable time
  const timeElement = $('.time')
  const time = timeElement.data('time')
  const timeAgo = timeago.format(time)

  timeElement.text(timeAgo)

  // manages submits post request to /tweets when submit is pressed 
  $('.form-submit').submit(function(event) {
    event.preventDefault();

    const formElement = $('.form-submit')
    const textInput = $(this).serialize()
    
    $.post('/tweets', textInput)
      .then(function (tweets) {
        renderTweets(tweets)
      })
  })
  
  const $loadTweets = () => {
    $.get('/tweets', () => {})
    .then(function (tweets) {
      renderTweets(tweets)
    })
  } 

  $loadTweets()
  
});

