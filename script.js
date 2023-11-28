console.log("hello");

//Housekeeping
var searchHistoryContainer = document.getElementById("searchHistoryContainer");
var searchHistory = [""];
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var maxHistorySize = 15;

//added function to append the array values to the page as buttons
function updateSearchHistory() {
    searchHistoryContainer.innerHTML = "";
    searchHistory.slice(-maxHistorySize).forEach(function (entry) {
        var entryButton = document.createElement("button");
        entryButton.textContent = entry;
        entryButton.className = "btn btn-secondary m-1";
        searchHistoryContainer.appendChild(entryButton);
    });
}
//added event listener to search button
//added functionality to event listner to log user input to an array
//updated the function to be used inline with the updateSearchHistory function. With the new maxHistory var, search history is capped at 6 so things dont get out of control. I may change this number later depending on how it looks with all of the styling completed. 
searchButton.addEventListener('click', function (event) {
    var inputValue = searchInput.value.trim();

    if (inputValue !== "") {
        searchHistory.push(inputValue);

        if (searchHistory.length > maxHistorySize) {
            searchHistory.shift();
        }

        updateSearchHistory();
        console.log("Search history:", searchHistory);
    }
});