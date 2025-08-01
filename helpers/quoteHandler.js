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

let lastQuoteIndex = -1;

function quote_cycle() {
  const quoteElement = document.getElementById("quotes");

  if (!states.settings.quotes) {
    quoteElement.style.display = "none";
    return;
  }

  quoteElement.style.display = "block";
  quoteElement.classList.add("hide");

  setTimeout(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quote_array.length);
    } while (newIndex === lastQuoteIndex && quote_array.length > 1);

    lastQuoteIndex = newIndex;

    const quote = quote_array[newIndex];
    quoteElement.innerHTML = quote[1]
      ? `"${quote[0]}" — <i>${quote[1]}</i>`
      : quote[0];

    quoteElement.classList.remove("hide");
  }, 600);
}

// Optional: call this whenever the setting is changed to update visibility
function update_quote_visibility() {
  const quoteElement = document.getElementById("quotes");
  quoteElement.style.display = states.settings.quotes ? "block" : "none";
}