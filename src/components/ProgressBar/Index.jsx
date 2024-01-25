"use client";

const ProgressBar = ({ width, step }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="w-full rounded-full h-3 border" style={{ borderColor: "var(--brand)" }}>
        <div className="h-2.5 rounded-full flex" style={{ width, background: "var(--brand)" }}></div>
      </div>
      <p className="semibold ml-2 w-full" style={{ color: "var(--element-subtle)" }}>
        {step} of 8
      </p>
    </div>
  );
};
export default ProgressBar;
