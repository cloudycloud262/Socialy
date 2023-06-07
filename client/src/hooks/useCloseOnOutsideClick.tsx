import { useEffect, RefObject } from "react";

const useCloseOnOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  func: Function
) => {
  useEffect(() => {
    const el = ({ target }: MouseEvent): void => {
      const eventTarget = target as Node;
      if (ref.current && !ref.current.contains(eventTarget)) {
        func();
      }
    };
    document.body.addEventListener("click", el);
    return () => {
      document.body.addEventListener("click", el);
    };
  }, []);
};

export default useCloseOnOutsideClick;
