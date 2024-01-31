"use client";

const PrimaryButton = ({ label, active, disabled, icon, iconleft }) => {
  return (
    <div
      style={{
        borderColor: active ? "var(--brand)" : "var(--element-subtle)",
        background: active ? "var(--button-gradient) " : "radial-gradient(circle, #F0EFEF, var(--background))",
        opacity: disabled ? "0.5" : "1"
      }}
      className="w-full h-12 rounded border flex items-center justify-center gap-2"
    >
      {iconleft && icon && (
        <div
          style={{
            fill: active ? "var(--brand)" : "var(--element-subtle)"
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          color: active ? "var(--brand)" : "var(--element-subtle)"
        }}
      >
        <p className="semibold">{label}</p>
      </div>
      {!iconleft && icon && (
        <div
          style={{
            color: active ? "var(--brand)" : "var(--element-subtle)"
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

const SecondaryButton = ({ label, active, disabled, icon, iconleft }) => {
  return (
    <div
      style={{
        borderColor: active ? "var(--text)" : "var(--element-subtle)",
        opacity: disabled ? "0.5" : "1"
      }}
      className="w-full h-12 rounded border border-solid justify-center items-center gap-2.5 inline-flex"
    >
      {iconleft && icon && (
        <div
          style={{
            color: active ? "var(--text)" : "var(--element-subtle)"
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          color: active ? "var(--text)" : "var(--element-subtle)"
        }}
      >
        <p className="semibold">{label}</p>
      </div>
      {!iconleft && icon && (
        <div
          style={{
            color: active ? "var(--text)" : "var(--element-subtle)"
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export { PrimaryButton, SecondaryButton };
