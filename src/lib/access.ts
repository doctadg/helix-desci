// Mock access gate. Not real auth — just a code check that toggles a
// localStorage flag. Change ACCESS_CODE to set the unlock string.
export const ACCESS_CODE = "HELIX-2026";

const STORAGE_KEY = "helix.access.granted";

export function isUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlock() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function lock() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function checkCode(input: string): boolean {
  return input.trim().toUpperCase() === ACCESS_CODE.toUpperCase();
}

export const ACCESS_EVENT = "helix:open-access";

export function openAccessModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ACCESS_EVENT));
}
