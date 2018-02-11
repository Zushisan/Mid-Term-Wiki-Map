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

});

