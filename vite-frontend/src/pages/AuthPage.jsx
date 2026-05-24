import { useState } from "react";
import API from "../services/api";

function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await API.register(name, email, password);
    setLoading(false);
    if (result.detail) {
      setError(result.detail);
      return;
    }
    setGeneratedOTP(result.otp);
    setMode("otp");
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError("Enter the OTP.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await API.verifyOTP(email, otp);
    setLoading(false);
    if (result.detail) {
      setError(result.detail);
      return;
    }
    localStorage.setItem("token", result.token);
    localStorage.setItem("name", result.name);
    localStorage.setItem("email", result.email);
    onLoginSuccess(result.name);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password required.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await API.login(email, password);
    setLoading(false);
    if (result.detail) {
      setError(result.detail);
      return;
    }
    localStorage.setItem("token", result.token);
    localStorage.setItem("name", result.name);
    localStorage.setItem("email", result.email);
    onLoginSuccess(result.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">💰</div>
          <h1 className="text-3xl font-bold text-gray-800">LedgerLens</h1>
          <p className="text-gray-400 mt-1">AI-Powered Finance Analyzer</p>
        </div>

        {/* OTP Screen */}
        {mode === "otp" && (
          <div>
            <h2 className="text-xl font-bold text-center mb-2">
              Verify Your Email
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              Enter the OTP to complete registration
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-yellow-700 font-medium">
                Demo OTP (would be emailed in production):
              </p>
              <p className="text-3xl font-bold text-yellow-600 mt-1 tracking-widest">
                {generatedOTP}
              </p>
            </div>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-purple-400 mb-4"
            />

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => { setMode("register"); setError(""); }}
              className="w-full text-gray-400 text-sm mt-4 hover:text-gray-600"
            >
              Back to Register
            </button>
          </div>
        )}

        {/* Login Screen */}
        {mode === "login" && (
          <div>
            <h2 className="text-xl font-bold text-center mb-6">
              Welcome Back!
            </h2>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-blue-400"
            />

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 mb-4"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => { setMode("register"); setError(""); }}
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}

        {/* Register Screen */}
        {mode === "register" && (
          <div>
            <h2 className="text-xl font-bold text-center mb-6">
              Create Account
            </h2>

            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-purple-400"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-purple-400"
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-purple-400"
            />

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 disabled:opacity-50 mb-4"
            >
              {loading ? "Sending OTP..." : "Send OTP & Register"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setError(""); }}
                className="text-blue-500 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AuthPage;