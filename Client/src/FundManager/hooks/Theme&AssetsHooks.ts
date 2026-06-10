// hooks/useApi.ts - Fixed Custom hooks for API calls
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dashboardAssetsApi,
  themesApi,
  type CreateThemeData,
} from "../../API/Endpoints/FundManager/Themes&Asset";
import { getDemoThemeById } from "../../mocks/handlers/themes";
import { get, STORAGE_KEYS } from "../../mocks/storage";

// Dashboard Assets Hooks
export const dashboardAssetsQueryKey = ["dashboardAssets"];

export const useDashboardAssets = () => {
  return useQuery({
    queryKey: dashboardAssetsQueryKey,
    queryFn: dashboardAssetsApi.get,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useUpsertDashboardAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardAssetsApi.upsert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardAssets"] });
    },
    onError: (error) => {
      console.error("Error upserting dashboard asset:", error);
    },
  });
};

export const useDeleteDashboardAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardAssetsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardAssets"] });
    },
    onError: (error) => {
      console.error("Error deleting dashboard asset:", error);
    },
  });
};

// Theme Hooks - FIXED: Added enabled parameter support
export const useThemes = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["themes"],
    queryFn: () => themesApi.list(),
    initialData: () => ({
      success: true,
      data: get(STORAGE_KEYS.THEMES, []),
    }),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: options?.enabled !== false,
  });
};

export const useCreateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: themesApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      return data;
    },
    onError: (error) => {
      console.error("Error creating theme:", error);
    },
  });
};

export const useUpdateTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateThemeData }) =>
      themesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
    },
    onError: (error) => {
      console.error("Error updating theme:", error);
    },
  });
};

export const useDeleteTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: themesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
    },
    onError: (error) => {
      console.error("Error deleting theme:", error);
    },
  });
};

export const useThemeById = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["theme", id],
    queryFn: () => themesApi.getById(id),
    initialData: () => ({
      success: true,
      data: getDemoThemeById(id),
    }),
    enabled: enabled && !!id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useThemeByDomain = (domain: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["theme", domain],
    queryFn: () => themesApi.getByDomain(domain),
    enabled: enabled && !!domain,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

export const useApplyTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: themesApi.applySelectedTheme,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["selectedTheme"] });

      if (data.success && data.data?.id) {
        queryClient.setQueryData(["selectedTheme"], {
          success: true,
          data: { selectedThemeId: data.data.id },
        });
      }
    },
    onError: (error) => {
      console.error("Error applying theme:", error);
    },
  });
};

// FIXED: Added enabled parameter support
export const useSelectedTheme = (
  options?: { enabled?: boolean },
  userSelectedThemeId?: string
) => {
  return useQuery({
    queryKey: ["selectedTheme", userSelectedThemeId],
    queryFn: () =>
      themesApi.getSelectedTheme({ themeId: userSelectedThemeId ?? "" }),
    initialData: userSelectedThemeId
      ? () => getDemoThemeById(userSelectedThemeId)
      : undefined,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: options?.enabled !== false && !!userSelectedThemeId,
  });
};

export const useClearTheme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: themesApi.clearSelectedTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["selectedTheme"] });

      queryClient.setQueryData(["selectedTheme"], {
        success: true,
        data: { selectedThemeId: undefined },
      });
    },
    onError: (error) => {
      console.error("Error clearing theme:", error);
    },
  });
};
export const useClearUserCache = () => {
  const queryClient = useQueryClient();

  return (userId?: string) => {
    if (userId) {
      // Clear specific user's cache
      queryClient.removeQueries({ queryKey: ["dashboardAssets", userId] });
    } else {
      // Clear all cache if no specific user
      queryClient.clear();
    }
  };
};
