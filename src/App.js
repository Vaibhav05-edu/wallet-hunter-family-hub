import React, { useState } from "react";
import OTPAuth from "./components/OTPAuth";
import HeadForm from "./components/HeadForm";

function App() {
  const [user, setUser] = useState(null);
  const [headData, setHeadData] = useState(null);

  return (
    <div>
      {!user && <OTPAuth onLogin={setUser} />}
      {user && !headData && (
        <HeadForm onSubmit={(formData) => {
          console.log("Head Data Submitted:", formData);
          setHeadData(formData);
        }} />
      )}
      {headData && (
        <div>
          <h3>Head registered successfully!</h3>
          <pre>{JSON.stringify(headData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
