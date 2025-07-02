function upgrade_speed() {
    if (timeToCatch == 1000) {
        return;
    }
    timeToCatch -= 1000;

    if (timeToCatch == 1000) {
        document.getElementById('speed_info').innerHTML = (timeToCatch / 1000) + " Second";
        document.getElementById('speed_price').innerHTML = "MAX";
        return;
    }

    document.getElementById('speed_info').innerHTML = (timeToCatch / 1000) + " Seconds";
    document.getElementById('speed_price').innerHTML = "$" + 40 * (2 * ((10000 - timeToCatch)/ 1000));
}

function upgrade_fisher() {
    if (autofishers.length == 7) {
        return;
    }

    autofishers.push(createAutofisher());
    document.getElementById('fisher_info').innerHTML = autofishers.length + " Fishers";
    if (autofishers.length == 1) {document.getElementById('fisher_info').innerHTML = autofishers.length + " Fisher";}

        if (autofishers.length == 7) {
        document.getElementById('fisher_price').innerHTML = "MAX";
        return;
    }

    document.getElementById('fisher_price').innerHTML = "$" + 300 * (autofishers.length * 2);
}

function upgrade_fish() {
    if (fishMax == 10) {return;}
    fishMax++;
    
    document.getElementById('fish_info').innerHTML = fishMax + " Max Fish";

    if (fishMax == 7) {
        document.getElementById('fish_price').innerHTML = "MAX";
        return;
    }

    document.getElementById('fish_price').innerHTML = "$" + 80 * (fishMax);
    let attempts = 0;

    const padding = 50;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
        const candidate = {
            x: padding + Math.random() * (canvas.width - 2 * padding),
            y: padding + Math.random() * (canvas.height - 2 * padding),
            rippleSize: 0
        };

        const tooClose = fishSpots.some(f =>
            Math.hypot(f.x - candidate.x, f.y - candidate.y) < minDistanceBetweenFish
        );

        if (!tooClose) {
            fishSpots.push(candidate);
            break; // successfully added
        }

        attempts++;
    }
}
