import React, { useRef } from "react";
import ExportTree from "./ExportTree";

function TreeView({ headData, familyData }) {
  const exportRef = useRef();

  return (
    <div>
      <ExportTree exportRef={exportRef} />

      <div ref={exportRef} style={{ padding: "10px", border: "1px solid #ccc" }}>
        <h2>👨‍👩‍👧‍👦 Family Tree</h2>

        <div style={{ marginBottom: "20px" }}>
          <h3>👤 Head of Family</h3>
          <p><strong>{headData.name}</strong> — {headData.occupation}</p>
        </div>

        <div>
          <h3>👥 Family Members</h3>
          {familyData.map((member, index) => (
            <div key={index} style={{ borderBottom: "1px dashed #aaa", margin: "10px 0" }}>
              <p><strong>{member.firstName}</strong> — {member.relation}</p>
              <p>Age: {member.age}, Gender: {member.gender}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TreeView;
