import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(255,255,255,0.1)] backdrop-blur-[4px] transition-all duration-300">
      <div className="relative mx-5 w-full max-w-3xl rounded-[9px] bg-white px-6 pt-15 shadow-[0_2.4rem_3.2rem_rgba(0,0,0,0.12)] transition-all sm:px-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-[5px] p-1.5 transition-all hover:bg-[#f3f4f6]"
        >
          <HiXMark className="h-6 w-6 text-[#6b7280]" />
        </button>

        <div className="w-full">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
