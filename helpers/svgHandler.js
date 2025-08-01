function inlineSVG(imgEl) {
  fetch(imgEl.src)
    .then(res => res.text())
    .then(svgText => {
      const parser = new DOMParser();
      const svg = parser.parseFromString(svgText, "image/svg+xml").documentElement;
      svg.setAttribute("class", imgEl.className); // Optional!
      svg.setAttribute("fill", "currentColor");
      imgEl.replaceWith(svg);
    });
}