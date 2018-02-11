$(() => {

  $(".toronto").on('click', function (event) {
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      for(map of maps) {
        $(`<button class="map-button" data-attr-id="${map.id}">`).text(map.title).appendTo($("body"));
      }
    });
    event.preventDefault();
  });

  $("body").on('click', '.map-button', function (event){
    let dataValue = ($(this).attr("data-attr-id"));
    $.ajax({
      method: "GET",
      url: `/maps/${dataValue}`
    }).done((map) => {
      console.log(map[0].title);
    });
    event.preventDefault();
  });

});

