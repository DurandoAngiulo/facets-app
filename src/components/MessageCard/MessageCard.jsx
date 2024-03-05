"use client";
import React from "react";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const MessageCard = ({ message, profileId, userName }) => {
  return (
    <Link href={`${ROUTES.MESSAGES.path}/${profileId}`}>
      <div className="border-2">
        <p>{userName}</p>
        <p>{message}</p>
      </div>
    </Link>
  );
};

export default MessageCard;
