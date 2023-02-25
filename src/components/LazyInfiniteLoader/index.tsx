import React, { ReactElement, useEffect, useRef } from "react";
import "./style.css";

interface Props {
  onPageEnd: () => void;
  children: ReactElement[];
  finished: boolean;
}

// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };
};

const LazyInfiniteLoader = ({ onPageEnd, children, finished }: Props) => {
  const parent = useRef<HTMLDivElement | null>(null);
  const endMarker = useRef<HTMLDivElement | null>(null);

  const scrollEvent = debounce(() => {
    const reachedEnd =
      document.documentElement.scrollTop + window.innerHeight >=
      (endMarker.current?.offsetTop || 0);

    if (reachedEnd) onPageEnd();
  }, 400);

  useEffect(() => {
    scrollEvent();
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [children]);

  return (
    <div ref={parent}>
      {children}
      <div ref={endMarker} className="end-marker">
        {finished && <div>🎉 No more to load</div>}
      </div>
    </div>
  );
};

export default LazyInfiniteLoader;
