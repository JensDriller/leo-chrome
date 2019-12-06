// LEO dictionary URL host
var BASE_URL = "http://dict.leo.org";

// Human readable languages
var DICTS = {
	"englisch-deutsch" : "English",
	"französisch-deutsch" : "French",
	"spanisch-deutsch" : "Spanish",
	"italienisch-deutsch" : "Italian",
	"chinesisch-deutsch" : "Chinese",
	"russisch-deutsch" : "Russian",
	"portugiesisch-deutsch" : "Portuguese",
	"polnisch-deutsch" : "Polish"
};

// User's current selection from options page
var currentDict;

(function init() {
	// Set default dict to German-English
	if(currentDict === undefined) {
		setDefaultSuggestion("englisch-deutsch");
	}
})();

// Listen for address bar input
chrome.omnibox.onInputEntered.addListener(function(text) {
	// No text, no translation...
	if (!text) {
		return;
	}

	// Kick off a new search
	search(text);
});

function search(text) {
	// Encode any URI components
	text = encodeURIComponent(text);

	// Build URL
	var url = BASE_URL + "/" + currentDict + "/" + text;

	// Let's go!
	navigateToUrl(url);
}

function navigateToUrl(url) {
	// Navigate to URL on current tab
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.update(tab.id, {
			url: url
		});
	});
}

function setDefaultSuggestion(dict) {
	// Update current dict
	currentDict = dict;

	// Update preview text in address bar dropdown
	chrome.omnibox.setDefaultSuggestion({
		description: "LEO Translate German-" + DICTS[dict] + ": <match>%s</match>"
	});
}
