"use client";
import * as React from "react";

export function useScrollPosition() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const onChange = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onChange, { passive: true });
    onChange();

    return () => window.removeEventListener("scroll", onChange);
  }, []);

  return scrollY;
}
