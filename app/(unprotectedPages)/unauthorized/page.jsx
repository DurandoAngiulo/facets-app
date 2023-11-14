import React from "react";
import Link from "next/link";

const unauthorized = () => {
  return (
    <div>
      <p>You are unauthorized to view this page.</p>
      <Link href="/login"></Link>
    </div>
  );
};

export default unauthorized;
