// src/api/auth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  mockLogin,
  mockLogout,
  mockRequestPasswordReset,
  mockResetPassword,
  mockGetUserProfile,
} from "../../../mocks/handlers/auth";

type LoginPayload = {
  email: string;
  password: string;
};

type ResetRequestPayload = {
  email: string;
};

type ResetPasswordPayload = {
  email: string;
  token: string;
  newPassword: string;
};

// Login
export const useLogin = () =>
  useMutation({
    mutationFn: async (data: LoginPayload) => mockLogin(data),
  });

// Logout (even though it's "protected", you mentioned no token is needed)
export const useLogout = () =>
  useMutation({
    mutationFn: async () => mockLogout(),
  });

// Send reset password link
export const useRequestPasswordReset = () =>
  useMutation({
    mutationFn: async (data: ResetRequestPayload) =>
      mockRequestPasswordReset(data),
  });

// Update password
export const useResetPassword = () =>
  useMutation({
    mutationFn: async (data: ResetPasswordPayload) => mockResetPassword(data),
  });
export const useGetUserProfile = (options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await mockGetUserProfile();
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true, // default true unless overridden
  });
