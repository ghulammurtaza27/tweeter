$(document).ready(function() {
  //hides tweet form as a default on page load
  $(".new-tweet").hide();



  // gets data and renders as tweets on page
  createTweetElement();


  // allows nav button to control sliding of tweet form
  $("#tweet-compose").click(tweetSlider);



  //post request for tweet submission
  $("form").on('submit', postRequest);

  
  
  
  
  
  
  
  
  
  
  function tweetSlider() {
    $(".new-tweet").slideToggle("slow");
    $('#tweet-text').focus();
  }
  
  function postRequest(event) {
    

    event.preventDefault();



    const $textInput = $('#tweet-text').val();

    //ensure tweet length is valid before sending post request
    if ($textInput.length <= 140 && $textInput.length !== 0) {

      $('h4').addClass('hide-it');

      const $textInput2 = $(this).serialize();

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
  }

  function resetCounter() {
    // function reset counter after tweet submission used in post request
    let $input = $(".tweet-text");
    let $form = $input.closest('form');
    let $counter = $form.find(".counter");
    $counter.html(140);
  }
  
  function escape (str) {
    // function to save site from cross site scripting
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  

  function createTweetElement() {
    //generates get request and calls render post function on success
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

  function renderPosts(post) {
    //adds tweet to the page with correct html and tweet info
    const $tweetContainer = $('#tweet-container');

    const tweetSection = tweetHTML(post);
    $tweetContainer.prepend(tweetSection);
    
  };
  function timeDiff(time) {

    //used to calculate tweet age
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
    //adds relevant information to each tweet html

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
});




