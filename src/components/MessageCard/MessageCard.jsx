"use client";
import React from "react";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const MessageCard = ({ message, profileId, userName }) => {
  return (
    <Link href={`${ROUTES.MESSAGES.path}/${profileId}`}>
      <div className="border-2 p-2 rounded-md my-2">
        <h3 className="gradient-text">{userName}</h3>
        <p style={{ color: "var(--text)" }}>{message}</p>
      </div>
    </Link>
  );
};

export default MessageCard;
