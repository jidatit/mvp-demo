import { get, set, STORAGE_KEYS } from "../storage";
import { mockDelay, paginate } from "../utils";
import type { FundManagerInput } from "../../API/Endpoints/Admin/admin";

export async function mockCheckSubdomain(subdomain: string) {
  await mockDelay();
  const managers = get<any[]>(STORAGE_KEYS.ADMIN_FUND_MANAGERS, []);
  const taken = managers.some((m) => m.subdomain === subdomain);
  return { subdomain, isAvailable: !taken };
}

export async function mockCreateFundManager(input: FundManagerInput) {
  await mockDelay();
  const managers = get<any[]>(STORAGE_KEYS.ADMIN_FUND_MANAGERS, []);
  const newManager = {
    id: `fm-${Date.now()}`,
    name: input.name,
    email: input.email,
    subdomain: input.subdomain,
    createdAt: new Date().toISOString(),
    created_at: new Date().toISOString(),
    projectCount: 0,
    investorCount: 0,
  };
  set(STORAGE_KEYS.ADMIN_FUND_MANAGERS, [...managers, newManager]);
  return newManager;
}

export async function mockGetFundManagers(page: number, limit: number) {
  await mockDelay();
  const managers = get<any[]>(STORAGE_KEYS.ADMIN_FUND_MANAGERS, []);
  return paginate(managers, page, limit);
}

export async function mockDeleteFundManager(id: string) {
  await mockDelay();
  const managers = get<any[]>(STORAGE_KEYS.ADMIN_FUND_MANAGERS, []);
  set(
    STORAGE_KEYS.ADMIN_FUND_MANAGERS,
    managers.filter((m) => m.id !== id)
  );
}

export async function mockGetAdminInvestors(page: number, limit: number) {
  await mockDelay();
  const investors = get<any[]>(STORAGE_KEYS.ADMIN_INVESTORS, []);
  return paginate(investors, page, limit);
}

export async function mockDeleteAdminInvestor(id: string) {
  await mockDelay();
  const investors = get<any[]>(STORAGE_KEYS.ADMIN_INVESTORS, []);
  set(
    STORAGE_KEYS.ADMIN_INVESTORS,
    investors.filter((i) => i.id !== id)
  );
}
