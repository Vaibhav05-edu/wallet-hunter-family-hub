import React, { useState } from "react";
import { auth, RecaptchaVerifier } from "../firebase/config";
import { signInWithPhoneNumber } from "firebase/auth";

function OTPAuth({ onLogin }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => sendOTP(), // Automatically retry on success
        },
        auth
      );
    }
  };

  const sendOTP = async () => {
    if (!phoneNumber.startsWith("+")) {
      alert("Please use international format (e.g. +91XXXXXXXXXX)");
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setMessage("OTP sent to " + phoneNumber);
      setStep(2);
    } catch (error) {
      console.error(error);
      alert("Error sending OTP. Check console.");
    }
  };

  const verifyOTP = async () => {
    if (!otp || !confirmationResult) return alert("Please enter OTP");

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      setMessage("✅ Phone verified: " + user.phoneNumber);
      onLogin(user); // Pass back to parent
    } catch (error) {
      console.error(error);
      alert("❌ Invalid OTP");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>OTP Login</h2>

      {step === 1 && (
        <>
          <input
            type="tel"
            placeholder="Enter phone number (e.g. +91XXXXXXXXXX)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <div id="recaptcha-container"></div>
          <button onClick={sendOTP}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default OTPAuth;
