import { get, set, STORAGE_KEYS } from "../storage";
import { DEMO_PDF_URL, getCurrentUserId, mockDelay } from "../utils";

export async function mockStartOnboarding(payload: any) {
  await mockDelay();
  const userId = getCurrentUserId() ?? "inv-new";
  const onboarding = get<Record<string, any>>(STORAGE_KEYS.ONBOARDING, {});
  onboarding[userId] = {
    id: `onb-${Date.now()}`,
    userId,
    formData: payload.formData,
    status: payload.completeLater ? "complete_later" : "pending",
    rejectionNote: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    documents: [],
  };
  set(STORAGE_KEYS.ONBOARDING, onboarding);
  return { success: true, message: "Onboarding started" };
}

export async function mockUpdateOnboarding(payload: any) {
  await mockDelay();
  const userId = getCurrentUserId();
  if (!userId) return { success: false, message: "Unauthorized" };
  const onboarding = get<Record<string, any>>(STORAGE_KEYS.ONBOARDING, {});
  onboarding[userId] = {
    ...(onboarding[userId] ?? {}),
    formData: payload.formData,
    status: payload.completeLater ? "complete_later" : "pending",
    updatedAt: new Date().toISOString(),
  };
  set(STORAGE_KEYS.ONBOARDING, onboarding);
  return { success: true, message: "Onboarding updated" };
}

export async function mockOnboardingStatus() {
  await mockDelay();
  const userId = getCurrentUserId();
  const onboarding = get<Record<string, any>>(STORAGE_KEYS.ONBOARDING, {});
  const record = userId ? onboarding[userId] : null;
  return {
    success: true,
    message: "Onboarding status retrieved",
    data: {
      status: record?.status ?? "approved",
      rejectionNote: record?.rejectionNote,
    },
  };
}

export async function mockOnboardingInfo() {
  await mockDelay();
  const userId = getCurrentUserId();
  const onboarding = get<Record<string, any>>(STORAGE_KEYS.ONBOARDING, {});
  const record = userId ? onboarding[userId] : null;
  return {
    success: true,
    message: "Onboarding info retrieved",
    data: record ?? {
      id: "onb-demo",
      userId,
      formData: {},
      status: "approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}

export async function mockDocumentUpload(_formData: FormData) {
  await mockDelay();
  return {
    success: true,
    message: "Uploaded",
    data: [
      {
        url: DEMO_PDF_URL,
        key: `doc-${Date.now()}`,
        fileName: "uploaded-document.pdf",
        type: "kyc",
      },
    ],
  };
}

export async function mockDocumentDelete(_fileKey: string) {
  await mockDelay();
  return { success: true, message: "Deleted" };
}

export async function mockProceedOnboarding() {
  await mockDelay();
  return { success: true, message: "Onboarding submitted for review" };
}

export async function mockInvestorSignup(_data: {
  name: string;
  email: string;
  password: string;
}) {
  await mockDelay();
  return {
    success: true,
    message: "Signup successful",
    data: { message: "Please verify your email" },
  };
}

export async function mockResendOtp(_payload: { email: string }) {
  await mockDelay();
  return {
    success: true,
    message: "OTP resent",
    data: { message: "OTP sent" },
  };
}

export async function mockVerifyOtp(_payload: { email: string; otp: string }) {
  await mockDelay();
  return {
    success: true,
    message: "Verified",
    data: { message: "Email verified" },
  };
}
