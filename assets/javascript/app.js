 
var sports = ['hockey', 'football', 'field hockey', 'baseball', 'kick ball', 'cricket']

function displaySportInfo() {


  var sports = $(this).attr("data-name");
  var URL = "http://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
  url: URL,
  method: "GET"
  }).done(function(response) {
    
    var results = response.data;

    // console.log("results");
    // console.log(results);

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

       
      // Saving the image_original_url property
      var sportDiv = $("<div>");

      // var p = $("<p>").text("Rating: " + response[i].rating);

        // Creating and storing an image tag
        var sportImage = $("<img>");

        sportImage.attr("src", results[i].images.fixed_height_small_still.url);
        sportImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        sportImage.attr("data-animate", results[i].images.fixed_height_still.url);
        sportImage.attr("data-state", "still");
        sportImage.attr("class", "gif");

        sportDiv.append(sportImage);

        $("#images").prepend(sportDiv);
  
      }
      });
        
}

function renderButtons(){

         $("#buttons-view").empty();
        // Loops through the array of movies
        for (var i = 0; i < sports.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("sport");
          // Added a data-attribute
          a.attr("data-name", sports[i]);
          // Provided the initial button text
          a.text(sports[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }

}
$("#add-sport").on("click", function(event) {
    event.preventDefault();
        // This line of code will grab the input from the textbox
    var sport = $("#sport-input").val().trim();

        // The movie from the textbox is then added to our array
    sports.push(sport);

        // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});
      // Function for displaying artist data
      // displaySportInfo();

$(document).on("click", ".sport", displaySportInfo);

renderButtons();

$(".gif").on("click", function() {

  console.log("in function");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
  if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
  } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
});