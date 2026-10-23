import { ArrowRight, Briefcase, Shield, UserPlus, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";
import {
  MOCK_USERS,
  loginAsRole,
  loginAsInvestorOnboarding,
} from "../../mocks";

// Demo entry point: replaces the email/password screen so clients can step
// straight into any role. The real form still lives in Login.tsx.

type DemoRole = "admin" | "fundManager" | "investor";

const ROLE_CARDS: {
  role: DemoRole;
  label: string;
  description: string;
  persona: string;
  icon: LucideIcon;
  dashboard: string;
}[] = [
  {
    role: "admin",
    label: "Platform Admin",
    description: "Onboards fund managers and oversees every account on the platform.",
    persona: MOCK_USERS.admin.name,
    icon: Shield,
    dashboard: "/admin/dashboard",
  },
  {
    role: "fundManager",
    label: "Fund Manager",
    description: "Runs the funds: investors, capital calls, distributions and reporting.",
    persona: `${MOCK_USERS.fundManager.name} · ${MOCK_USERS.fundManager.metadata.firmName}`,
    icon: Briefcase,
    dashboard: "/fundmanager/dashboard",
  },
  {
    role: "investor",
    label: "Investor",
    description: "Tracks commitments, responds to capital calls and downloads reports.",
    persona: `${MOCK_USERS.investor.name} · Limited Partner`,
    icon: Wallet,
    dashboard: "/investor/dashboard",
  },
];

const RolePicker = () => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const { login } = useAuth();
  const accent = currentTheme.dashboardBackground;

  const handleRoleLogin = (role: DemoRole, dashboard: string) => {
    const { user, token } = loginAsRole(role);
    login({ user, token });
    toast.success(`Signed in as ${user.name}`);
    navigate(dashboard);
  };

  const handleOnboardingLogin = () => {
    const { user, token } = loginAsInvestorOnboarding();
    login({ user, token });
    toast.success("Starting investor onboarding demo");
    navigate("/investor/onboarding");
  };

  return (
    <div className="bg-bgDark min-h-screen w-full relative overflow-x-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(165deg,
        #2C2C2E 10%,
        ${currentTheme.sidebarAccentText}10 20%,
        ${currentTheme.sidebarAccentText}20 30%,
        ${currentTheme.dashboardBackground}60 50%,
        ${currentTheme.dashboardBackground}25 45%,
        transparent 90%)`,
        }}
      />

      <div className="relative z-10 min-h-screen max-w-6xl mx-auto px-4 sm:px-8 py-10 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
        {/* Brand column */}
        <div className="lg:w-[42%] text-white">
          <p
            className="text-3xl font-semibold"
            style={{ color: currentTheme.sidebarAccentText }}
          >
            InvestorHub
          </p>
          <h1 className="font-markazi font-semibold text-5xl sm:text-6xl leading-[0.95] mt-10">
            Step inside the fund.
          </h1>
          <p className="mt-5 text-base text-white/70 max-w-md">
            Choose a seat at the table. Each role opens its own workspace,
            loaded with sample funds, investors and documents.
          </p>
          <p className="mt-8 text-xs text-white/40 hidden lg:block">
            Demo data only · Press Ctrl+Shift+R to reset
          </p>
        </div>

        {/* Role column */}
        <div className="lg:flex-1 w-full">
          <div className="bg-white rounded-[20px] p-3 sm:p-4 shadow-2xl">
            <p
              className="px-3 pt-2 pb-3 text-xs font-medium uppercase tracking-[0.14em]"
              style={{ color: currentTheme.secondaryText }}
            >
              Sign in as
            </p>

            <ol className="relative">
              {/* Connector: admin → manager → investor */}
              <span
                aria-hidden
                className="absolute left-[38px] sm:left-[42px] top-10 bottom-10 w-px"
                style={{ background: `${accent}55` }}
              />
              {ROLE_CARDS.map(
                ({ role, label, description, persona, icon: Icon, dashboard }) => (
                  <li key={role}>
                    <button
                      type="button"
                      onClick={() => handleRoleLogin(role, dashboard)}
                      className="group relative w-full text-left flex items-center gap-4 rounded-2xl px-3 sm:px-4 py-4 transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2"
                      style={{ ["--tw-ring-color" as string]: accent }}
                    >
                      <span
                        className="relative z-10 shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white"
                        style={{ background: accent }}
                      >
                        <Icon size={22} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className="block font-semibold text-lg"
                          style={{ color: currentTheme.primaryText }}
                        >
                          {label}
                        </span>
                        <span
                          className="block text-sm mt-0.5"
                          style={{ color: currentTheme.secondaryText }}
                        >
                          {description}
                        </span>
                        <span
                          className="block text-xs mt-1.5 font-medium"
                          style={{ color: currentTheme.sidebarAccentText }}
                        >
                          {persona}
                        </span>
                      </span>
                      <ArrowRight
                        size={20}
                        className="shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: accent }}
                      />
                    </button>
                  </li>
                )
              )}
            </ol>

            <div
              className="mx-3 my-2 h-px"
              style={{ background: currentTheme.secondaryText, opacity: 0.2 }}
            />

            <button
              type="button"
              onClick={handleOnboardingLogin}
              className="group w-full text-left flex items-center gap-4 rounded-2xl px-3 sm:px-4 py-4 transition-colors hover:bg-secondary focus:outline-none focus-visible:ring-2"
              style={{ ["--tw-ring-color" as string]: accent }}
            >
              <span
                className="shrink-0 h-12 w-12 rounded-full flex items-center justify-center border-2 border-dashed"
                style={{ borderColor: accent, color: accent }}
              >
                <UserPlus size={20} />
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className="block font-semibold text-lg"
                  style={{ color: currentTheme.primaryText }}
                >
                  New Investor
                </span>
                <span
                  className="block text-sm mt-0.5"
                  style={{ color: currentTheme.secondaryText }}
                >
                  Goes through onboarding: jurisdiction, classification and KYC.
                </span>
              </span>
              <ArrowRight
                size={20}
                className="shrink-0 transition-transform group-hover:translate-x-1"
                style={{ color: accent }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePicker;
