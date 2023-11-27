console.log("hello");

//Housekeeping
var searchHistoryContainer = document.getElementById("searchHistoryContainer");
var searchHistory = [""];
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");

//added event listener to search button
//added functionality to event listner to log user input to an array
searchButton.addEventListener('click', function (event) {
    var inputValue = searchInput.value.trim();
    if (inputValue !== "") {
        searchHistory.push(inputValue);
        console.log("Search history:", searchHistory);
            
        }
});