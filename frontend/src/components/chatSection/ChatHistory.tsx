import { useEffect, useState } from "react";
import { useUserProvider } from "../../helpers/customHooks/userProvider";
import { fetchChat } from "../../services/chat";
import { ChatData, UserChatData } from "../../interfaces";

const ChatHistory = () => {
  const { userData } = useUserProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<object>({});
  const [chatDetail, setChatDetail] = useState<ChatData | null>(null);
  const { email: selectedEmail, name } = userData || {};

  useEffect(() => {
    (async () => {
      if (!selectedEmail) {
        setError((prevError) => ({ ...prevError, err: "No Person Selected" }));
        throw new Error("No email provided");
      }

      try {
        setLoading(true);
        const response = await fetchChat(selectedEmail);
        console.log(response);
        if (!response) {
          throw new Error("No user history response");
        }

        console.log(response);
        setChatDetail(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);

          if (error.name === "NoData") {
            setError((prevError) => ({
              ...prevError,
              err: "No data available",
            }));
          } else {
            setError((prevError) => ({ ...prevError, err: error.message }));
          }
        } else {
          console.log("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedEmail, name, setChatDetail]);

  return (
    <div className="w-full h-5/6 bg-slate-100 border-2 border-slate-400 mb-5 rounded-md">
      {loading ? (
        <h3>Fetching chat...</h3>
      ) : Object.values(error).length || !chatDetail ? (
        <p> {Object.values(error)[0]} </p>
      ) : (
        <div className="flex">
          {chatDetail.users
            .filter(
              (user: UserChatData): boolean => user.email === selectedEmail
            )[0]
            .messages.map((data) => (
              <div className="user1 ml-0">{data}</div>
            ))}
          {chatDetail.users
            .filter(
              (user: UserChatData): boolean => user.email === selectedEmail
            )[0]
            .messages.map((data) => (
              <div className="user2 mr-0">{data}</div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
