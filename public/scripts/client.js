/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// clean this up later 
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
  renderTweets(data)

  // translates the time in miliseconds to human readable time
  const timeElement = $('.time')
  const time = timeElement.data('time')
  const timeAgo = timeago.format(time)
  timeElement.text(timeAgo)

  $('.form-submit').submit((event) => {
    alert('handler for submit')
    event.preventDefault();
  })
});

