"use client";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Icon from "@/components/Icon";

const Index = () => {
  return (
    <div>
      <h1>Test page</h1>
      <p>use this as a playground to test components/styling</p>
      <div className="flex flex-col gap-2 px-10">
        {/* <Icon iconName="next" className="w-full fill-slate-900" /> */}
      </div>
    </div>
  );
};

export default Index;
