import React, { useState } from "react";
import OTPAuth from "./components/OTPAuth";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <h3>Welcome, {user.phoneNumber}</h3>
      ) : (
        <OTPAuth onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
