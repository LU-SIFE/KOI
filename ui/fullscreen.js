function toggleFullscreen() {
  const docEl = document.documentElement;

  if (!document.fullscreenElement) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen(); // Safari
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen(); // IE11
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Safari
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // IE11
    }
  }
}
