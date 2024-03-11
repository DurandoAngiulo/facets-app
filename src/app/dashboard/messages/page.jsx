"use client";
import React from "react";

import { useAuth } from "@/context/AuthContext";
import MessageCard from "@/components/MessageCard/MessageCard";

const Index = () => {
  const { currentUser } = useAuth();
  const profileInformation = currentUser?.profile;

  return (
    <div className="page padding bg-white">
      {profileInformation?.messageData.map((message, index) => (
        <MessageCard
          key={index}
          message={message.messageHistory ? message.messageHistory[message.messageHistory.length - 1] : "no message"}
          profileId={message.userId}
          userName={message.userName}
        />
      ))}
    </div>
  );
};

export default Index;
