"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Icon from "@/components/Icon";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button/Index";
import { getReferralLink } from "@/utils/util-functions";
import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import CopyToClipboard from "@/components/copyToClipboard/Index";

const Index = () => {
  const { currentUser, currentUserProfile } = useAuth();
  const [referralLink, setReferralLink] = useState(null);
  console.log(currentUser, currentUserProfile);
  useEffect(() => {
    if (currentUser?.profile?.referralID) {
      const link = getReferralLink(currentUser?.profile?.referralID);
      setReferralLink(link);
    }
  }, [currentUser?.profile]);

  if (!referralLink) {
    return <p>Loading referral link...</p>;
  }

  return (
    <DashboardLayout>
      <div className="page padding bg-white gap-y-16">
        {/* <h2>edit</h2> */}
        <Link href="/dashboard/userProfile">
          <Icon iconName="back" className="h-5 mt-8" style={{ fill: "none" }} />
        </Link>
        <h1 className="w-full text-center" style={{ color: "var(--brand)" }}>
          My details
        </h1>

        <div className="w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
          <div className="w-full inline-flex">
            <p style={{ color: "var(--text)" }} className="text-center w-5/6">
              Copy the link to invite friends to Facets!
            </p>
            <CopyToClipboard></CopyToClipboard>
          </div>

          <hr className="my-2" style={{ borderColor: "var(--border)" }}></hr>
          <p style={{ color: "var(--text)" }} className="w-5/6">
            {referralLink}
          </p>
        </div>

        <hr className="my-6" style={{ borderColor: "var(--border)" }}></hr>

        <div className="mb-6">
          <h3 style={{ color: "var(--brand)" }}>Primary Information</h3>
          <div>
            <Link href="/dashboard/editAction/name" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Name
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>

            <Link href="/dashboard/editAction/birthday" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Birthday
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>

            <Link href="/dashboard/editAction/pronouns" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Pronouns
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>

            <Link href="/dashboard/editAction/gender" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Gender
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>

            <Link href="/dashboard/editAction/datingPreferences" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Dating Preferences
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>

            <Link href="dashboard/editAction/ageRange" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Age Range
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>

            <Link href="/dashboard/editAction/occupation" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Occupation
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>

            <Link href="/dashboard/editAction/location" className="m-auto flex">
              <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
                <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
                  Location
                </p>
                <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
              </div>
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <h3 style={{ color: "var(--brand)" }}>More Details</h3>
          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
              Add More Details
            </p>
            <Link href="/dashboard/editAction/moreDetails" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>
        </div>

        <div className="pb-6">
          <h3 style={{ color: "var(--brand)" }}>Facet Photos</h3>
          <div className="inline-flex w-full p-3 my-2 rounded border border-zinc-500 border-opacity-50">
            {/* change backarrow to forwardarrow or smn idk */}
            <p style={{ color: "var(--text)" }} className="w-5/6 font-medium my-auto">
              Photos
            </p>
            <Link href="/dashboard/editAction/uploadPhotos" className="m-auto flex">
              <Icon iconName="backArrow" className="w-[30px] h-[30px] rotate-180 m-auto" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
