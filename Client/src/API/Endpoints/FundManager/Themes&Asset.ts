// Updated services/api.ts
import {
  mockUpsertDashboardAssets,
  mockGetDashboardAssets,
  mockDeleteDashboardAssets,
  mockCreateTheme,
  mockUpdateTheme,
  mockDeleteTheme,
  mockGetThemeById,
  mockGetThemeByDomain,
  mockListThemes,
  mockApplyTheme,
  mockGetSelectedTheme,
  mockClearSelectedTheme,
} from "../../../mocks/handlers/themes";

// Types (make sure these match your updated types)
export interface DashboardAsset {
  id?: string;
  userId?: string;
  logoUrl?: string;
  projectName: string;
  projectDescription: string;
  createdAt?: string;
}

export interface Theme {
  id?: string;
  userId?: string;
  name?: string;
  dashboardBackground: string;
  cardBackground: string;
  primaryText: string;
  secondaryText: string;
  sidebarAccentText: string;
  createdAt?: string;
}

export interface CreateThemeData {
  name?: string;
  dashboardBackground: string;
  cardBackground: string;
  primaryText: string;
  secondaryText: string;
  sidebarAccentText: string;
}

export interface ApplyThemeRequest {
  themeId: string;
}

interface FetchSelectedThemeRequest {
  themeId: string;
}

interface ThemeApiResponse {
  success: boolean;
  message?: string;
  data?: Theme;
  error?: string;
}

// interface SelectedThemeResponse {
//   success: boolean;
//   data?: Theme;
//   error?: string;
// }

// Dashboard Assets API
export const dashboardAssetsApi = {
  upsert: async (data: FormData) => mockUpsertDashboardAssets(data),

  get: async (): Promise<{ success: boolean; data: DashboardAsset }> =>
    mockGetDashboardAssets(),

  delete: async (): Promise<{ success: boolean; message: string }> =>
    mockDeleteDashboardAssets(),
};

// Themes API
export const themesApi = {
  create: async (
    data: CreateThemeData
  ): Promise<{ success: boolean; data: Theme }> => mockCreateTheme(data),

  update: async (
    id: string,
    data: CreateThemeData
  ): Promise<{ success: boolean; data: Theme }> => mockUpdateTheme(id, data),

  delete: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => mockDeleteTheme(id),

  getById: async (id: string): Promise<{ success: boolean; data: Theme }> =>
    mockGetThemeById(id),

  getByDomain: async (
    subdomain: string
  ): Promise<{ success: boolean; data: Theme }> =>
    mockGetThemeByDomain(subdomain),

  list: async (): Promise<{ success: boolean; data: Theme[] }> =>
    mockListThemes(),

  applySelectedTheme: async (
    request: ApplyThemeRequest
  ): Promise<ThemeApiResponse> => mockApplyTheme(request),

  getSelectedTheme: async (
    request: FetchSelectedThemeRequest
  ): Promise<Theme> => {
    const response = await mockGetSelectedTheme(request);
    return response.selectedTheme;
  },

  clearSelectedTheme: async (): Promise<ThemeApiResponse> =>
    mockClearSelectedTheme(),
};
