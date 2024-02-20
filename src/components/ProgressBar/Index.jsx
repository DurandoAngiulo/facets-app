"use client";

const ProgressBar = ({ width, step }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="w-5/6 rounded-full h-3 border" style={{ borderColor: "var(--brand)" }}>
        <div className="h-2.5 rounded-full flex" style={{ width, background: "var(--brand)" }}></div>
      </div>
      <p className="w-1/6 semibold ml-2 p-2 text-nowrap min-w-min" style={{ color: "var(--element-subtle)" }}>
        {step} of 8
      </p>
    </div>
  );
};
export default ProgressBar;
