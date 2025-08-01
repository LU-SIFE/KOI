function getArticle(word) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return vowels.includes(word[0].toLowerCase()) ? 'an' : 'a';
}

function fishAlert(item) {
    if (states.settings.alerts) {
        const alertDiv = document.getElementById('fishAlert');
        const rgb = rarityInfo[item.rarity].color;

        // Set border color
        alertDiv.style.borderColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
        alertDiv.style.color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;


        const imgPath = item.name.toLowerCase().replace(/\s/g, '');

        alertDiv.innerHTML = `<img src='../assets/fishAssets/${imgPath}.png' style="filter: brightness(1.2) drop-shadow(0 0 6px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5));" onerror="this.onerror=null; this.src='../assets/fishAssets/hidden.png'"><div>You caught ${getArticle(item.rarity)} ${item.rarity} ${item.name}!</div>`;

        // Reset animation
        alertDiv.classList.remove('show', 'hide');
        void alertDiv.offsetWidth; // Force reflow (restarts the animation)

        // Show it
        alertDiv.classList.add('show');

        // Clear previous timeout if any
        if (states.extras.alertTimeout) clearTimeout(states.extras.alertTimeout);

        // Hide it after 1.5s
        states.extras.alertTimeout = setTimeout(() => {
            alertDiv.classList.remove('show');
            alertDiv.classList.add('hide');
        }, 1500);
    }
}

function fishInspect(item, msg) {
    item = getFishData(item.name);
    const inspectDiv = document.getElementById('fishInspect');
    const rarity = rarityInfo[item.rarity] || rarityInfo.Common;
    const rgb = rarity.color;
    const quote = rarity.quote || "";

    const imgPath = item.name.toLowerCase().replace(/\s/g, '');

    // Set border and text color
    inspectDiv.style.borderColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    inspectDiv.style.color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;

    inspectDiv.innerHTML = `
        <img src='../assets/fishAssets/${imgPath}.png' onerror="this.onerror=null; this.src='../assets/fishAssets/hidden.png'" style="object-fit: contain; filter: brightness(1.2) drop-shadow(0 0 6px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1));">
        <div><span>${item.name}: [${item.rarity}]</span><span>${quote}<span></div>
    `;

    if (msg) {
        inspectDiv.innerHTML = `
        <img src='../assets/fishAssets/hidden.png' style="object-fit: contain; filter: brightness(1.2) drop-shadow(0 0 6px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1));">
        <div><span>??? [${item.rarity}]</span><span>${msg}<span></div>
    `;

    }
    
    if (item.name === 'Chest') {
        inspectDiv.innerHTML = `
        <img src='../assets/fishAssets/chest.png' style="object-fit: contain; filter: brightness(1.2) drop-shadow(0 0 6px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1));">
        <div><span>You got $${msg}!<span></div>
    `;

    }

    // Reset animation
    inspectDiv.classList.remove('show', 'hide');
    void inspectDiv.offsetWidth; // Force reflow (restarts the animation)

    // Show it
    inspectDiv.classList.add('show');

    // Clear previous timeout if any
    if (states.extras.inspectTimeout) clearTimeout(states.extras.inspectTimeout);

    // Hide it after 1.5s
    states.extras.inspectTimeout = setTimeout(() => {
        inspectDiv.classList.remove('show');
        inspectDiv.classList.add('hide');
    }, 3000);
}
