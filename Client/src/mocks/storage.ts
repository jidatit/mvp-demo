export const STORAGE_KEYS = {
  SEEDED: "demo:seeded",
  FUNDS: "demo:funds",
  FUND_DETAILS: "demo:fundDetails",
  CAPITAL_CALLS: "demo:capitalCalls",
  DISTRIBUTIONS: "demo:distributions",
  FUND_REPORTS: "demo:fundReports",
  NOTIFICATIONS: "demo:notifications",
  TAX_REPORTS: "demo:taxReports",
  KYC_DOCUMENTS: "demo:kycDocuments",
  MANAGER_INVESTORS: "demo:managerInvestors",
  ONBOARDING: "demo:onboarding",
  THEMES: "demo:themes",
  DASHBOARD_ASSETS: "demo:dashboardAssets",
  ADMIN_FUND_MANAGERS: "demo:adminFundManagers",
  ADMIN_INVESTORS: "demo:adminInvestors",
  SELECTED_THEME: "demo:selectedTheme",
  FUND_INVESTORS: "demo:fundInvestors",
} as const;

export function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function set<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function merge<T extends Record<string, unknown>>(
  key: string,
  partial: Partial<T>
): T {
  const current = get<T>(key, {} as T);
  const next = { ...current, ...partial };
  set(key, next);
  return next;
}

export function resetDemoStorage(): void {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}

export function clearAllDemoKeys(): void {
  Object.keys(localStorage)
    .filter((key) => key.startsWith("demo:") || key.startsWith("theme_"))
    .forEach((key) => localStorage.removeItem(key));
}
