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

        <h3 style={{ color: "var(--brand)" }}>Primary Information</h3>
        <div>
          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Name</p>
            <Link href="/dashboard/editAction/name" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>

          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Birthday</p>
            <Link href="/dashboard/editAction/birthday" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>

          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Pronouns</p>
            <Link href="/dashboard/editAction/pronouns" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>

          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Gender</p>
            <Link href="/dashboard/editAction/gender" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>

          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Dating Preferences</p>
            <Link href="/dashboard/editAction/datingPreferences" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>

          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Age Range</p>
            <Link href="dashboard/editAction/ageRange" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>

          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Occupation</p>
            <Link href="/dashboard/editAction/occupation" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>

          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p className="w-5/6 font-medium my-auto">Location</p>
            <Link href="/dashboard/editAction/location" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>
        </div>

        <h3 style={{ color: "var(--brand)" }}>More Details</h3>
        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium my-auto">Add More Details</p>
          <Link href="/dashboard/editAction/moreDetails" className="m-auto flex">
            <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
          </Link>
        </div>

        <h3 style={{ color: "var(--brand)" }}>Facet Photos</h3>
        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          {/* change backarrow to forwardarrow or smn idk */}
          <p className="w-5/6 font-medium my-auto">Photos</p>
          <Link href="/dashboard/editAction/uploadPhotos" className="m-auto flex">
            <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
          </Link>
        </div>

        {/* <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium">Account Information</p>
          <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium">Edit Facets Summary</p>
          <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
        </div>

        <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <p className="w-5/6 font-medium">Facets Management</p>
          <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
        </div> */}
      </div>

      {/* <div>
        <h2>edit</h2>
        <Link href="/dashboard/userProfile">go back</Link>
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
        </div>
      </div> */}
    </DashboardLayout>
  );
};

export default Index;
