import { useEffect, useRef } from "react";

export function useOutSideClick(handler, listenCapturing = true) {
    const ref = useRef();
    useEffect(function () {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) handler();
        }

        document.addEventListener("click", handleClick, listenCapturing); // true params => listen to event at the capturing phase, not the bubbling
        return () => document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler]);
    return ref;
}