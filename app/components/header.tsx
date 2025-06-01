import React from "react";

const Header: React.FC = () => (
  <header
    style={{
      position: "sticky",
      top: 0,
      left: 0,
      width: "100vw",
      height: "40px",
      background: "#222",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "rgb(251, 159, 0)",
      padding: "0 10px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.48)",
    }}
  >
    <div style={{ fontWeight: 600, fontSize: "1rem", borderRadius: "100%" }}>
      <img
        className="rounded-full"
        style={{ height: "30px", marginRight: "10px" }}
        src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg"
        alt="happy bot image"
      />
    </div>
    <div className="mr-6 py-2 text-[black] font-semibold">AI Trauma Center</div>
    <nav></nav>
  </header>
);

export default Header;
