let quote_state = true;

function quoteToggle() {
    if (quote_state) {
        quote_state = false;
        document.getElementById("quotes").style.display = "none";
        clearInterval(quoteInterval);
    } else {
        quote_state = true;
        document.getElementById("quotes").style.display = "block";
        quoteInterval = setInterval(quote_cycle, 15000);
    }
}