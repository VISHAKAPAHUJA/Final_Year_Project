import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hiringImage from "./hiring.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const navigate = useNavigate();

  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
      setTimeout(
        () => setNotification({ show: false, message: "", type: "info" }),
        300
      );
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!formData.username || !formData.password) {
    setError("Please fill in all fields.");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.username,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Enhanced token storage
    if (data.token) {
      localStorage.setItem("token", data.token);
      // Also store expiration time if available
      if (data.expiresIn) {
        const expiresAt = Date.now() + data.expiresIn * 1000;
        localStorage.setItem("token_expires", expiresAt.toString());
      }
      console.log("Token stored successfully");
    } else {
      console.error("Login response:", data);
      throw new Error("Authentication token not received");
    }

    // Rest of your existing redirect logic remains exactly the same
    if (data.redirectUrl) {
      if (data.redirectUrl.includes('http://') || data.redirectUrl.includes('https://')) {
        const fixedUrl = data.redirectUrl.replace(/^\/+/, '');
        window.location.href = fixedUrl;
      } else {
        console.log("====data====", data);
        
        navigate(data.redirectUrl || "/hr_dashboard");
      }
    } else {
      if (data.role === "HRManager") {
        navigate("/hr_dashboard");
      } else {
        window.location.href = "/candidate_dashboard";
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    setError(error.message || "Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsForgotPasswordLoading(true);

    try {
      const email = formData.username || prompt("Enter your email:");
      if (!email) return;

      const response = await fetch(
        "http://localhost:5000/api/auth/request-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset code");
      }

      if (data.success) {
        showNotification(
          "Check your email for the 6-digit reset code",
          "success"
        );
        setTimeout(() => {
          window.location.href = `reset-password.html?email=${encodeURIComponent(
            email
          )}`;
        }, 1500);
      } else {
        throw new Error(data.message || "Error sending reset code");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      showNotification(
        error.message || "Network error. Please try again.",
        "error"
      );
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("verified")) {
      showNotification(
        "Email verified successfully! Please log in.",
        "success"
      );
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-blue-600 p-4">
      <div className="flex w-[1000px] min-h-[650px] bg-white bg-opacity-15 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-white border-opacity-20 p-8">
        {/* Image Container */}
        <div className="w-[45%] flex justify-center items-center p-4 rounded-xl">
          <img
            src={hiringImage}
            alt="We are Hiring"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* Form Container */}
        <div className="w-[55%] flex flex-col justify-center text-center pl-8">
          {/* Updated heading sizes to match CreateAccount */}
          <h2 className="text-3xl font-semibold text-white mb-4">
            Welcome Back!
          </h2>
          <p className="text-gray-200 mb-6">Log in to continue your journey</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {" "}
            {/* Changed space-y-4 to space-y-5 */}
            {/* Email Field - updated to match CreateAccount */}
            <div className="text-left">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white mb-2"
              >
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username or email"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-base bg-white bg-opacity-90 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-300 outline-none transition"
              />
            </div>
            {/* REST OF THE CODE REMAINS EXACTLY THE SAME */}
            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isForgotPasswordLoading}
                className="text-sm text-blue-300 hover:text-blue-200 disabled:text-blue-400 disabled:cursor-not-allowed"
              >
                {isForgotPasswordLoading
                  ? "Sending code..."
                  : "Forgot password?"}
              </button>
            </div>
            {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
                isLoading
                  ? "bg-gradient-to-r from-blue-600 to-black"
                  : "bg-gradient-to-r from-black to-blue-600 hover:from-blue-600 hover:to-black"
              } relative`}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-opacity-30 rounded-full border-t-white animate-spin"></div>
                </div>
              ) : null}
              <span className={isLoading ? "invisible" : ""}>
                {isLoading ? "Logging in..." : "Login"}
              </span>
            </button>
          </form>

          <p className="text-sm text-white mt-4">
            Don't have an account?{" "}
            <Link
              to="/"
              className="text-yellow-400 font-medium hover:text-yellow-500 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <div className="flex justify-center space-x-4 mt-6">
            <button className="px-4 py-2 bg-black bg-opacity-70 text-white rounded-md text-sm flex items-center">
              App Store
            </button>
            <button className="px-4 py-2 bg-black bg-opacity-70 text-white rounded-md text-sm flex items-center">
              Google Play
            </button>
          </div>
        </div>
      </div>

      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          } shadow-lg cursor-pointer transition-opacity duration-300`}
          onClick={() =>
            setNotification({ show: false, message: "", type: "info" })
          }
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Login;
