import { FiMessageCircle } from "react-icons/fi";

function OpenButton({ isOpen, handleOpen }) {
  return (
    <button
      onClick={handleOpen}
      className={`group fixed right-6 bottom-6 z-50 transition-all duration-300 ${isOpen ? "scale-0" : `scale-100`} `}
      aria-label="Open Chat"
    >
      {/* Pulse animation ring */}
      <div className="absolute -inset-1 animate-pulse rounded-full bg-purple-600 opacity-75 group-hover:opacity-100"></div>

      {/* chat button */}
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 shadow-lg transition-all duration-300 group-hover:scale-110 hover:bg-purple-700 sm:h-14 sm:w-14">
        <FiMessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
      </div>
      {/* Tooltip */}
      <div className="pointer-events-none absolute right-16 bottom-0 mb-4 rounded-lg bg-gray-900 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
        Chat with AI
        <div className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-900"></div>
      </div>
    </button>
  );
}

export default OpenButton;
