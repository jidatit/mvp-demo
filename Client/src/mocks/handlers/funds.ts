import { get, set, STORAGE_KEYS } from "../storage";
import { DEMO_PDF_URL, mockDelay, paginate } from "../utils";
import { getInvestorFundsFromStorage } from "../seed";

export async function mockGetAllFunds() {
  await mockDelay();
  return get(STORAGE_KEYS.FUNDS, []);
}

export async function mockGetFundById(id: string) {
  await mockDelay();
  const details = get<Record<string, any>>(STORAGE_KEYS.FUND_DETAILS, {});
  return (
    details[id] ?? {
      success: false,
      message: "Fund not found",
      result: null,
    }
  );
}

export async function mockGetInvestorFunds() {
  await mockDelay();
  return {
    success: true,
    message: "Investor funds retrieved",
    statusCode: 200,
    data: getInvestorFundsFromStorage(),
  };
}

export async function mockCreateFund(_payload: unknown) {
  await mockDelay();
  const funds = get<any[]>(STORAGE_KEYS.FUNDS, []);
  const newFund = {
    id: `fund-${Date.now()}`,
    name: "New Demo Fund",
    fundType: "Venture Capital",
    fundDescription: "Recently created demo fund",
    investorCount: 0,
    createdAt: new Date().toISOString(),
    status: "upcoming",
    fundSize: "10000000",
  };
  set(STORAGE_KEYS.FUNDS, [newFund, ...funds]);
  return { success: true, message: "Fund created", data: newFund };
}

export async function mockUpdateFund(params: { id: string; data: any }) {
  await mockDelay();
  const details = get<Record<string, any>>(STORAGE_KEYS.FUND_DETAILS, {});
  if (details[params.id]) {
    details[params.id].result = {
      ...details[params.id].result,
      ...params.data,
    };
    set(STORAGE_KEYS.FUND_DETAILS, details);
  }
  return { success: true, message: "Fund updated" };
}

export async function mockGetFundInvestors() {
  await mockDelay();
  return { success: true, data: get(STORAGE_KEYS.FUND_INVESTORS, []) };
}

export async function mockUpdateInvestorDocument({
  fundId,
  investorId,
  status,
}: {
  fundId: string;
  investorId: string;
  document: File;
  status: boolean;
}) {
  await mockDelay();
  const details = get<Record<string, any>>(STORAGE_KEYS.FUND_DETAILS, {});
  const fund = details[fundId];
  if (fund?.result?.investors) {
    fund.result.investors = fund.result.investors.map((inv: any) =>
      inv.investorId === investorId
        ? {
            ...inv,
            status,
            documentUrl: DEMO_PDF_URL,
            documentName: "Signed_Subscription.pdf",
          }
        : inv
    );
    set(STORAGE_KEYS.FUND_DETAILS, details);
  }
  return {
    success: true,
    message: "Document updated",
    statusCode: 200,
    data: {
      investor: {
        name: "Investor",
        amount: "0",
        addedAt: new Date().toISOString(),
        investorId,
        documentUrl: DEMO_PDF_URL,
        documentName: "Signed_Subscription.pdf",
        status,
      },
    },
  };
}

export async function mockGetCapitalCalls(
  page: number,
  limit: number,
  fundId?: string
) {
  await mockDelay();
  let items = get<any[]>(STORAGE_KEYS.CAPITAL_CALLS, []);
  if (fundId) items = items.filter((i) => i.fundId === fundId);
  return paginate(items, page, limit);
}

export async function mockCreateCapitalCall(payload: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.CAPITAL_CALLS, []);
  const created = {
    id: `cc-${Date.now()}`,
    ...payload,
    createdBy: "fm-001",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  set(STORAGE_KEYS.CAPITAL_CALLS, [created, ...items]);
  return created;
}

export async function mockUpdateCapitalCallStatus(id: string, status: string) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.CAPITAL_CALLS, []);
  const updated = items.map((i) =>
    i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i
  );
  set(STORAGE_KEYS.CAPITAL_CALLS, updated);
  return updated.find((i) => i.id === id);
}

export async function mockUpdateCapitalCall(id: string, payload: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.CAPITAL_CALLS, []);
  const updated = items.map((i) =>
    i.id === id
      ? { ...i, ...payload, updatedAt: new Date().toISOString() }
      : i
  );
  set(STORAGE_KEYS.CAPITAL_CALLS, updated);
  return updated.find((i) => i.id === id);
}

export async function mockGetDistributions(
  page: number,
  limit: number,
  fundId?: string
) {
  await mockDelay();
  let items = get<any[]>(STORAGE_KEYS.DISTRIBUTIONS, []);
  if (fundId) items = items.filter((i) => i.fundId === fundId);
  return paginate(items, page, limit);
}

export async function mockCreateDistribution(payload: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.DISTRIBUTIONS, []);
  const created = {
    id: `dist-${Date.now()}`,
    ...payload,
    createdBy: "fm-001",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  set(STORAGE_KEYS.DISTRIBUTIONS, [created, ...items]);
  return created;
}

export async function mockUpdateDistributionStatus(id: string, status: string) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.DISTRIBUTIONS, []);
  const updated = items.map((i) =>
    i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i
  );
  set(STORAGE_KEYS.DISTRIBUTIONS, updated);
  return updated.find((i) => i.id === id);
}

export async function mockUpdateDistribution(id: string, payload: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.DISTRIBUTIONS, []);
  const updated = items.map((i) =>
    i.id === id
      ? { ...i, ...payload, updatedAt: new Date().toISOString() }
      : i
  );
  set(STORAGE_KEYS.DISTRIBUTIONS, updated);
  return updated.find((i) => i.id === id);
}

export async function mockGetFundReports(
  fundId: string,
  page = 1,
  limit = 10,
  year?: string,
  quarter?: string
) {
  await mockDelay();
  let items = get<any[]>(STORAGE_KEYS.FUND_REPORTS, []).filter(
    (r) => r.fundId === fundId
  );
  if (year) items = items.filter((r) => r.year === year);
  if (quarter) items = items.filter((r) => r.quarter === quarter);
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const start = (page - 1) * limit;
  return {
    results: items.slice(start, start + limit),
    totalCount,
    totalPages,
    currentPage: page,
  };
}

export async function mockCreateFundReport(payload: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.FUND_REPORTS, []);
  const created = {
    id: `fr-${Date.now()}`,
    fundId: payload.fundId,
    createdBy: "fm-001",
    projectName: payload.projectName,
    description: payload.description,
    documentUrl: DEMO_PDF_URL,
    year: payload.year,
    quarter: payload.quarter,
    createdAt: new Date().toISOString(),
    createdByName: "Sarah Chen",
  };
  set(STORAGE_KEYS.FUND_REPORTS, [created, ...items]);
  return created;
}
