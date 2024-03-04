"use client";

const PrimaryButton = ({ label, active, disabled, icon, iconleft, onDark, small }) => {
  return (
    <div
      style={{
        borderColor: active ? "var(--brand)" : "var(--element-subtle)",
        background: active ? "var(--button-gradient) " : "radial-gradient(circle, #F0EFEF, var(--background))",
        opacity: disabled ? "0.5" : "1",
        height: small ? "auto" : "48px",
        padding: small ? "6px" : "auto"
      }}
      className="w-full rounded border flex items-center justify-center gap-2"
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
          color: active ? (onDark ? "white" : "var(--brand)") : "var(--element-subtle)"
        }}
      >
        <p className="font-medium">{label}</p>
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

const SecondaryButton = ({ label, active, disabled, icon, iconleft, onDark }) => {
  return (
    <div
      style={{
        borderColor: active ? (onDark ? "var(--brand)" : "var(--text)") : "var(--element-subtle)",
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
          color: active ? (onDark ? "white" : "var(--text)") : "var(--element-subtle)"
        }}
      >
        <p className="font-medium">{label}</p>
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

const TertiaryButton = ({ label, active, disabled, icon, iconleft, onDark }) => {
  return (
    <div
      style={{
        borderColor: "var(--element-subtle)",
        opacity: disabled ? "0.5" : "1"
      }}
      className=" border-b border-solid justify-center items-center inline-flex"
    >
      {iconleft && icon && (
        <div
          style={{
            color: "var(--element-subtle)"
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          color: "var(--element-subtle)"
        }}
      >
        <p className="font-medium">{label}</p>
      </div>
      {!iconleft && icon && (
        <div
          className="ml-1"
          style={{
            color: "var(--element-subtle)"
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export { PrimaryButton, SecondaryButton, TertiaryButton };
