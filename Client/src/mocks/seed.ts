import { seedFundSummaries, seedFundDetails, seedInvestorFunds } from "./data/funds";
import {
  seedManagerInvestors,
  seedAdminFundManagers,
  seedAdminInvestors,
  seedFundInvestorDropdown,
} from "./data/investors";
import { seedKycDocuments, seedOnboardingRecords } from "./data/documents";
import { seedNotifications } from "./data/notifications";
import { seedTaxReports } from "./data/taxReports";
import {
  seedThemes,
  seedDashboardAssets,
  seedCapitalCalls,
  seedDistributions,
  seedFundReports,
} from "./data/themes";
import { get, set, STORAGE_KEYS } from "./storage";

export function seedIfEmpty(): void {
  if (localStorage.getItem(STORAGE_KEYS.SEEDED)) return;

  set(STORAGE_KEYS.FUNDS, seedFundSummaries());
  set(STORAGE_KEYS.FUND_DETAILS, seedFundDetails());
  set(STORAGE_KEYS.MANAGER_INVESTORS, seedManagerInvestors());
  set(STORAGE_KEYS.ADMIN_FUND_MANAGERS, seedAdminFundManagers());
  set(STORAGE_KEYS.ADMIN_INVESTORS, seedAdminInvestors());
  set(STORAGE_KEYS.FUND_INVESTORS, seedFundInvestorDropdown());
  set(STORAGE_KEYS.KYC_DOCUMENTS, seedKycDocuments());
  set(STORAGE_KEYS.ONBOARDING, seedOnboardingRecords());
  set(STORAGE_KEYS.NOTIFICATIONS, seedNotifications());
  set(STORAGE_KEYS.TAX_REPORTS, seedTaxReports());
  set(STORAGE_KEYS.THEMES, seedThemes());
  set(STORAGE_KEYS.DASHBOARD_ASSETS, seedDashboardAssets());
  set(STORAGE_KEYS.CAPITAL_CALLS, seedCapitalCalls());
  set(STORAGE_KEYS.DISTRIBUTIONS, seedDistributions());
  set(STORAGE_KEYS.FUND_REPORTS, seedFundReports());
  set(STORAGE_KEYS.SELECTED_THEME, { themeId: "theme-001", userId: "fm-001" });

  localStorage.setItem(STORAGE_KEYS.SEEDED, "true");
}

export function reseedAll(): void {
  localStorage.removeItem(STORAGE_KEYS.SEEDED);
  seedIfEmpty();
}

export function getInvestorFundsFromStorage() {
  return seedInvestorFunds();
}
