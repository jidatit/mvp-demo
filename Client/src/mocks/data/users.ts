import type { User } from "../../Context/AuthContext";

const now = new Date().toISOString();

export const MOCK_USERS = {
  admin: {
    id: "admin-001",
    name: "Alex Morgan",
    email: "admin@demo.platform",
    role: "admin",
    isEmailVerified: true,
    isActive: true,
    metadata: {},
    selectedTheme: null,
    createdAt: now,
    updatedAt: now,
    isOnboarded: true,
    onboardingStatus: null,
  } satisfies User,

  fundManager: {
    id: "fm-001",
    name: "Sarah Chen",
    email: "manager@acmecapital.demo",
    role: "fundManager",
    isEmailVerified: true,
    isActive: true,
    metadata: { firmName: "Acme Capital Partners", subdomain: "acme-capital" },
    selectedTheme: "theme-001",
    createdAt: now,
    updatedAt: now,
    isOnboarded: true,
    onboardingStatus: null,
  } satisfies User,

  investor: {
    id: "inv-001",
    name: "James Whitfield",
    email: "investor@demo.platform",
    role: "investor",
    isEmailVerified: true,
    isActive: true,
    metadata: { fundManagerId: "fm-001" },
    selectedTheme: "theme-001",
    createdAt: now,
    updatedAt: now,
    isOnboarded: true,
    onboardingStatus: {
      status: "approved" as const,
      rejectionNote: null,
      documentStatus: "approved",
    },
  } satisfies User,
};

export function createMockToken(userId: string, role: string): string {
  return `mock.${userId}.${role}`;
}

export function getUserById(id: string): User | undefined {
  return Object.values(MOCK_USERS).find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return Object.values(MOCK_USERS).find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
}
