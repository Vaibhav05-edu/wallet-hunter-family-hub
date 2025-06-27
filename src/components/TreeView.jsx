import React from "react";

function TreeView({ headData, familyData }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍👩‍👧‍👦 Family Tree</h2>

      <div style={{ marginBottom: "20px", border: "2px solid #ccc", padding: "10px" }}>
        <h3>👤 Head of Family</h3>
        <p><strong>{headData.name}</strong> — {headData.occupation}</p>
        <p>📞 {headData.phone} | 🩸 {headData.bloodGroup}</p>
      </div>

      <div>
        <h3>👥 Family Members</h3>
        {familyData.map((member, index) => (
          <div key={index} style={{ border: "1px dashed #999", margin: "10px 0", padding: "10px" }}>
            <p><strong>{member.firstName}</strong> — {member.relation}</p>
            <p>Age: {member.age}, Gender: {member.gender}</p>
            <p>📞 {member.phone} | 🩸 {member.bloodGroup || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TreeView;
