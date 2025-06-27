import React, { useState, useEffect } from "react";
import OTPAuth from "./components/OTPAuth";
import HeadForm from "./components/HeadForm";
import FamilyForm from "./components/FamilyForm";
import TreeView from "./components/TreeView";
import ExportTree from "./components/ExportTree";
import { db } from "./firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);             // Firebase OTP user
  const [headData, setHeadData] = useState(null);     // Head form data
  const [familyData, setFamilyData] = useState(null); // Family members list

  // 🔁 Firestore Save Function
  const saveToFirestore = async (head, family) => {
    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        head,
        family,
        phone: user?.phoneNumber,
        createdAt: serverTimestamp()
      });
      console.log("✅ Data saved to Firestore with ID:", docRef.id);
    } catch (err) {
      console.error("❌ Error saving to Firestore:", err);
    }
  };

  // Auto-save to Firestore after full registration
  useEffect(() => {
    if (user && headData && familyData) {
      saveToFirestore(headData, familyData);
    }
  }, [user, headData, familyData]);

  // Ref to pass into exportable tree section
  const exportRef = React.useRef();

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>🏠 Wallet Hunter – Family Hub</h1>

      {/* 🔐 STEP 1: OTP Login */}
      {!user && <OTPAuth onLogin={setUser} />}

      {/* 👤 STEP 2: Head Registration */}
      {user && !headData && (
        <HeadForm
          onSubmit={(data) => {
            console.log("✅ Head Submitted:", data);
            setHeadData(data);
          }}
        />
      )}

      {/* 👨‍👩‍👧 STEP 3: Add Family Members */}
      {user && headData && !familyData && (
        <FamilyForm
          onSubmit={(members) => {
            console.log("✅ Family Submitted:", members);
            setFamilyData(members);
          }}
        />
      )}

      {/* 🌳 STEP 4: Family Tree + Export */}
      {user && headData && familyData && (
        <div>
          <ExportTree exportRef={exportRef} />
          <TreeView
            headData={headData}
            familyData={familyData}
            exportRef={exportRef}
          />
        </div>
      )}
    </div>
  );
}

export default App;
