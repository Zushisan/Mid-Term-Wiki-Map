

$(() => {



     let userID = $('body').attr('data-id-user');

    $.ajax({
      method: "GET",
      url: `/api/users/${userID}/maps/fav`
    }).done((maps) => {
      for(map of maps) {
        $(`<a href="/display/${map.id}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bottomButton">`).text(decodeURIComponent(map.title)).appendTo($("body .toSeeFav"));
    }
  });

        $.ajax({
      method: "GET",
      url: `/api/users/${userID}/maps/con`
    }).done((maps) => {
      for(map of maps) {
        $(`<a href="/display/${map.id}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bottomButton">`).text(decodeURIComponent(map.title)).appendTo($("body .toSeeCon"));
    }
  });
});
