"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Icon from "@/components/Icon";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button/Index";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="page padding">
        {/* <h2>edit</h2> */}
        <Link href="/dashboard/userProfile">
          <Icon iconName="back" className="h-5 mt-8" style={{ fill: "none" }} />
        </Link>
        <h1 className="w-full text-center" style={{ color: "var(--brand)" }}>
          My details
        </h1>
        <p className="text-center">Copy the link to invite friends to Facets!</p>
        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          {/* add function for generated link */}
          <p className="w-5/6">facets.com/friend-link </p>
          {/* change icon to copy icon */}
          <Icon iconName="contentCopy" className="w-[30px] h-[30px] m-auto" />
        </div>

        <hr className="my-4" style={{ borderColor: "var(--border)" }}></hr>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium">Account Information</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium my-auto">Add More Details</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Link href="/dashboard/editAction/moreDetails" className="m-auto flex">
            <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
          </Link>
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium">Edit Facets Summary</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium">Facets Management</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
