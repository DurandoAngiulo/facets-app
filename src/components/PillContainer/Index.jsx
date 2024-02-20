"use client";

//pill for profile top which contains values/demographics
const PillContainer = ({ children }) => {
  return (
    <div className="px-2 py-0.5 rounded-[20px] border border-zinc-600 justify-start items-start gap-2 inline-flex">
      <p style={{ color: "var(--text)" }} className="text-center align-middle text-wrap	">
        {children}
      </p>
    </div>
  );
};

export { PillContainer };
