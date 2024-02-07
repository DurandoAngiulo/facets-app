"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";

import Link from "next/link";

const Index = () => {
  return (
    <DashboardLayout>
      <div>
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
      </div>
    </DashboardLayout>
  );
};

export default Index;
