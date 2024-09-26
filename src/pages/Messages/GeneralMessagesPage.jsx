import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OutlineSearchInput from "../../components/common/OutlineSearchInput";
import UserProfileCard from "./components/UserProfileCard";
import { mockPeopleData } from "./mockData/people";

export default function GeneralMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [lastConversation, setLastConversation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setLoading(true);
      const filteredPeople = mockPeopleData.filter((person) => {
        const [firstName, lastName] = person.name.split(" ");
        return (
          firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          lastName?.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      });
      setPeople(filteredPeople);
      setTimeout(() => setLoading(false), 200);
    } else {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleUserClick = (person) => {
    navigate(`/messages/${person.conversationId}`);
    setPeople([]);
    setSearchQuery("");
    const conversation = lastConversation.some(
      (lastPerson) => lastPerson.id === person.id,
    );
    if (!conversation)
      return setLastConversation([person, ...lastConversation]);
    setLastConversation(lastConversation);
  };

  return (
    <div className="h-[calc(100dvh-5rem)] w-full">
      <div className="container mx-auto mb-32 flex h-full w-full max-w-[1400px] flex-1 gap-3 p-6 md:mb-40 md:px-0 md:pt-8 3xl:max-w-[1600px]">
        {/* SideBar */}
        <aside className="border-border flex w-[20%] flex-col rounded-2xl border bg-background p-4 shadow-custom-dark2">
          {/* Search input */}
          <OutlineSearchInput
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          />

          {/* People List */}
          {loading ? (
            <LoadingSpinner />
          ) : lastConversation.length > 0 && searchQuery.length < 2 ? (
            <ul className="my-5 flex w-full flex-1 flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin">
              {lastConversation.map((person) => (
                <UserProfileCard
                  key={person.id}
                  person={person}
                  onUserClick={() => handleUserClick(person)}
                />
              ))}
            </ul>
          ) : people.length === 0 ? (
            <NoPeopleFound />
          ) : (
            <ul className="my-5 flex w-full flex-1 flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin">
              {people.map((person) => (
                <UserProfileCard
                  key={person.id}
                  person={person}
                  onUserClick={() => handleUserClick(person)}
                />
              ))}
            </ul>
          )}
        </aside>

        {/* Message board */}
        <Outlet />
      </div>
    </div>
  );
}

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex h-full w-full flex-1 items-center justify-center">
    <Spinner size="md" />
  </div>
);

// No People Found Component
const NoPeopleFound = () => (
  <div className="flex w-full flex-1 items-center justify-center font-normal text-textSecondary">
    No people found
  </div>
);
