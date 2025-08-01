function updateHoldBar() {
	if (entities.player.holding) {
		holdBarContainer.style.display = "block";
		const percent = Math.min((entities.player.holdTime / entities.player.timeToCatch) * 100, 100);
		holdBar.style.width = `${percent}%`;
	} else {
		holdBarContainer.style.display = "none";
		holdBar.style.width = `0%`;
	}
}