import { useEffect, useRef, useState } from "react";
import OpenButton from "./OpenButton";
import { FaCross } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import ChatHeader from "./ChatHeader";
import MessageBody from "./MessageBody";
import Button from "../../ui/Button";
import InputSend from "./InputSend";
import useChat from "../../hooks/useChat";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [message, setMessage] = useState([
    {
      id: "1",
      text: "Hi, I'm April, your friendly shopping assistant at TinyTreasures! (Just thought I'd say hello and let you know I'm here to help you find the best treasures 😊)",
      isAi: true,
      timeStamp: new Date(),
    },
  ]);

  //from useChat hook
  const { sendMessage, isLoading } = useChat();

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function onSend() {
    if (!inputValue.trim()) return; //Don't send empty messages

    //1) Add user messages to the chat
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isAi: false,
      timeStamp: new Date(),
    };
    setMessage((prev) => [...prev, userMessage]);
    //clear the input field
    setInputValue("");

    //2) Send the message to the backend and get response from April
    const payload = {
      question: inputValue,
    };
    sendMessage(payload, {
      onSuccess: (data) => {
        //add response from April to the chat
        const aprilMessage = {
          id: (Date.now() + 1).toString(),
          text: data.message,
          isAi: true,
          timeStamp: new Date(),
        };
        setMessage((prev) => [...prev, aprilMessage]);
      },
    });
  }
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
      //call send message function
      onSend();
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
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="space-y-7 p-4">
              <MessageBody message={message} />
              <div ref={messageEndRef} /> {/* scroll anchor */}
            </div>
            {/* typing indicator while waiting for April */}
            {isLoading && (
              <div className="flex items-end gap-1 px-2 py-1 text-sm text-gray-400">
                <span>April is typing</span>
                <span className="animate-bounce">...</span>
              </div>
            )}
          </div>
          {/* now we will add input field and send button  */}
          <InputSend
            inputValue={inputValue}
            handleKeyPress={handleKeyPress}
            onChange={onChange}
            isLoading={isLoading}
            onSend={onSend}
          />
        </div>
      </div>
    </>
  );
}

export default ChatBot;
