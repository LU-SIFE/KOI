
const blurContainer = document.getElementById('blurMenu');
const loreContainer = document.getElementById('loreMenu');

const loreArray = {
  lore: [
    `<i>Forgotten Note #1:</i><br><br>
    "No one really knows who made the first hook.<br><br>
    Some say it was shaped from a fallen star.<br>
    Others believe the fish taught us.<br><br>
    Either way, once it was cast, the ripples never stopped.<br>
    Everything we have now started with that first ripple."<br><br>
    You tuck the note away, holding it in mind.`,

    `<i>Forgotten Note #2:</i><br><br>
    "They say the waters hold memories.<br><br>
    Every ripple carries a story, of a fish caught, a dream chased.<br>
    Or a quiet moment beneath the stars.<br><br>
    Sometimes, if you listen closely, you can hear whispers of those tales.<br><br>
    But they're meant for those patient enough to wait."<br><br>
    You fold the note carefully and place it back in your pocket.`,

    `<i>Forgotten Note #3:</i><br><br>
    "It's a lot more than you think it is.<br><br>
    Do you stop to think, and ponder, where you are?<br>
    Where are you?<br><br>
    Maybe you've yet to realize how deep the pond really is.<br>
    Be Careful."<br><br>
    You shudder for a moment, tossing the note into the pond and watch it dissolve.`,

    `<i>Forgotten Note #4:</i><br><br>
    "We think you've seen it.<br><br>
    Maybe you don't remember it all, but it was once beautiful.<br>
    Maybe one day, you'll see it again. Build it again.<br><br>
    Who knows?"<br><br>
    You feel confused, placing the note into your pocket.`,

    `<i>Forgotten Note #5:</i><br><br>
    "There's... something here.<br><br>
    Something more than fish. Something more than you.<br>
    Look closely. Watch for the story behind the one you tell.<br>
    Listen to the waves that crash far away, the waves which will topple you.<br>
    Do you even know what you're doing? The game you play, oblivious to the narrative?"<br><br>
    You don't know what to say. You are frustrated you don't know more.<br>
    You toss the note away, but you never forget it.`,

    `<i>Forgotten Note #6:</i><br><br>
    "Ah, how beautiful!<br>
    The stars, they shine, the magic which flows between the cosmos...<br>
    You're still so far. It hurts, knowing many do not know the truth.<br>
    But maybe you... maybe you can know.<br><br>
    Explore the depths. Examine the truth behind the creatures you catch.<br>
    Once you realize the truth hidden in each one, a new world will be revealed to you.<br><br>
    Maybe you're stuck like I once was, and this doesn't make sense.<br>
    A game? haha, yeah. The 'Compendium?' haha whatever you call it.<br>
    Just do it and you'll see."<br><br>
    You feel like you finally know something. You keep the note tucked close, reading it over and over as you fish.`
  ]
};

const special = [
  `<i>Cursemark Vanquished.</i><br><br>
  Cursed fish no longer take your money.`,

  `<i>Void Stabilized.</i><br><br>
  Void fish no longer take your money.`,
];

function showLore(index = 0, specialType) {
  let text = loreArray.lore[index] || "Lore not found.";

  blurContainer.style.display = 'flex';
  blurContainer.classList.remove('no-blur');

  toggleMenu('loreMenu', 'container');
  toggleMenu('blurMenu', 'container');

  if (specialType === 'curse') {
    text = special[0];
    save('curseState', false);
  } else if (specialType === 'void') {
    text = special[1];
    save('voidState', false);
  }

  loreContainer.innerHTML = text + `<br><br><button onclick="toggleMenu('blurMenu', 'container'); toggleMenu('loreMenu', 'container')">Close</button>`;

  // Allow reflow before showing for smoother transition
  setTimeout(() => {
    loreContainer.style.opacity = 1;
  }, 10);
}