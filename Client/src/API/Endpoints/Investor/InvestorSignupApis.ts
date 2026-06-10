// hooks/useInvestorSignup.ts
import { useMutation } from "@tanstack/react-query";
import { mockInvestorSignup } from "../../../mocks/handlers/onboarding";

interface InvestorSignupData {
  name: string;
  email: string;
  password: string;
}

interface InvestorSignupResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
  };
}

export const useInvestorSignup = () =>
  useMutation<InvestorSignupResponse, Error, InvestorSignupData>({
    mutationFn: async (data) => {
      return mockInvestorSignup(data);
    },
  });
