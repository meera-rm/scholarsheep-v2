/**
 * Demo Auth Service
 *
 * Provides temporary demo accounts for testing without a backend.
 * Remove or disable this in production.
 */

const DEMO_ACCOUNTS = {
  admin: {
    id: 'demo-admin-001',
    username: 'admin',
    email: 'admin@scholarsheep.com',
    role: 'admin',
    avatar: '',
    password: 'admin123',
  },
  teacher: {
    id: 'demo-teacher-001',
    username: 'ms_ramesh',
    email: 'teacher@scholarsheep.com',
    role: 'teacher',
    avatar: '',
    password: 'teacher123',
  },
  student: {
    id: 'demo-student-001',
    username: 'alice_reader',
    email: 'student@scholarsheep.com',
    role: 'student',
    avatar: '',
    password: 'student123',
  },
  parent: {
    id: 'demo-parent-001',
    username: 'parent_chen',
    email: 'parent@scholarsheep.com',
    role: 'parent',
    avatar: '',
    password: 'parent123',
  },
};

// Fake JWT token generator (base64 encoded JSON — NOT secure, demo only)
function createDemoToken(user) {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      exp: Math.floor(Date.now() / 1000) + 86400 * 30, // 30 days
    })
  );
  return `${header}.${payload}.demo-signature`;
}

export function demoLogin(username, password) {
  const account = Object.values(DEMO_ACCOUNTS).find(
    (a) => a.username === username && a.password === password
  );

  if (!account) return null;

  const token = createDemoToken(account);
  return {
    accessToken: token,
    refreshToken: token,
    user: {
      id: account.id,
      username: account.username,
      email: account.email,
      role: account.role,
      avatar: account.avatar,
    },
  };
}

const DEMO_MODE_KEY = 'scholarsheep_demo_mode';
const DEMO_ACCOUNT_IDS = new Set(['demo-admin-001', 'demo-teacher-001', 'demo-student-001', 'demo-parent-001']);

/**
 * isDemoMode — determines if data should come from localStorage or the API.
 *
 * Returns true (use localStorage) only when:
 *   1. The current user is one of the 4 known demo accounts (always uses
 *      localStorage regardless of any toggle), OR
 *   2. The user explicitly toggled demo mode ON via setDemoMode()/toggleDemoMode()
 *
 * Everyone else — including brand-new real signups — defaults to the real
 * backend. This ensures demo accounts can never touch real production data,
 * without accidentally treating every real account as a demo account too
 * (the previous default here was `true`, which silently made registration,
 * login, and every isDemoMode()-gated feature fake/local for real users).
 */
export function isDemoMode() {
  // Demo accounts ALWAYS use localStorage — they can never hit the real API
  const token = localStorage.getItem('scholarsheep_access_token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (DEMO_ACCOUNT_IDS.has(payload.id)) return true;
    } catch { /* ignore */ }
  }

  // For real users, check the toggle (there is currently no UI that sets
  // this — setDemoMode()/toggleDemoMode() are unused — so this only ever
  // matters if something sets it programmatically in the future).
  const stored = localStorage.getItem(DEMO_MODE_KEY);
  if (stored !== null) return stored === 'true';
  return false; // default: real backend. A real account's token never
  // matches DEMO_ACCOUNT_IDS above, so this default only affects accounts
  // that aren't one of the 4 known demo logins.
}

export function isDemoAccount() {
  const token = localStorage.getItem('scholarsheep_access_token');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return DEMO_ACCOUNT_IDS.has(payload.id);
  } catch { return false; }
}

export function setDemoMode(enabled) {
  localStorage.setItem(DEMO_MODE_KEY, String(enabled));
}

export function toggleDemoMode() {
  const current = isDemoMode();
  setDemoMode(!current);
  return !current;
}

export function getDemoAccounts() {
  return Object.entries(DEMO_ACCOUNTS).map(([key, acc]) => ({
    key,
    username: acc.username,
    password: acc.password,
    role: acc.role,
    email: acc.email,
  }));
}

export default DEMO_ACCOUNTS;
