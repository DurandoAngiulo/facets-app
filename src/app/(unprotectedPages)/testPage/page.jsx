"use client";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Icon from "@/components/Icon";
import RadioInput from "@/components/Inputs/RadioInput";
import TextInput from "@/components/Inputs/TextInput";
import Checkbox from "@/components/Inputs/Checkbox";

const Index = () => {
  return (
    <div>
      <h1>Test page</h1>
      <p>use this as a playground to test components/styling</p>
      <div className="flex flex-col gap-2 px-10">
        {/* <Icon iconName="next" className="w-full fill-slate-900" /> */}
        <RadioInput label="hello" />
        <Checkbox label="hello again" />
        <TextInput placeholder="test" />
      </div>
    </div>
  );
};

export default Index;
