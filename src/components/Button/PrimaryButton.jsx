"use client";

const PrimaryButton = () => {
  return (
    <div
      /* WHY ISNT THE BORDER GRADIENT WORKING ?!!?! */
      style={{ border: "1px solid", borderColor: "var(--gradient-stroke)", background: "var(--button-gradient)" }}
      className="w-72 h-9 p-2 rounded border justify-center items-center gap-2.5 inline-flex"
    >
      <div
        style={{
          color: "var(--brand)"
        }}
      >
        <p className="semibold">View full Facet</p>
      </div>
    </div>
  );
};

export default PrimaryButton;
