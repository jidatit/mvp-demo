import { get, set, STORAGE_KEYS } from "../storage";
import { mockDelay } from "../utils";

export async function mockGetManagerInvestors(params: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  await mockDelay();
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  let items = get<any[]>(STORAGE_KEYS.MANAGER_INVESTORS, []);
  if (params.status) {
    items = items.filter((i) => i.status === params.status);
  }
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    success: true,
    message: "Investors retrieved",
    data: {
      data: items.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export async function mockGetInvestorDetails(investorId: string) {
  await mockDelay();
  const onboarding = get<Record<string, any>>(STORAGE_KEYS.ONBOARDING, {});
  const record = onboarding[investorId];
  if (!record) {
    return { success: false, message: "Investor not found" };
  }
  return { success: true, message: "OK", data: record };
}

export async function mockUpdateOnboardingStatus(
  onboardingId: string,
  data: { status: string; rejectionNote?: string }
) {
  await mockDelay();
  const onboarding = get<Record<string, any>>(STORAGE_KEYS.ONBOARDING, {});
  const entry = Object.entries(onboarding).find(
    ([, v]) => v.id === onboardingId
  );
  if (entry) {
    const [key, record] = entry;
    onboarding[key] = {
      ...record,
      status: data.status,
      rejectionNote: data.rejectionNote ?? "",
    };
    set(STORAGE_KEYS.ONBOARDING, onboarding);

    const investors = get<any[]>(STORAGE_KEYS.MANAGER_INVESTORS, []);
    set(
      STORAGE_KEYS.MANAGER_INVESTORS,
      investors.map((inv) =>
        inv.id === key
          ? { ...inv, status: data.status, onboardingStatus: data.status }
          : inv
      )
    );
  }
  return { success: true, message: "Status updated" };
}

export async function mockDeleteOnboarding(onboardingId: string) {
  await mockDelay();
  const onboarding = get<Record<string, any>>(STORAGE_KEYS.ONBOARDING, {});
  const key = Object.keys(onboarding).find(
    (k) => onboarding[k].id === onboardingId
  );
  if (key) {
    delete onboarding[key];
    set(STORAGE_KEYS.ONBOARDING, onboarding);
  }
  return { success: true, message: "Deleted" };
}
