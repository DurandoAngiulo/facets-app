"use client";
// pages/index.js
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Index = () => {
  const containerStyle = {
    background: "var(--background-gradient)"
  };
  return (
    <div style={containerStyle}>
      <h1>
        Test <i>page</i>
      </h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <p>
        use this as a playground to test <i>components/styling</i>
      </p>
      <p class="semibold">use this as a playground to test components/styling</p>
      <p class="bold">use this as a playground to test components/styling</p>
      <p class="large">this is large paragraph</p>
    </div>
  );
};

export default Index;
