import { useEffect, useRef } from "react";

export function useOutSideClick(handler, listenCapturing = true) {
  const ref = useRef();

  //when user clicks outside the modal, we want to close it....

  useEffect(
    function () {
      function handleClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      //after the component unmounts, we need to remove the event listener
      return function () {
        document.removeEventListener("click", handleClick);
      };
    },
    [handler, listenCapturing],
  );

  return ref;
}
