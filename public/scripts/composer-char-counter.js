$(document).ready(function() {
  // $("form").on('submit', (event) => {
  //   event.preventDefault();
  // });
  

  //tweetForm.on..
  $(".tweet-text").on('keyup', function(event) {

    let $input = $(this);
    let $form = $input.closest('form');
    let $counter = $form.find(".counter");
    let len = $input.val().length;
    let remLength = 140 - len;
    $counter.html(remLength);
    if (remLength < 0) {
      $counter.addClass("red")
    }
    else {
      $counter.removeClass("red");
    }
  });
});
