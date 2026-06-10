import { get, set, STORAGE_KEYS } from "../storage";
import { DEMO_PDF_URL, mockDelay } from "../utils";

export async function mockGetTaxReports(params: {
  page?: number;
  limit?: number;
  year?: string;
  quarter?: string;
}) {
  await mockDelay();
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  let items = get<any[]>(STORAGE_KEYS.TAX_REPORTS, []);
  if (params.year) items = items.filter((r) => r.year === params.year);
  if (params.quarter) items = items.filter((r) => r.quarter === params.quarter);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    success: true,
    message: "Tax reports retrieved",
    data: {
      data: items.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export async function mockCreateTaxReport(payload: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.TAX_REPORTS, []);
  const created = {
    id: `tax-${Date.now()}`,
    projectName: payload.projectName,
    reportURL: DEMO_PDF_URL,
    createdBy: "fm-001",
    year: payload.year,
    quarter: payload.quarter,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    investors: [],
  };
  set(STORAGE_KEYS.TAX_REPORTS, [created, ...items]);
  return { success: true, message: "Created", data: created };
}

export async function mockUpdateTaxReport(id: string, data: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.TAX_REPORTS, []);
  const updated = items.map((r) =>
    r.id === id
      ? {
          ...r,
          ...data,
          updatedAt: new Date().toISOString(),
          reportURL: data.document ? DEMO_PDF_URL : r.reportURL,
        }
      : r
  );
  set(STORAGE_KEYS.TAX_REPORTS, updated);
  return {
    success: true,
    message: "Updated",
    data: updated.find((r) => r.id === id),
  };
}

export async function mockDeleteTaxReport(id: string) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.TAX_REPORTS, []);
  set(
    STORAGE_KEYS.TAX_REPORTS,
    items.filter((r) => r.id !== id)
  );
  return { success: true, message: "Deleted" };
}

export async function mockDownloadTaxReport(_id: string) {
  await mockDelay();
  return { success: true, data: { url: DEMO_PDF_URL } };
}
