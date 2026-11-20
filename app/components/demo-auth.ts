export type DemoAccount = {
  name: string;
  email: string;
};

const accountStorageKey = "stabilizers-demo-account";
const sessionStorageKey = "stabilizers-demo-session";
const sessionChangeEvent = "stabilizers-demo-session-change";

export type DemoSessionSnapshot = {
  account: DemoAccount | null;
  error: string;
};

const emptySnapshot: DemoSessionSnapshot = { account: null, error: "" };
let cachedSnapshotKey: string | null = null;
let cachedSnapshot = emptySnapshot;

export function subscribeToDemoSession(onChange: () => void) {
  window.addEventListener(sessionChangeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(sessionChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function getServerDemoSessionSnapshot() {
  return emptySnapshot;
}

export function getDemoSessionSnapshot(): DemoSessionSnapshot {
  try {
    const sessionEmail = sessionStorage.getItem(sessionStorageKey);
    const storedAccount = sessionEmail
      ? localStorage.getItem(accountStorageKey)
      : null;
    const snapshotKey = JSON.stringify([sessionEmail, storedAccount]);
    if (snapshotKey === cachedSnapshotKey) {
      return cachedSnapshot;
    }

    cachedSnapshotKey = snapshotKey;
    if (!sessionEmail) {
      cachedSnapshot = emptySnapshot;
    } else if (!storedAccount) {
      cachedSnapshot = {
        account: null,
        error: "The demo session is invalid. Please sign in again.",
      };
    } else {
      const account: unknown = JSON.parse(storedAccount);
      if (
        typeof account !== "object" ||
        account === null ||
        !("name" in account) ||
        !("email" in account) ||
        typeof account.name !== "string" ||
        typeof account.email !== "string"
      ) {
        cachedSnapshot = {
          account: null,
          error: "The saved demo account is invalid. Please create it again.",
        };
      } else if (account.email.toLowerCase() !== sessionEmail.toLowerCase()) {
        cachedSnapshot = {
          account: null,
          error: "The demo session is invalid. Please sign in again.",
        };
      } else {
        cachedSnapshot = {
          account: { name: account.name, email: account.email },
          error: "",
        };
      }
    }

    return cachedSnapshot;
  } catch {
    if (cachedSnapshotKey !== "storage-error") {
      cachedSnapshotKey = "storage-error";
      cachedSnapshot = {
        account: null,
        error: "Demo account storage is unavailable in this browser.",
      };
    }
    return cachedSnapshot;
  }
}

function notifyDemoSessionChange() {
  cachedSnapshotKey = null;
  window.dispatchEvent(new Event(sessionChangeEvent));
}

function readStoredAccount(): DemoAccount | null {
  const storedAccount = localStorage.getItem(accountStorageKey);
  if (!storedAccount) {
    return null;
  }

  const account: unknown = JSON.parse(storedAccount);
  if (
    typeof account !== "object" ||
    account === null ||
    !("name" in account) ||
    !("email" in account) ||
    typeof account.name !== "string" ||
    typeof account.email !== "string"
  ) {
    throw new Error("The saved demo account is invalid. Please create it again.");
  }

  return { name: account.name, email: account.email };
}

export function createDemoAccount(name: string, email: string): DemoAccount {
  const normalizedEmail = email.trim().toLowerCase();
  const existingAccount = readStoredAccount();

  if (existingAccount?.email.toLowerCase() === normalizedEmail) {
    throw new Error("A demo account with this email already exists. Please sign in.");
  }

  const account = { name: name.trim(), email: normalizedEmail };
  localStorage.setItem(accountStorageKey, JSON.stringify(account));
  sessionStorage.setItem(sessionStorageKey, account.email);
  notifyDemoSessionChange();
  return account;
}

export function signInDemoAccount(email: string): DemoAccount | null {
  const account = readStoredAccount();
  if (!account || account.email.toLowerCase() !== email.trim().toLowerCase()) {
    return null;
  }

  sessionStorage.setItem(sessionStorageKey, account.email);
  notifyDemoSessionChange();
  return account;
}

export function endDemoSession() {
  sessionStorage.removeItem(sessionStorageKey);
  notifyDemoSessionChange();
}
