function sliderToggle(el, type) {
    el.classList.toggle('on');
    el.classList.toggle('off');

    if (type == 'fullscreen') {
        toggleFullscreen();
    }

    if (type == 'quotes') {
        states.settings.quotes = !states.settings.quotes;
        update_quote_visibility();
        return;
    }

    if (type == 'alerts') {
        states.settings.alerts = !states.settings.alerts;
        return;
    }

    if (type == 'ambience') {
        SoundManager.muteAmbienceToggle();
    }

    if (type == 'sfx') {
        SoundManager.muteSfxToggle();
    }
}
