console.log("hello");

var searchHistoryContainer = document.getElementById("searchHistoryContainer");
var searchHistory = [""];
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");


searchButton.addEventListener('click', function (event) {
        console.log(searchInput.value);
});