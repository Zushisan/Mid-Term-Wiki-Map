$(() => {
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      for(map of maps) {

        $(`<a href="/display/${map.id}" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 bottomButton">`).text(map.title).appendTo($("body .all-maps"));

      }
    });
  });

//     // $("body").on('click', '.map-button', function (event){
//     //   let dataValue = ($(this).attr("data-attr-id"));
//     //   $.ajax({
//     //     method:"GET",
//     //     url: `/maps/${dataValue}`
//     //   }).done((mapResult) => {

//     //     console.log(mapResult)

//     //   });
//     // });
// });
