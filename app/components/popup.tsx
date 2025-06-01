import React from "react";

type PopupProps = {
  title: string;
  description: string;
  onOk: () => void;
};

const Popup: React.FC<PopupProps> = ({ title, description, onOk }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        color: "#000",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          minWidth: 320,
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
        }}
      >
        <div style={{ padding: "24px 24px 0 24px" }}>
          <h2 className="font-bold text-lg" style={{ margin: 0 }}>
            {title}
          </h2>
        </div>
        <div
          style={{
            padding: "16px 24px",
            overflowY: "auto",
            flex: 1,
            minHeight: 60,
            maxHeight: "40vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <p style={{ margin: 0, whiteSpace: "pre-line" }}>{description}</p>
        </div>
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onOk}
            style={{
              padding: "8px 24px",
              borderRadius: 4,
              border: "none",
              background: "#0070f3",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
