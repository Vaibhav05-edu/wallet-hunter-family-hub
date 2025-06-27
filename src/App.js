import React, { useState } from "react";
import OTPAuth from "./components/OTPAuth";
import HeadForm from "./components/HeadForm";
import FamilyForm from "./components/FamilyForm";
import TreeView from "./components/TreeView";

function App() {
  const [user, setUser] = useState(null);             // Logged-in user from OTP
  const [headData, setHeadData] = useState(null);     // Data from HeadForm
  const [familyData, setFamilyData] = useState(null); // Data from FamilyForm

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Wallet Hunter – Family Hub</h1>

      {/* STEP 1: Login */}
      {!user && <OTPAuth onLogin={setUser} />}

      {/* STEP 2: Head Registration */}
      {user && !headData && (
        <HeadForm
          onSubmit={(data) => {
            console.log("Head Data Submitted:", data);
            setHeadData(data);
          }}
        />
      )}

      {/* STEP 3: Add Family Members */}
      {user && headData && !familyData && (
        <FamilyForm
          onSubmit={(members) => {
            console.log("Family Members Submitted:", members);
            setFamilyData(members);
          }}
        />
      )}

      {/* STEP 4: Show Family Tree */}
      {user && headData && familyData && (
        <>
          <h2 style={{ textAlign: "center" }}>🎉 Registration Complete</h2>
          <TreeView headData={headData} familyData={familyData} />
        </>
      )}
    </div>
  );
}

export default App;
