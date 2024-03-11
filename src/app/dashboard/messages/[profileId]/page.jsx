"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { extractIdFromUrl } from "@/utils/util-functions";
import { updateProfile } from "@/services/profile-service";
import Icon from "@/components/Icon";
import Link from "next/link";
import BeveledContainer from "@/components/BeveledContainer/Index.jsx";
import MaskedImage from "@/components/MaskedImage/Index";

const Index = ({ facet = null }) => {
  const { currentUser, updateUserProfile } = useAuth();
  const [messageInfo, setMessageInfo] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const pathname = usePathname();
  const profileId = extractIdFromUrl(pathname);
  const [photoUrls, setPhotoUrls] = useState([]);

  const profileInformation = currentUser?.profile;

  useEffect(() => {
    if (profileInformation) {
      // console.log(profileInformation);
      const specificMessage = profileInformation.messageData.find((message) => message.userId === profileId);
      setMessageInfo(specificMessage);
    }
  }, [profileInformation, profileId]);

  useEffect(() => {
    const fetchPhotoURLs = async () => {
      if (!facet?.photos) return;

      try {
        const photoURLs = await getFacetPhotoUrls(facet.photos);
        const sortedPhotos = photoURLs.sort((a, b) => a.order - b.order);
        setPhotoUrls(sortedPhotos);
      } catch (error) {
        console.error("Error fetching photo URLs", error);
      }
    };

    fetchPhotoURLs();
  }, [facet?.photos]);

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
    <div className="page padding bg-white">
      {messageInfo ? (
        <div>
          <div className="w-full justify-center items-center gap-1 inline-flex mt-8 mb-4">
            <Link href="/dashboard/feed" className="w-1/6">
              <Icon iconName="back" className="h-5" style={{ fill: "none" }} />
            </Link>
            <div className="inline-flex w-4/6">
              <MaskedImage height={100} width={130} src={photoUrls[0]?.url} />
              <div className="my-auto">
                <h3 className="gradient-text">{messageInfo.userName}</h3>
                <div className="inline-flex align-middle">
                  <Icon iconName="diamondBio" className="h-4 my-auto pr-2" style={{ fill: "none" }} />
                  <p style={{ color: "var(--text)" }} className="text-center italic">
                    {profileInformation?.pronouns}
                  </p>
                </div>
              </div>
            </div>
            <Icon iconName="kabob" className="h-7 w-1/6" />
          </div>

          <div className="w-2/3 justify-end">
            <p style={{ color: "var(--text)" }} className="italic">
              {" "}
              replying to
            </p>
            <p className="italic">{messageInfo.prompt}</p>
            <p style={{ color: "var(--brand)" }}>{messageInfo.response}</p>
          </div>

          <div className="absolute px-1 bottom-16 left-0 right-0 flex justify-center ">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full"
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
