// hooks/useResendOtp.ts
import { useMutation } from "@tanstack/react-query";
import { mockResendOtp } from "../../../mocks/handlers/onboarding";

interface ResendOtpInput {
  email: string;
}

interface ResendOtpResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
  };
}

export const useResendOtp = () =>
  useMutation<ResendOtpResponse, Error, ResendOtpInput>({
    mutationFn: async (payload) => {
      return mockResendOtp(payload);
    },
  });
