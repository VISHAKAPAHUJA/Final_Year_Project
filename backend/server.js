require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
const cors = require("cors");

// Import Models
const User = require("./models/User");
// const Job = require('./models/Job'); // Uncomment if needed
// const Question = require('./models/Question'); // Uncomment if needed
const jobRoutes = require("./routes/jobRoutes");
const QuestionRoute = require("./routes/QuestionRoute");
const jobApplicationsRouter = require('./routes/jobApplications');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../WEB/CAccount")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Signup Route
// Signup Route
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.isVerified
          ? "Email already in use"
          : "Verification code already sent. Please check your email.",
      });
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create new user
    const newUser = new User({
      email,
      password,
      verificationCode,
      verificationCodeExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      isVerified: false,
    });

    await newUser.save();

    // Send verification email
    await transporter.sendMail({
      from: `"TalentMatch ATS" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your TalentMatch Verification Code",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Welcome to TalentMatch!</h2>
                    <p>Your verification code is:</p>
                    <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
                        ${verificationCode}
                    </div>
                    <p>Enter this code in the verification page to complete your registration.</p>
                    <p>This code expires in 24 hours.</p>
                </div>
            `,
    });

    res.status(201).json({
      success: true,
      message: "Verification code sent to your email",
      email: email, // Include email for redirection
    });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during signup" });
  }
});
// Verify Email with Code
app.post("/api/auth/verify-email", async (req, res) => {
  const { email, code } = req.body;
  console.log("Verification attempt for:", email, "with code:", code);

  try {
    const user = await User.findOne({
      email,
      verificationCode: code,
      verificationCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("Verification failed - invalid code or expired");
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    console.log("Successfully verified:", email);
    res.json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
// Updated Login Route with specific HR email check
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for:", email);

  try {
    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 2. Check if email is verified
    if (!user.isVerified) {
      console.log("Email not verified for:", email);
      return res.status(403).json({
        success: false,
        message: "Please verify your email first. Check your inbox.",
      });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Determine user role (updated with new HR email)
    // const isHRManager = email.toLowerCase() === "talentmatch.ats@gmail.com";
    const isHRManager = email.toLowerCase() === "abhishekkamyani@gmail.com";
    const role = isHRManager ? "HRManager" : "User";
    console.log("Successful login for:", email, "Role:", role);

    // 5. Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 6. Send success response with appropriate redirect
    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      role,
      redirectUrl: isHRManager ? '/hr_dashboard' : '/candidate_dashboard',
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});
// Forgot Password Route
// Generate Password Reset Code
app.post("/api/auth/request-reset-code", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user doesn't exist (security)
      return res.json({
        success: true,
        message: "If this email exists, a reset code has been sent",
      });
    }

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordCode = resetCode;
    user.resetPasswordCodeExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Send email
    await transporter.sendMail({
      from: `"TalentMatch" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Password Reset Code",
      html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2 style="color: #2563eb;">Password Reset</h2>
                    <p>Your verification code is:</p>
                    <h1 style="font-size: 2rem; letter-spacing: 0.5rem;">${resetCode}</h1>
                    <p>This code expires in 15 minutes.</p>
                </div>
            `,
    });

    res.json({
      success: true,
      message: "Reset code sent to your email",
    });
  } catch (error) {
    console.error("Reset code error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating reset code",
    });
  }
});
// Verify Code and Reset Password
app.post("/api/auth/verify-reset-code", async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // Validate password strength first
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Case insensitive email search
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
      resetPasswordCode: code,
      resetPasswordCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log(`Failed reset attempt for ${email} with code ${code}`);
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset code",
      });
    }

    // Hash new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordCode = undefined;
    user.resetPasswordCodeExpires = undefined;
    await user.save();

    console.log(`Password successfully reset for ${email}`);

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting password",
    });
  }
});


// app.use('/api/jobs', jobApplicationsRouter);


app.use("/api/jobs", jobRoutes);           // For job-related routes
app.use("/api/questions", QuestionRoute);  // For question-related routes
app.use("/api/applications", jobApplicationsRouter);  // Changed to distinct path

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
