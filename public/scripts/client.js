/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $(".new-tweet").hide();

  $("#tweet-compose").click(function() {
    $(".new-tweet").slideToggle("slow");
    $('#tweet-text').focus();

  });

  function resetCounter() {
    let $input = $(".tweet-text");
    let $form = $input.closest('form');
    let $counter = $form.find(".counter");
    $counter.html(140);
  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  $("form").on('submit', function (event) {

    

    
    
    event.preventDefault();

    const $textInput = $('#tweet-text').val();
    if ($textInput.length <= 140 && $textInput.length !== 0) {

      $('h4').addClass('hide-it');

      const $textInput2 = $(this).serialize();


      const safeHTML = `<p>${escape($textInput2)}</p>`;




      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $textInput2,
        success: (data) => {
          $('#tweet-text').val("").focus();
          createTweetElement();
          resetCounter();
        }
      });
    }
    else {
      $('h4').removeClass('hide-it');
    }
  });

  
  
  
 

  function createTweetElement() {
  
    $.ajax({
      url: 'http://localhost:8080/tweets/',
      method: 'GET',
      dataType: 'json',
      success: (posts) => {
        $('#tweet-container').empty();
        for (let post of posts) {
          renderPosts(post);
        }
        
      }
    });
  };

  const renderPosts = (post) => {
    const $tweetContainer = $('#tweet-container');

    const tweetSection = tweetHTML(post);
    $tweetContainer.prepend(tweetSection);
    
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

    const $tweetText = post.content.text;
    const $UtcTime = post.created_at;
    const diffDays = timeDiff($UtcTime);
    const $userImg = post.user.avatars;
    const $userName = post.user.name;
    const $userHandle = post.user.handle;
    return `
    <article class="past-tweet">
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
        ${escape($tweetText)}
      </div>
      <div class="tweet-engagement">
        <p>${diffDays}</p>
        <div class="tweet-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </article>
    `;
  }
  createTweetElement();

  // const $tweetButton = $('#btn');
  // $tweetButton.click((e) => {
  //   e.preventDefault();

  //   createTweetElement();
  // });
});




