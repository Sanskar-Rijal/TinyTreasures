import { PiRobotDuotone } from "react-icons/pi";
import { HiXMark } from "react-icons/hi2";

function ChatHeader({ handleOpen }) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <PiRobotDuotone className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-white">TinyTreasures AI (APRIL)</h3>
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
  );
}

export default ChatHeader;
