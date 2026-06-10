// src/api/investors.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  mockGetFundInvestors,
  mockUpdateInvestorDocument,
} from "../../../mocks/handlers/funds";

export type Investor = {
  id: string;
  email: string;
  name: string;
  role: string;
  isEmailVerified: boolean;
};
export type InvestorDocumentUpdateResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    investor: {
      name: string;
      amount: string;
      addedAt: string;
      investorId: string;
      documentUrl: string;
      documentName: string;
      status: boolean;
    };
  };
};

export const useUpdateInvestorDocument = () => {
  const queryClient = useQueryClient();
  return useMutation<
    InvestorDocumentUpdateResponse,
    Error,
    {
      fundId: string;
      investorId: string;
      document: File;
      status: boolean;
    }
  >({
    mutationFn: async ({ fundId, investorId, document, status }) => {
      const formData = new FormData();
      formData.append("investor_doc", document);
      formData.append("status", status.toString());

      return mockUpdateInvestorDocument({
        fundId,
        investorId,
        document,
        status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investorFunds'] });
    },
  });
};

export const useGetInvestors = () => {
  return useQuery<Investor[]>({
    queryKey: ["investors"],
    queryFn: async () => {
      const res = await mockGetFundInvestors();
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnMount: true,     
    refetchOnWindowFocus: false,
  });
};