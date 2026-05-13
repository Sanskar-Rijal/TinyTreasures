import { useEffect, useRef, useState } from "react";
import OpenButton from "./OpenButton";
import { FaCross } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import ChatHeader from "./ChatHeader";
import MessageBody from "./MessageBody";
import Button from "../../ui/Button";
import InputSend from "./InputSend";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  const [message] = useState([
    {
      id: "1",
      text: "Hi! I'm TinyTreasure AI assistant. How can I help you today?",
      isAi: true,
      timeStamp: new Date(),
    },
    {
      id: "2",
      text: "Hi! I have a question about one of the products.",
      isAi: false,
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

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      // Handle send message logic here
      e.preventDefault();
    }
  }
  function onChange(event) {
    setInputValue(event.target.value);
  }

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
        <div className="flex h-130 w-76 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:h-[600px] sm:w-[380px]">
          {/* header  */}
          <ChatHeader handleOpen={handleOpen} />
          {/* message body  */}
          <div className="flex-1 space-y-7 overflow-y-auto bg-gray-50 p-4">
            <MessageBody message={message} />
          </div>
          {/* now we will add input field and send button  */}
          <InputSend
            inputValue={inputValue}
            handleKeyPress={handleKeyPress}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}

export default ChatBot;
