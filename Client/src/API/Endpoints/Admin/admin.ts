import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import {
  mockCheckSubdomain,
  mockCreateFundManager,
  mockGetFundManagers,
  mockDeleteFundManager,
  mockGetAdminInvestors,
  mockDeleteAdminInvestor,
} from "../../../mocks/handlers/admin";
import { mockLoginAsUser } from "../../../mocks/handlers/auth";

// Types for API responses
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  projectCount: number;
  investorCount: number;
  subdomain: string;
};

export type PaginatedAdminUsers = {
  data: AdminUser[];
  totalItems: number;
  totalPages: number;
};

export type SubdomainCheckResponse = {
  subdomain: string;
  isAvailable: boolean;
};

export type FundManagerInput = {
  name: string;
  email: string;
  password: string;
  subdomain: string;
};

export type FundManagerResponse = {
  id: string;
  name: string;
  email: string;
  subdomain: string;
  createdAt: string;
};

export type LoginAsResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
    isActive: boolean;
    metadata: Record<string, any>;
    selectedTheme?: string | null;
    createdAt: string;
    updatedAt: string;
    isOnboarded?: boolean;
    onboardingStatus?: {
      status: "pending" | "approved" | "rejected";
      rejectionNote?: string | null;
    } | null;
  };
};

// Hook to check subdomain availability
export const useCheckSubdomain = () => {
  const queryClient = useQueryClient();

  return {
    checkSubdomain: async (subdomain: string) => {
      const data = await queryClient.fetchQuery({
        queryKey: ["checkSubdomain", subdomain],
        queryFn: async () => mockCheckSubdomain(subdomain),
        staleTime: 0,
      });
      return data;
    },
  };
};

// Hook to create a fund manager
export const useCreateFundManager = () => {
  const queryClient = useQueryClient();
  return useMutation<FundManagerResponse, Error, FundManagerInput>({
    mutationFn: async (input) => mockCreateFundManager(input),
    onSuccess: (data) => {
      toast.success(`Fund manager ${data.name} created successfully`);
      // Invalidate fund managers query to refresh list
      queryClient.invalidateQueries({ queryKey: ["fundManagers"] });
    },
    onError: (error) => {
      let errorMessage = "Failed to create fund manager";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};

// Hook to fetch paginated fund managers
export const useGetFundManagers = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery<PaginatedAdminUsers, Error>({
    queryKey: ["fundManagers", page, limit],
    queryFn: async () => mockGetFundManagers(page, limit),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// Hook to delete a fund manager
export const useDeleteFundManager = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => mockDeleteFundManager(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fundManagers"] });
    },
    onError: (error) => {
      let errorMessage = "Failed to create fund manager";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};

// Hook to fetch paginated investors
export const useGetInvestors = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery<PaginatedAdminUsers, Error>({
    queryKey: ["investors", page, limit],
    queryFn: async () => mockGetAdminInvestors(page, limit),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// Hook to delete an investor
export const useDeleteInvestor = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => mockDeleteAdminInvestor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investors"] });
    },
    onError: (error) => {
      let errorMessage = "Failed to create fund manager";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};

// Hook to log in as a user
export const useLoginAsUser = () => {
  return useMutation<LoginAsResponse, Error, { userId: string; token: string }>(
    {
      mutationFn: async ({ userId, token }) =>
        mockLoginAsUser(userId, token),
      onError: (error) => {
        let errorMessage = "Failed to create fund manager";

        if (axios.isAxiosError(error)) {
          errorMessage =
            error.response?.data?.message || error.message || errorMessage;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
      },
    }
  );
};
