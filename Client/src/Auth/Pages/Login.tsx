import { Eye, EyeOff, Mail } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLogin } from "../../API/Endpoints/Auth/AuthApis";
import { useResendOtp } from "../../API/Endpoints/Otp/OtpResendApis";
import { useTheme } from "../../Context/ThemeContext";
import { loginAsRole } from "../../mocks";

type DemoRole = "admin" | "fundManager" | "investor";

const ROLE_CONFIG: {
  role: DemoRole;
  label: string;
  dashboard: string;
}[] = [
    { role: "admin", label: "Admin", dashboard: "/admin/dashboard" },
    { role: "fundManager", label: "Manager", dashboard: "/fundmanager/dashboard" },
    { role: "investor", label: "Investor", dashboard: "/investor/dashboard" },
  ];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const { login } = useAuth();
  const loginMutation = useLogin();
  const resendOtpMutation = useResendOtp();
  const logoimg = null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleResendOtp = () => {
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    resendOtpMutation.mutate(
      { email: formData.email },
      {
        onSuccess: (response) => {
          if (response.success) {
            toast.success("OTP resent successfully");
            navigate(
              `/verify-email?email=${encodeURIComponent(formData.email)}`
            );
          } else {
            toast.error(response.message || "Failed to resend OTP");
          }
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || "Failed to resend OTP";
          toast.error(errorMessage);
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          if (response.success && response.data) {
            const { user, token } = response.data;

            if (!user.isEmailVerified) {
              toast.error(
                "Email not verified. Please verify your email first."
              );
              setEmailNotVerified(true);
              return;
            }

            toast.success("Signed in successfully!");
            login({ user, token });

            const role = user.role;
            if (role === "admin") navigate("/admin/dashboard");
            else if (role === "fundManager") navigate("/fundmanager/dashboard");
            else if (role === "investor") navigate("/investor/dashboard");
            else navigate("/dashboard");
          } else {
            toast.error(response.message || "Login failed");
          }
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || "Login failed. Please try again.";
          if (errorMessage.includes("Email not verified")) {
            toast.error("Email not verified. Please verify your email first.");
            setEmailNotVerified(true);
          } else {
            toast.error(errorMessage);
          }
        },
      }
    );
  };

  const handleDemoLogin = (role: DemoRole, dashboard: string) => {
    const { user, token } = loginAsRole(role);
    login({ user, token });
    toast.success(`Signed in as ${user.name}`);
    navigate(dashboard);
  };

  return (
    <div className="bg-bgDark h-screen w-full flex items-center justify-center flex-col overflow-hidden">
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

      <div className="relative z-10" />

      <div className="absolute top-14 short:static short:mb-2">
        {logoimg ? (
          <img src={logoimg} alt="InvestorHub" className="h-16 w-auto" />
        ) : (
          <p
            className="text-white text-3xl font-semibold"
            style={{ color: currentTheme.sidebarAccentText }}
          >
            InvestorHub
          </p>
        )}
      </div>

      <div className="w-[590px] bg-white rounded-[20px] flex items-center justify-center flex-col py-10 px-[53px] z-10">
        <p
          className="font-markazi font-semibold text-5xl"
          style={{ color: currentTheme.primaryText }}
        >
          Welcome
        </p>
        <h3
          className="font-semibold text-2xl mt-4"
          style={{ color: currentTheme.primaryText }}
        >
          Sign in Your Account as
        </h3>

        <div className="w-full mt-6 flex gap-2">
          {ROLE_CONFIG.map(({ role, label, dashboard }) => (
            <button
              key={role}
              type="button"
              onClick={() => handleDemoLogin(role, dashboard)}
              className="flex-1 rounded-full h-9 text-sm font-medium transition-colors hover:opacity-90"
              style={{
                background: currentTheme.dashboardBackground,
                color: currentTheme.primaryText,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="w-full mt-5 mb-1 flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{ background: currentTheme.secondaryText, opacity: 0.3 }}
          />
          <span
            className="text-xs whitespace-nowrap"
            style={{ color: currentTheme.secondaryText }}
          >
            or sign in with email
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: currentTheme.secondaryText, opacity: 0.3 }}
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-2">
          {emailNotVerified && (
            <div className="mb-4 bg-amber-50 border border-amber-300 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="text-bgDark" size={20} />
                <p className="text-bgDark font-medium">
                  Your email is not verified
                </p>
              </div>
              <p className="mt-2 text-bgDark text-sm">
                Please verify your email to access your account.
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                className="mt-3 bg-bgPrimary hover:bg-bgDark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center justify-center"
                disabled={resendOtpMutation.isPending}
              >
                {resendOtpMutation.isPending ? (
                  <span className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                ) : null}
                Resend Verification Email
              </button>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-bgDark rounded-[100px] bg-transparent w-full h-[46px] px-6 placeholder:text-bgDark placeholder:text-base focus:outline-none focus:ring-2 focus:ring-primary"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loginMutation.isPending}
            />

            <div className="w-full mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-bgDark rounded-[100px] bg-transparent w-full h-[46px] px-6 placeholder:text-bgDark placeholder:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loginMutation.isPending}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                disabled={loginMutation.isPending}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end items-center">
            <Link
              to="/forgot-password"
              className="text-base underline"
              style={{ color: currentTheme.primaryText }}
            >
              Forgot Password?
            </Link>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full rounded-[100px] h-[46px] font-medium mt-6 transition-colors disabled:opacity-50 flex items-center justify-center"
              disabled={
                formData.password.length < 6 ||
                !formData.email ||
                loginMutation.isPending
              }
              style={{
                background: currentTheme.dashboardBackground,
                color: currentTheme.primaryText,
              }}
            >
              {loginMutation.isPending ? (
                <span className="animate-spin inline-block h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
              ) : null}
              Sign In
            </button>

            <div
              className="text-center mt-4"
              style={{ color: currentTheme.primaryText }}
            >
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="underline font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
