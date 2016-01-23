// http://stackoverflow.com/questions/26081820/regular-expression-to-extract-whole-sentences-with-matching-word
var regex = /[^.?!]*(president|congress|america|american|campaign|campaigns|government|political|presidential|election|mayor|candidate|candidates|republican|democrat|democratic|forerunner)(?=[\s.?!])[^.?!]*[.?!]/igm;

$(document).ready(function() {
	console.log("Body loaded.");
	var search = regex.exec(document.body.innerText);
	if (search) {
		var m;
		var quotes = [
			"You know, it really doesn't matter what the media write as long as you've got a young and beautiful piece of ass.",
			"The concept of global warming was created by and for the Chinese in order to make U.S. manufacturing non-competitive.",
			"Listen you motherfucker, we're going to tax you 25 percent!",
			"When was the last time anybody saw us beating, let's say, China in a trade deal? They kill us. I beat China all the time. All the time.",
			"The U.S. will invite El Chapo, the Mexican drug lord who just escaped prison, to become a U.S. citizen because our \"leaders\" can't say no!",
			"I will build a great wall — and nobody builds walls better than me, believe me —and I'll build them very inexpensively.",
			"I will build a great, great wall on our southern border, and I will make Mexico pay for that wall. Mark my words.",
			"The wall will go up and Mexico will start behaving.",
			"Our great African American President hasn't exactly had a positive impact on the thugs who are so happily and openly destroying Baltimore!",
			"Laziness is a trait in the blacks. ... Black guys counting my money! I hate it.",
			"The only kind of people I want counting my money are little short guys that wear yamakas every day.",
			"If you can’t get rich dealing with politicians, there’s something wrong with you.",
			"A certificate of live birth is not the same thing by any stretch of the imagination as a birth certificate.",
			"Free trade is terrible. Free trade can be wonderful if you have smart people. But we have stupid people.",
			"One of the key problems today is that politics is such a disgrace. Good people don’t go into government."
		];
		var c = 0;
		do {
			m = regex.exec(document.body.innerText);
			if (m) {
				var quote = quotes[~~(Math.random()*quotes.length)];
				// https://github.com/padolsey/findAndReplaceDOMText
				findAndReplaceDOMText(document.body, {
					find: m[0],
					replace: quote
				});
				// console.log("Replaced: " + m[0]);
				c += 1;
			}
		} while (m);
		if (c > 0) {
			chrome.runtime.sendMessage({method: "saveStats", trumps: c}, function(response) {});
		}
	}
});