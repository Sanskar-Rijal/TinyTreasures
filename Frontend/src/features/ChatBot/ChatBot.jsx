import { useEffect, useRef, useState } from "react";
import OpenButton from "./OpenButton";
import { FaCross } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { PiRobotDuotone } from "react-icons/pi";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  const [message] = useState([
    {
      id: "1",
      text: "Hi! I'm your PurpleShop AI assistant. How can I help you today?",
      isAi: true,
      timeStamp: new Date(),
    },
  ]);
  //   const [inputValue, setInputValue] = useState("");
  //   const [isTyping, setIsTyping] = useState(false);

  //when new messages are addded we have to scroll to the bottom of the chat window
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <>
      <OpenButton isOpen={isOpen} handleOpen={handleOpen} />
      {/* chat window  */}
      <div
        className={`fixed right-6 bottom-6 z-50 transition-all duration-300 ${
          isOpen ? " scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ transformOrigin: `bottom-right` }}
      >
        <div className="flex h-[600px] w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <PiRobotDuotone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  TinyTreasure Assistant
                </h3>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                  <span className="text-xs text-purple-100">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleOpen}
              className="rounded-full p-2 text-white transition-colors hover:bg-purple-700"
              aria-label="Close chat"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBot;
