export const loadLocalStorageItem = (key: string) => {
  try {
    const serialized = window.localStorage.getItem(key);
    if (!serialized) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (err) {
    throw new Error('Failed to load from localStorage');
  }
};

export const saveLocalStorageItem = <T>(key: string, state: T) => {
  try {
    const serialized = JSON.stringify(state);
    window.localStorage.setItem(key, serialized);
  } catch (err) {
    throw new Error('Failed to save to localStorage');
  }
};

export const clearLocalStorageItem = (storageKey: string) => {
  window.localStorage.removeItem(storageKey);
};
