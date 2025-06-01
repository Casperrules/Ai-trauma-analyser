import React from "react";

interface LoaderProps {
  loadingMessage: string;
}

const Loader: React.FC<LoaderProps> = ({ loadingMessage }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        width: 50,
        height: 50,
        border: "6px solid #f44336",
        borderTop: "6px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginBottom: 20,
      }}
    >
      <img
        src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg"
        alt="loading"
        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
      />
    </div>
    <span style={{ color: "#fff", fontSize: 18, fontWeight: 500 }}>
      {loadingMessage}
    </span>
    <style>
      {`
                @keyframes spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
            `}
    </style>
  </div>
);

export default Loader;
