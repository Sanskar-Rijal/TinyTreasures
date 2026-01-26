import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutSideClick } from "../hooks/useOutSideClick";

// function Modal({ children, onClose }) {
//   return createPortal(
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(255,255,255,0.1)] backdrop-blur-[4px] transition-all duration-300">
//       <div className="relative mx-5 w-full max-w-3xl rounded-[9px] bg-white px-6 pt-15 shadow-[0_2.4rem_3.2rem_rgba(0,0,0,0.12)] transition-all sm:px-10">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 rounded-[5px] p-1.5 transition-all hover:bg-[#f3f4f6]"
//         >
//           <HiXMark className="h-6 w-6 text-[#6b7280]" />
//         </button>

//         <div className="w-full">{children}</div>
//       </div>
//     </div>,
//     document.body,
//   );
// }

//we will be using compound component so we will follow 4 steps here,
//1)Create a context
//2)Create a parent Component
//3)Create child components that will help parent component to implement the common task
//4)Add the child component as properties to the parent component
const ModalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  //handler function
  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      <span>{children}</span>
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);
  //Adding onClick event to the modal so that it can open the modal
  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutSideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(255,255,255,0.1)] backdrop-blur-[4px] transition-all duration-300">
      <div
        ref={ref}
        className="relative mx-5 w-full max-w-3xl rounded-[9px] bg-white px-6 pt-15 shadow-[0_2.4rem_3.2rem_rgba(0,0,0,0.12)] transition-all sm:px-10"
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 rounded-[5px] p-1.5 transition-all hover:bg-[#f3f4f6]"
        >
          <HiXMark className="h-6 w-6 text-[#6b7280]" />
        </button>

        <div className="w-full">
          {cloneElement(children, {
            onClose: close,
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
