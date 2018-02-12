$(() => {

  $("#nav-bar .toRegister").click(function(){
    $("form .login").trigger('reset');
    $("form .register").trigger('reset');
    $('form.login').css("display", "none")
    $('form.register').slideToggle();
  });


  $("#nav-bar .toLogin").click(function(){
    $('form .login').trigger('reset');
    $('form .register').trigger('reset');
    $('form.register').css("display", "none")
    $('form.login').slideToggle();
  });


  $("body").on('click', '.map-button', function (event){
    let dataValue = ($(this).attr("data-attr-id"));
    $.ajax({
      method: "GET",
      url: `/maps/${dataValue}`
    }).done((map) => {
  });
    event.preventDefault();


  });

  // Favorite submit button
  $(".map-fav").on('click', function (event){
    let userID = ($(this).attr("data-user-id"));
    console.log("i am in before ajax")
        $.ajax({
          method: "POST",
          url: `/api/users/${userID}/maps/${mapID}/fav`,
          data: {userID, mapID}
        }).done((res) => {
          console.log(res, " SUCCESS");

          });
        event.preventDefault();
  });




});

