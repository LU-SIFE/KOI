function save(varName, value) {
  try {
    localStorage.setItem(varName, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save "${varName}" to localStorage:`, e);
  }
}

function load(varName, fallback = null) {
  try {
    const value = localStorage.getItem(varName);
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    console.error(`Failed to load "${varName}" from localStorage:`, e);
    return fallback;
  }
}
