/*
 * Jeter Filter - Content Script
 * 
 * This is the primary JS file that manages the detection and filtration of Number Two from the web page.
 */

// Variables
var regex = /Jeter/;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering Number Two with Vindictive filter...");
	return $(":contains('Jeter'):not('body'):not('html'):not('div')");
}

function filterDefault () {
	console.log("Filtering Number Two with Default filter...");
	return $(":contains('Jeter'):not('body'):not('html'):not('div')").closest('div');
}

function filterVindictive() {
	console.log("Filtering Number Two with Vindictive filter...");
	return $(":contains('Jeter'):only-child:last-child:not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("Number Two found on page! - Searching for elements...");
   chrome.extension.sendRequest({method: "loadFilter"}, function(response) {
	   console.log("Filter setting stored is: " + response.filter);
	   elements = getElements(response.filter);
	   filterElements(elements);
	 });
  chrome.extension.sendRequest({}, function(response) {});
}