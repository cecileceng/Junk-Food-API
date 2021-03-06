//VARIABLES
var junkFoods = ['popcorn', 'nachos', 'gummibears', 'chips', 'pocky', 'trailmix', 'cookies'] //initial array of junk foods
var publicBetaKey = 'dc6zaTOxFJmzC';

//FUNCTIONS
function displayJunkFoodInfo(){ // displayJunkFoodInfo function now re-renders the HTML to display the appropriate content. 

	var junk = $(this).attr('data');

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + junk + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response) { // Creates AJAX call for the specific junk food gif being served up
		console.log("Response: " + response)

		var searchResults = response.data;
		console.log(searchResults)

		var junkFoodDiv = $('<div class="junk-food">'); // Creates a generic div to hold the junk food

		for (var i = 0; i < searchResults.length; i++) {

			var rating = searchResults[i].rating; // Retrieves the Rating Data
			console.log(rating)

			var displayRating = $('<p>').text( "Rating: " + rating); // Creates an element to have the rating displayed
			
			junkFoodDiv.append(displayRating); // Displays the rating

			var image = $('<img>').attr("src", searchResults[i].images.fixed_height_still.url); // Creates an element to hold the image 

			junkFoodDiv.append(image); // Appends the image

			$('#junk-food-view').prepend(junkFoodDiv); // Puts the entire junk food set above the previous sets
		}
	});

}

$('#addJunkFood').on('click', function(){ // This function handles events when a button is clicked

	var junkFood = $('#junk-food-input').val().trim(); // This line of code will grab the input from the textbox

	junkFoods.push(junkFood); // The junk food from the textbox is then added to our array

	$('#junk-food-input').val(""); //clears the textbox out

	moreJunk(); // Our array then runs which handles the processing of our junk foods array

	return false; // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
});

function moreJunk(){ 	// Generic function for displaying junk food images 

	$('#junkFoodButtons').empty(); // Deletes previous items so as not to have repeat buttons

	for (var i = 0; i < junkFoods.length; i++){ // Loops through the array of junk foods

		// Then dynamicaly generates buttons for each item in the array

	    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	    a.addClass('junk-food btn btn-warning'); // Added a class 
	    a.attr('data', junkFoods[i]); // Added a data-attribute
	    a.text(junkFoods[i]); // Provided the initial button text
	    $('#junkFoodButtons').append(a); // Added the button to the HTML
	}
}

//PROGRAM
$(document).on('click', '.junk-food', displayJunkFoodInfo); // Generic function for displaying the junkFoodInfo
moreJunk(); 	// This calls the moreJunk() function

