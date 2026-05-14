import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatTime } from "../../utils/Helpers";
import { PiRobotDuotone } from "react-icons/pi";

function MessageBody({ message }) {
  //getting userdetails from redux
  const user = useSelector((state) => state.user.user);
  return message.map((msg) => (
    <div
      key={msg.id}
      className={`flex gap-2 ${msg.isAi ? "justify-start" : "justify-end"}`}
    >
      {/* chatbot profile */}
      {msg.isAi && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600">
          <PiRobotDuotone className="h-5 w-5 text-white" />
        </div>
      )}
      {/* display message text */}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.isAi ? "border border-gray-200 bg-white/80 text-gray-900" : "bg-purple-600 text-white"}`}
      >
        <p className="text-sm leading-relaxed">{msg.text}</p>
        <p
          className={`mt-1 text-xs ${msg.isAi ? "text-gray-500" : "text-purple-200"}`}
        >
          {formatTime(msg.timeStamp)}
        </p>
      </div>
      <div>
        {!msg.isAi && (
          <>
            {/* Display user profile is logged in  */}
            {user ? (
              <div>
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src={user.avatar.url}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              // show normal profile icon
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300">
                <FaRegUserCircle className="h-5 w-5 text-gray-700" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  ));
}

export default MessageBody;
