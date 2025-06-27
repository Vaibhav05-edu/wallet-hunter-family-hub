import React, { useState } from "react";
import OTPAuth from "./components/OTPAuth";
import HeadForm from "./components/HeadForm";
import FamilyForm from "./components/FamilyForm";

function App() {
  const [user, setUser] = useState(null);         // For OTP-logged-in user
  const [headData, setHeadData] = useState(null); // Head form data
  const [familyData, setFamilyData] = useState(null); // Family form data

  return (
    <div style={{ padding: "20px" }}>
      <h1>Wallet Hunter - Family Hub</h1>

      {/* Step 1: OTP Login */}
      {!user && <OTPAuth onLogin={setUser} />}

      {/* Step 2: Head Form */}
      {user && !headData && (
        <HeadForm
          onSubmit={(data) => {
            console.log("✅ Head Submitted:", data);
            setHeadData(data);
          }}
        />
      )}

      {/* Step 3: Family Form */}
      {user && headData && !familyData && (
        <FamilyForm
          onSubmit={(members) => {
            console.log("✅ Family Submitted:", members);
            setFamilyData(members);
          }}
        />
      )}

      {/* Step 4: Summary */}
      {user && headData && familyData && (
        <div>
          <h2>🎉 Registration Complete</h2>
          <h3>👤 Head Summary</h3>
          <pre>{JSON.stringify(headData, null, 2)}</pre>

          <h3>👨‍👩‍👧 Family Members</h3>
          <pre>{JSON.stringify(familyData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
