$(() => {
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      for(map of maps) {

        $(`<a href="/display/${map.id}">`).text(map.title).appendTo($("body .all-maps"));

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
