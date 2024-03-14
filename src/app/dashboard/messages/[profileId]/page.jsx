"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { extractIdFromUrl } from "@/utils/util-functions";
import { updateProfile } from "@/services/profile-service";
import Icon from "@/components/Icon";
import Link from "next/link";
import MaskedImage from "@/components/MaskedImage/Index";
import { PrimaryButton, SecondaryButton } from "@/components/Button/Index";

const Index = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [messageInfo, setMessageInfo] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);
  const profileInformation = currentUser?.profile;
  const [isGradientBackground, setIsGradientBackground] = useState(false);

  useEffect(() => {
    if (profileInformation) {
      // console.log(profileInformation);
      const specificMessage = profileInformation.messageData.find((message) => message.userId === profileId);
      setMessageInfo(specificMessage);
    }
  }, [profileInformation, profileId]);

  const handleMessageSubmit = async () => {
    if (!newMessage.trim()) return; // Ignore empty messages

    setIsGradientBackground(true);
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
    <div className="page padding bg-white">
      {messageInfo ? (
        <div>
          <div className="w-full justify-center items-center gap-1 inline-flex mt-8">
            <Link href="/dashboard/feed" className="w-1/6">
              <Icon iconName="back" className="h-5" style={{ fill: "none" }} />
            </Link>
            <div className="inline-flex w-4/6">
              {/* TODO: Put in proper primary image here for the person they're chatting with */}
              <MaskedImage height={100} width={100} />
              <div className="my-auto">
                <h3 className="gradient-text">{messageInfo.userName}</h3>
                <div className="inline-flex align-middle">
                  <Icon iconName="diamondBio" className="h-4 my-auto pr-1.5" style={{ fill: "none" }} />
                  <p style={{ color: "var(--text)" }} className="text-center italic">
                    {profileInformation?.pronouns}
                  </p>
                </div>
              </div>
            </div>
            <Icon iconName="kabob" className="h-7 w-1/6" />
          </div>

          <hr className="my-2" style={{ borderColor: "var(--border)" }}></hr>

          <div className="w-full inline-flex">
            <div className="w-1/3"> </div>
            <div className="w-2/3 justify-end">
              <p style={{ color: "var(--text)" }} className="italic">
                {" "}
                replying to
              </p>
              <p className="italic">{messageInfo.prompt}</p>
              <p style={{ color: "var(--brand)" }}>{messageInfo.response}</p>
            </div>
          </div>

          <div className="absolute px-1 bottom-20 left-0 right-0 flex justify-center page-container">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send a message..."
              className="w-5/6 my-8 ml-2 p-3 rounded border border-zinc-500 border-opacity-50 justify-start items-center gap-2.5 inline-flex outline-none"
            />
            <div className="w-1/6 my-auto m-2">
              <button onClick={handleMessageSubmit} className="w-full">
                <SecondaryButton active="true" label="Send">
                  Send
                </SecondaryButton>
              </button>
            </div>
          </div>

          <div className="w-full inline-flex mt-2">
            <div className="w-1/3"> </div>
            <div className="w-2/3">
              <div
                style={{ background: "--berry-linear" }}
                className={`flex-end py-2 px-3 rounded-xl ${isGradientBackground ? "gradient-background" : ""}`}
              >
                {messageInfo.messageHistory &&
                  messageInfo.messageHistory.map((message, index) => (
                    <p key={index} style={{ color: "white" }}>
                      {message}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Index;
