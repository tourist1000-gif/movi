import { useEffect, type RefObject } from "react";

export function useHorizontalWheelScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function handleWheel(event: WheelEvent) {
      const hasHorizontalScroll = element!.scrollWidth > element!.clientWidth;
      if (!hasHorizontalScroll) return;

      const isVerticalScroll = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      if (!isVerticalScroll && event.deltaX !== 0) return;

      event.preventDefault();
      element!.scrollLeft += event.deltaY;
    }

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [ref]);
}
