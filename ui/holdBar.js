const holdBarContainer = document.getElementById("holdBarContainer");
const holdBar = document.getElementById("holdBar");

function updateHoldBar() {
  if (isHolding) {
    holdBarContainer.style.display = "block";
    const percent = Math.min((holdTime / timeToCatch) * 100, 100);
    holdBar.style.width = `${percent}%`;
  } else {
    holdBarContainer.style.display = "none";
    holdBar.style.width = `0%`;
  }
}