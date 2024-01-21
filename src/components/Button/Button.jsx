"use client";

const PrimaryButton = ({ label, active, disabled }) => {
  return (
    <div
      style={{
        borderColor: active ? "var(--brand)" : "var(--element-subtle)",
        background: active ? "var(--button-gradient) " : "radial-gradient(circle, #F0EFEF, var(--background))",
        pointerEvents: disabled ? "none" : "auto" // Disable pointer events for disabled state
      }}
      className="w-72 h-9 p-2 rounded border justify-center items-center gap-2.5 inline-flex"
    >
      <div
        style={{
          color: active ? "var(--brand)" : "var(--element-subtle)"
        }}
      >
        <p className="semibold">{label}</p>
      </div>
    </div>
  );
};

const SecondaryButton = ({ label, active, disabled }) => {
  return (
    <div
      style={{
        borderColor: active ? "var(--brand)" : "var(--element-subtle)",
        background: "var(--background);",
        pointerEvents: disabled ? "none" : "auto" // Disable pointer events for disabled state
      }}
      className="w-72 h-9 p-2 rounded border border-solid justify-center items-center gap-2.5 inline-flex"
    >
      <div
        style={{
          color: active ? "var(--brand)" : "var(--element-subtle)"
        }}
      >
        <p className="semibold">{label}</p>
      </div>
    </div>
  );
};

export { PrimaryButton, SecondaryButton };
