import { Spinner } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatMessages from "./components/ChatMessages";
import MessageInput from "./components/MessageInput";
import ProfileInfo from "./components/UserProfile";
import UserProfileCard from "./components/UserProfileCard";
import { mockConversationData } from "./mockData/conversation";
import { userProfile } from "./mockData/userProfile";

export default function Conversation() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conversionProfile, setConversionProfile] = useState({});
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = mockConversationData.find(
      (conversation) => conversation.conversationId === conversationId,
    );
    const messages = data ? data.messages : [];
    const conversationProfile = data
      ? data.participants.find((person) => person.id !== "user-2")
      : {};
    const userProfileDetails = userProfile.find(
      (person) => person.id === conversationProfile.id,
    );
    setMessages(messages);
    setConversionProfile({ ...conversationProfile, ...userProfileDetails });
    setTimeout(() => setLoading(false), 200);
  }, [conversationId]);

  const handleProfileClick = () => {
    setShowProfile(() => !showProfile);
  };

  return (
    <div className="flex w-[79%]">
      <div
        className={`border-border flex ${showProfile ? "mr-3 flex-1" : "flex-1"} flex-col rounded-2xl border bg-background p-5`}
      >
        {/* Message board */}
        {conversionProfile && messages && !loading && (
          <MessageBoard
            messages={messages}
            conversionProfile={conversionProfile}
            onProfileClick={handleProfileClick}
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>

      {/* Profile Info */}
      {showProfile && conversionProfile && (
        <ProfileInfo
          handleProfileClick={handleProfileClick}
          person={conversionProfile}
        />
      )}
    </div>
  );
}

// Message Board Component
function MessageBoard({ messages, conversionProfile, onProfileClick }) {
  return (
    <>
      <UserProfileCard
        person={conversionProfile}
        onUserClick={onProfileClick}
        hoverBg={false}
        className="w-fit pb-5"
      />
      <ChatMessages messages={messages} />
      <MessageInput />
    </>
  );
}

MessageBoard.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  conversionProfile: PropTypes.object.isRequired,
};
