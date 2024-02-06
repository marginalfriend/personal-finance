import { MutableRefObject, useEffect, useState } from "react";

export function useIsVisible(ref: MutableRefObject<null>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    if (ref.current !== null) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
