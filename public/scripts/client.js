/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("form").on('submit', function (event) {
    
    event.preventDefault();
    const $textInput = $(this).serialize().slice(5);
    console.log($textInput);
    
    if ($textInput.length <= 140 && $textInput.length !== 0) {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      });
      return;
    }
    else if ($textInput.length > 140) {
      $("main").prepend("<h4> Tweet Length is invalid!</h4>");
    } 
  });
  
  
  

  function createTweetElement() {
  
    console.log("Doc ready");
    $.ajax({
      url: 'http://localhost:8080/tweets/',
      method: 'GET',
      dataType: 'json',
      success: (posts) => {
        renderPosts(posts);
      }
    });
  };

  const renderPosts = (posts) => {
    const $main = $('main');

    for (post of posts) {
      const tweetSection = tweetHTML(post);
      $main.append(tweetSection);
    }
  };
  function timeDiff(time) {
    const oneDay = 24 * 60 * 60 * 1000;
    const presentDate = new Date();
    const dateCreated = new Date(time).toLocaleString();
    const dateOf = new Date(dateCreated);
    const result = Math.round(Math.abs((dateOf - presentDate) / oneDay));
    if(result === 0) {
      return `Today`;
    }
    else if (result ===1) {
      return `Yesterday`;
    }
    else {
      return `${result} days ago`;
    }

  }
  function tweetHTML(post) {

    console.log(post);
    const $tweetText = post.content.text;
    const $UtcTime = post.created_at;
    const diffDays = timeDiff($UtcTime);
    const $userImg = post.user.avatars;
    const $userName = post.user.name;
    const $userHandle = post.user.handle;
    return `
    <section class="past-tweet">
      <div class="profile">
        <div class="profile-info">
          <img src="${$userImg}" class="tweet-img">
          <span class="user-name">${$userName}</span>
        </div>
        <div class="userID">
          ${$userHandle}
        </div>
      </div>
      <div class="tweet-txt">
        ${$tweetText}
      </div>
      <div class="tweet-engagement">
        <p>${diffDays}</p>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </section>
    `;
  }
  createTweetElement();

  // const $tweetButton = $('#btn');
  // $tweetButton.click((e) => {
  //   e.preventDefault();

  //   createTweetElement();
  // });
});




