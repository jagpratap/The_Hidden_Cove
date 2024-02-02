import { useEffect, useRef } from "react";

export function useModalClose(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    // Close modal on clicking outside
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    // Close modal on pressing escape
    function handleEscape(e) {
      if (e.keyCode === 27) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    document.addEventListener("keydown", handleEscape, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
      document.removeEventListener("keydown", handleEscape, listenCapturing);
    }
  }, [handler, listenCapturing]);

  return ref;
}
