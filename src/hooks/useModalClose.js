import { useEffect, useRef } from "react";

export function useModalClose(handler) {
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

    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleEscape, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleEscape, true);
    }
  }, [handler]);

  return ref;
}
