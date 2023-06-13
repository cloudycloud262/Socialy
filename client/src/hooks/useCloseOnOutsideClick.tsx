import { useEffect, RefObject } from "react";

const useCloseOnOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  func: Function
): void => {
  useEffect(() => {
    const el = ({ target }: MouseEvent): void => {
      const eventTarget = target as HTMLElement;
      if (!ref.current?.contains(eventTarget)) {
        func(eventTarget);
      }
    };
    document.body.addEventListener("click", el);
    return () => {
      document.body.removeEventListener("click", el);
    };
  }, []);
};

export default useCloseOnOutsideClick;
