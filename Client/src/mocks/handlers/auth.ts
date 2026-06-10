import {
  MOCK_USERS,
  createMockToken,
  getUserByEmail,
  getUserById,
} from "../data/users";
import { getCurrentUserId, mockDelay } from "../utils";

export async function mockLogin(data: { email: string; password: string }) {
  await mockDelay();
  const user =
    getUserByEmail(data.email) ??
    (data.password.length >= 6 ? MOCK_USERS.investor : undefined);

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  return {
    success: true,
    data: {
      user,
      token: createMockToken(user.id, user.role),
    },
  };
}

export async function mockLogout() {
  await mockDelay();
  return { success: true, message: "Logged out successfully" };
}

export async function mockRequestPasswordReset(_data: { email: string }) {
  await mockDelay();
  return {
    success: true,
    message: "Password reset link sent to your email",
  };
}

export async function mockResetPassword(_data: {
  email: string;
  token: string;
  newPassword: string;
}) {
  await mockDelay();
  return { success: true, message: "Password updated successfully" };
}

export async function mockGetUserProfile() {
  const userId = getCurrentUserId();
  const user = userId ? getUserById(userId) : null;
  if (!user) throw new Error("Unauthorized");
  return { success: true, data: user };
}

export function loginAsRole(role: "admin" | "fundManager" | "investor") {
  const userMap = {
    admin: MOCK_USERS.admin,
    fundManager: MOCK_USERS.fundManager,
    investor: MOCK_USERS.investor,
  };
  const user = userMap[role];
  return {
    user,
    token: createMockToken(user.id, user.role),
  };
}

export async function mockLoginAsUser(_userId: string, _token: string) {
  await mockDelay();
  return {
    user: MOCK_USERS.investor,
    token: createMockToken(MOCK_USERS.investor.id, MOCK_USERS.investor.role),
  };
}
