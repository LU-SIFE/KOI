function toggleMenu(menuID, type) {
    const menu = document.getElementById(menuID);

    if (type === "container") {
        const isOpen = states.containers[`${menuID}Open`];

        // Prevent double toggle during transition
        if (states.containers.cooldowns[menuID]) return;

        // Set cooldown
        states.containers.cooldowns[menuID] = true;
        setTimeout(() => {
            states.containers.cooldowns[menuID] = false;
        }, 300);

        if (isOpen) {
            menu.classList.remove('show');
            menu.classList.add('hide');
            states.containers[`${menuID}Open`] = false;

            setTimeout(() => {
                menu.style.display = 'none';
            }, 300);
        } else {
            menu.style.display = 'flex';
            void menu.offsetWidth;
            menu.classList.remove('hide');
            menu.classList.add('show');
            states.containers[`${menuID}Open`] = true;
        }

    } else if (type === "content") {

        const mainMenu = document.getElementById("mainMenu");

        if (states.ui.wideMenus.includes(menuID)) {
            mainMenu.classList.add("wide");
        } else {
            mainMenu.classList.remove("wide");
        }

        // Find currently open content menu
        let currentlyOpen = null;
        for (const key in states.content) {
            if (states.content[key]) {
                currentlyOpen = key;
                break;
            }
        }

        // If already open, do nothing
        if (currentlyOpen === menuID) return;

        const newMenu = document.getElementById(menuID);

        // Start by hiding the current one (if any)
        if (currentlyOpen) {
            const oldMenu = document.getElementById(currentlyOpen);
            oldMenu.classList.remove('show');
            oldMenu.classList.add('hide');
            states.content[currentlyOpen] = false;

            setTimeout(() => {
                oldMenu.style.display = 'none';

                // Then show the new one
                newMenu.style.display = 'flex';
                void newMenu.offsetWidth;
                newMenu.classList.remove('hide');
                newMenu.classList.add('show');

                states.content[menuID] = true;


            }, 150); // Halfway transition pause

        } else {
            // If none open, just show the new one
            newMenu.style.display = 'flex';
            void newMenu.offsetWidth;
            newMenu.classList.remove('hide');
            newMenu.classList.add('show');
            states.content[menuID] = true;
        }

        setActiveButton(`${menuID}Btn`, `${currentlyOpen}Btn`);
    }
}

function setActiveButton(newBtnId, oldBtnId) {
  const newBtn = document.getElementById(newBtnId);
  const oldBtn = document.getElementById(oldBtnId);

  if (oldBtn) {
    oldBtn.classList.remove('active');
  }

  if (newBtn) {
    newBtn.classList.add('active');
  }
}
