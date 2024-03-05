"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { extractIdFromUrl } from "@/utils/util-functions";
import { updateProfile } from "@/services/profile-service";

const Index = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [messageInfo, setMessageInfo] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);

  const profileInformation = currentUser?.profile;

  useEffect(() => {
    if (profileInformation) {
      // console.log(profileInformation);
      const specificMessage = profileInformation.messageData.find((message) => message.userId === profileId);
      setMessageInfo(specificMessage);
    }
  }, [profileInformation, profileId]);

  const handleMessageSubmit = async () => {
    if (!newMessage.trim()) return; // Ignore empty messages

    const updatedMessageInfo = {
      ...messageInfo,
      messageHistory: [...(messageInfo.messageHistory || []), newMessage.trim()]
    };
    const updatedMessageData = {
      messageData: profileInformation.messageData.map((message) => {
        if (message.userId === profileId) {
          return updatedMessageInfo;
        } else {
          return message;
        }
      })
    };
    console.log(updatedMessageData);

    const { data, error } = await updateProfile(currentUser, updatedMessageData);
    console.log(data, "DATA!!!");
    if (error) {
      console.error(data.message);
      return;
    }

    await updateUserProfile(data?.profile);

    setNewMessage(""); // Clear the input field after submitting
  };

  return (
    <div>
      {messageInfo ? (
        <div>
          <p>Name: {messageInfo.userName}</p>
          <p>Prompt: {messageInfo.prompt}</p>
          <p>Response: {messageInfo.response}</p>
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleMessageSubmit}>Submit</button>
          </div>
          <div>
            {messageInfo.messageHistory &&
              messageInfo.messageHistory.map((message, index) => <p key={index}>{message}</p>)}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Index;
