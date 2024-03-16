import { useEffect, useRef } from "react";

export const useCloseClickOutside = (handler, isCapturing = true) => {
  const ref = useRef();
  useEffect(() => {
    const handleCloseModal = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleCloseModal, isCapturing);

    return () => {
      document.removeEventListener("click", handleCloseModal, isCapturing);
    };
  }, [handler, isCapturing]);

  return ref;
};
