$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;


// $(() => {
//   console.log("I am starting")
//   $.ajax({
//     method: "POST",
//     url: "/user"
//   }).done((users) => {
//     console.log("I am done")
//   });;
// });


$(".toronto").on('click', function (event) {

  console.log("Here");

event.preventDefault();

  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for(map of maps) {
      $("<button>").text(map.title).appendTo($("body"));
    }
  });;


});

});
