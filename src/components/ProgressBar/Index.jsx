"use client";

const ProgressBar = ({ width, step }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="w-5/6">
        <div className="w-full rounded-full h-3 border" style={{ borderColor: "var(--brand)" }}>
          <div className="h-2.5 rounded-full flex" style={{ width, background: "var(--brand)" }}></div>
        </div>
      </div>

      <p className="w-1/6 font-medium ml-2 p-2 whitespace-nowrap" style={{ color: "var(--element-subtle)" }}>
        {step} of 8
      </p>
    </div>
  );
};
export default ProgressBar;
