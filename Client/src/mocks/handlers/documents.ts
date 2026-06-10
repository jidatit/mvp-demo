import { get, set, STORAGE_KEYS } from "../storage";
import { DEMO_PDF_URL, mockDelay } from "../utils";

export async function mockGetKycDocuments(params: {
  page?: number;
  limit?: number;
  status?: string;
  investorName?: string;
}) {
  await mockDelay();
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  let items = get<any[]>(STORAGE_KEYS.KYC_DOCUMENTS, []);
  if (params.status) {
    items = items.filter((d) => d.formData.documentStatus === params.status);
  }
  if (params.investorName) {
    items = items.filter((d) =>
      d.investorName
        .toLowerCase()
        .includes(params.investorName!.toLowerCase())
    );
  }
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    success: true,
    message: "KYC documents retrieved",
    data: {
      data: items.slice(start, start + limit),
      total,
      page,
      limit,
      totalPages,
    },
  };
}

export async function mockUpdateKycDocument(id: string, data: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.KYC_DOCUMENTS, []);
  const updated = items.map((d) =>
    d.id === id ? { ...d, formData: { ...d.formData, ...data.formData } } : d
  );
  set(STORAGE_KEYS.KYC_DOCUMENTS, updated);
  return {
    success: true,
    message: "Updated",
    data: updated.find((d) => d.id === id),
  };
}

export async function mockApproveKycDocument(id: string) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.KYC_DOCUMENTS, []);
  const updated = items.map((d) =>
    d.id === id
      ? {
          ...d,
          formData: { ...d.formData, documentStatus: "approved" },
        }
      : d
  );
  set(STORAGE_KEYS.KYC_DOCUMENTS, updated);
  return {
    success: true,
    message: "Approved",
    data: updated.find((d) => d.id === id),
  };
}

export async function mockRequestKycReupload(id: string, data: any) {
  await mockDelay();
  const items = get<any[]>(STORAGE_KEYS.KYC_DOCUMENTS, []);
  const updated = items.map((d) =>
    d.id === id
      ? {
          ...d,
          formData: {
            ...d.formData,
            documentStatus: "reupload_requested",
            documentNote: data.reuploadNote,
          },
        }
      : d
  );
  set(STORAGE_KEYS.KYC_DOCUMENTS, updated);
  return {
    success: true,
    message: "Reupload requested",
    data: updated.find((d) => d.id === id),
  };
}

export async function mockDownloadKycDocument() {
  await mockDelay();
  return { success: true, data: { url: DEMO_PDF_URL } };
}
