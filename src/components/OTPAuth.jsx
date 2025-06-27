import React, { useState, useEffect } from "react";
import { auth, RecaptchaVerifier } from "../firebase/config";
import { signInWithPhoneNumber } from "firebase/auth";

function OTPAuth({ onLogin }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("✅ OTPAuth component mounted");
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("✅ Recaptcha solved:", response);
            sendOTP();
          },
        },
        auth
      );
      window.recaptchaVerifier.render().then((widgetId) => {
        console.log("🛡 Recaptcha widget ID:", widgetId);
      });
    }
  };

  const sendOTP = async () => {
    if (!phoneNumber.startsWith("+")) {
      alert("Use full international format, e.g. +91XXXXXXXXXX");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      setLoading(true);
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      setMessage("✅ OTP sent to " + phoneNumber);
    } catch (err) {
      console.error("❌ Failed to send OTP:", err);
      alert("Could not send OTP. See console.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || !confirmationResult) {
      alert("Please enter the OTP sent to your phone.");
      return;
    }

    try {
      setLoading(true);
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      setMessage("✅ Phone verified: " + user.phoneNumber);
      onLogin(user); // send to parent
    } catch (error) {
      console.error("❌ Invalid OTP:", error);
      alert("Incorrect OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>🔐 Login with OTP</h2>

      {step === 1 && (
        <>
          <input
            type="tel"
            placeholder="Enter phone number (e.g. +91XXXXXXXXXX)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <div id="recaptcha-container"></div>
          <button onClick={sendOTP} disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "10px", marginBottom: "10px" }}
          />
          <button onClick={verifyOTP} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default OTPAuth;
