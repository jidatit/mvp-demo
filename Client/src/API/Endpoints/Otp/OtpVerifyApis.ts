// hooks/useVerifyInvestorOtp.ts
import { useMutation } from "@tanstack/react-query";
import { mockVerifyOtp } from "../../../mocks/handlers/onboarding";

interface VerifyOtpInput {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
  };
}

export const useVerifyInvestorOtp = () =>
  useMutation<VerifyOtpResponse, Error, VerifyOtpInput>({
    mutationFn: async (payload) => {
      return mockVerifyOtp(payload);
    },
  });
