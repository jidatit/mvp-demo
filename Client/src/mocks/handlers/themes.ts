import { get, set, STORAGE_KEYS } from "../storage";

const FALLBACK_THEME = {
  id: "default",
  name: "Default",
  dashboardBackground: "#14B8A6",
  cardBackground: "#FFFFFF",
  primaryText: "#000000",
  secondaryText: "#6B7280",
  sidebarAccentText: "#14B8A6",
};

function getThemes(): any[] {
  return get<any[]>(STORAGE_KEYS.THEMES, []);
}

export function getDemoThemeById(id?: string) {
  const themes = getThemes();
  if (!id) return themes[0] ?? FALLBACK_THEME;
  return themes.find((t) => t.id === id) ?? themes[0] ?? FALLBACK_THEME;
}

function resolveTheme(id?: string) {
  return getDemoThemeById(id);
}

export async function mockUpsertDashboardAssets(_data: FormData) {
  const current = get<any>(STORAGE_KEYS.DASHBOARD_ASSETS, {});
  const updated = { ...current, updatedAt: new Date().toISOString() };
  set(STORAGE_KEYS.DASHBOARD_ASSETS, updated);
  return { success: true, data: updated };
}

export async function mockGetDashboardAssets() {
  return {
    success: true,
    data: get(STORAGE_KEYS.DASHBOARD_ASSETS, {
      logoUrl: "/assets/logo.png",
      projectName: "InvestorHub",
      projectDescription: "Demo fund management platform",
    }),
  };
}

export async function mockDeleteDashboardAssets() {
  set(STORAGE_KEYS.DASHBOARD_ASSETS, {
    logoUrl: "",
    projectName: "",
    projectDescription: "",
  });
  return { success: true, message: "Assets deleted" };
}

export async function mockCreateTheme(data: any) {
  const themes = getThemes();
  const theme = {
    id: `theme-${Date.now()}`,
    userId: "fm-001",
    ...data,
    createdAt: new Date().toISOString(),
  };
  set(STORAGE_KEYS.THEMES, [...themes, theme]);
  return { success: true, data: theme };
}

export async function mockUpdateTheme(id: string, data: any) {
  const themes = getThemes();
  const updated = themes.map((t) => (t.id === id ? { ...t, ...data } : t));
  set(STORAGE_KEYS.THEMES, updated);
  return { success: true, data: updated.find((t) => t.id === id) };
}

export async function mockDeleteTheme(id: string) {
  const themes = getThemes();
  set(
    STORAGE_KEYS.THEMES,
    themes.filter((t) => t.id !== id)
  );
  return { success: true, message: "Theme deleted" };
}

export async function mockGetThemeById(id: string) {
  return { success: true, data: resolveTheme(id) };
}

export async function mockGetThemeByDomain(_subdomain: string) {
  return { success: true, data: resolveTheme() };
}

export async function mockListThemes() {
  return { success: true, data: getThemes() };
}

export async function mockApplyTheme(request: { themeId: string }) {
  set(STORAGE_KEYS.SELECTED_THEME, {
    themeId: request.themeId,
    userId: "fm-001",
  });
  return { success: true, data: resolveTheme(request.themeId) };
}

export async function mockGetSelectedTheme(request: { themeId: string }) {
  return { selectedTheme: resolveTheme(request.themeId) };
}

export async function mockClearSelectedTheme() {
  set(STORAGE_KEYS.SELECTED_THEME, { themeId: null });
  return { success: true, message: "Cleared" };
}
