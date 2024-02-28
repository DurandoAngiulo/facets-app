"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Icon from "@/components/Icon";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button/Index";

const Index = () => {
  return (
    <DashboardLayout>
      <div>
        {/* <h2>edit</h2> */}
        <Link href="/dashboard/userProfile">
          <Icon iconName="backArrow" className="w-[40px] h-[40px]" />
        </Link>
        <h2 className="text-center" style={{ color: "var(--brand)" }}>
          My details
        </h2>
        <p className="text-center">Copy the link to invite friends to Facets!</p>
        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          {/* add function for generated link */}
          <p>generated link</p>
          {/* change icon to copy icon */}
          <Icon iconName="diamondBio" className="w-[40px] h-[40px]" />
        </div>

        <Divider className="py-1"></Divider>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p>Account Information</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Icon iconName="backArrow" className="w-[40px] h-[40px]" />
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p>Facets Management</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Icon iconName="backArrow" className="w-[40px] h-[40px]" />
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p>Edit Facets Summary</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Icon iconName="backArrow" className="w-[40px] h-[40px]" />
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p>Add More Details</p>
          {/* change backarrow to forwardarrow or smn idk */}
          <Icon iconName="backArrow" className="w-[40px] h-[40px]" />
        </div>
        {/* 
        <h3>primary info</h3>
        <div>
          <Link href="/dashboard/editAction/name">
            <p>Name</p>
          </Link>
          <Link href="/dashboard/editAction/birthday">
            <p>Birthday</p>
          </Link>
          <Link href="/dashboard/editAction/pronouns">
            <p>pronouns</p>
          </Link>
          <Link href="/dashboard/editAction/gender">
            <p>Gender</p>
          </Link>
          <Link href="/dashboard/editAction/datingPreferences">
            <p>Dating preferences</p>
          </Link>
          <Link href="dashboard/editAction/ageRange">
            <p>age range</p>
          </Link>
          <Link href="/dashboard/editAction/occupation">
            <p>Occupation</p>
          </Link>
          <Link href="/dashboard/editAction/location">
            <p>Location</p>
          </Link>
        </div>
        <h3>More details section</h3>
        <div>
          <Link href="/dashboard/editAction/moreDetails">
            <p>More Details</p>
          </Link>
        </div>
        <h3>Photo upload section</h3>
        <div>
          <Link href="/dashboard/editAction/uploadPhotos">
            <p>photos</p>
          </Link>
        </div>
        <h3>summary card section?</h3>
        <div>
          <p>not sure how this looks</p>
        </div> */}
      </div>
    </DashboardLayout>
  );
};

export default Index;
