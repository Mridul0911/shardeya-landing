"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean; initialValue?: boolean }
) {
  const ref = useRef<T | null>(null);
  const { once = true, initialValue = false, ...observerOptions } =
    options ?? {};
  const [inView, setInView] = useState(initialValue);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) {
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...observerOptions }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return { ref, inView };
}
