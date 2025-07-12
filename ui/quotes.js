const quote_array = [
    ["It's never too late to find yourself."],
    ["Keep them close. You need each other."],
    ["We know. It's broken. I... Apologize. The world is hard to change."],
    ["If you're wondering, fishing doesn't hurt them. The fish are sold as pets!"],
    ["It's worth it. Trust me, it's worth a lot more than you think it is."],
    ["The fish are happy to see you!~"],
    ["Where did you get that awesome personality?"],
    ["I hope you find what you are looking for."],
    ["You're kindness means a lot to us. Don't be afraid to show it!"],
    ["This won't be the last time. But either way, it's okay."],
    ["Awareness of one's own actions is afforded to few, but we're glad they're nice."],
    ["We're glad you're okay!"],
    ["Thanks for sticking with us!"],
    ["Really, the fish do swim! So can you!"],
    ["You've made it this far. That matters more than you know."],
    ["Even the smallest ripples reach the shore eventually."],
    ["Some treasures can't be caught, only noticed and loved."],
    ["Rest is part of the journey. The fish take naps too!"],
    ["Even if the tide pulls you under, you will surface again."],
];

function quote_cycle() {
    const quoteElement = document.getElementById("quotes");

    // Start fade out
    quoteElement.classList.add("hide");

    // After fade out duration (600ms), swap text and fade in
    setTimeout(() => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quote_array.length);
        } while (newIndex === lastQuoteIndex && quote_array.length > 1);

        lastQuoteIndex = newIndex;

        // Set new quote text
        if (!quote_array[newIndex][1]) {
            quoteElement.innerHTML = quote_array[newIndex][0];
        } else {
            quoteElement.innerHTML = '"' + quote_array[newIndex][0] + '" — <i>' + quote_array[newIndex][1] + "</i>";
        }

        // Fade in
        quoteElement.classList.remove("hide");
    }, 600);
}

function toggle_quotes() {
    if (quote_vis === true) {
        quote_vis = false;
        document.getElementById("quotes").style.display = "none";
    } else {
        quote_vis = true;
        document.getElementById("quotes").style.display = "block";
    }
}