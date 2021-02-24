/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

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
  const $tweetButton = $('#btn');
  $tweetButton.click((e) => {
    e.preventDefault();

    createTweetElement();
  });

  const renderPosts = (posts) => {
    const $main = $('main');

    for (post of posts) {
      console.log(post);
      const $tweetText = post.content.text;
      const oneDay = 24 * 60 * 60 * 1000;
      const presentDate = new Date();
      const $UtcTime = post.created_at;
      const dateCreated = new Date($UtcTime).toLocaleString();
      const dateOf = new Date(dateCreated);
      const diffDays = Math.round(Math.abs((dateOf - presentDate) / oneDay));
      const $userImg = post.user.avatars;
      const $userName = post.user.name;
      const $userHandle = post.user.handle;
      const tweetSection = `
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
          <p>${diffDays} days ago</p>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </section>
      `
      $main.append(tweetSection);
    }
  };
});




