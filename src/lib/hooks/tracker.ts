import { Ref, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ESGIAnalytics } from "../Analytics";
import { useThrottle } from "./debounce";

interface TrackerParams {
    tag: string; // to register for backend app
    event: "click";
}

export function useTracker<T>({ tag, event }: TrackerParams): Ref<T> {
    const ref = useRef<null | Element>(null);

    const callback = () => {
        ESGIAnalytics.handleActiveUser();
        console.log(`Event type : ${event}, tag : ${tag}`);
    };

    useEffect(() => {
        switch (event) {
            case "click": {
                const element = ref.current;


                if (element) {
                    element.addEventListener("click", callback);
                }

                return () => {
                    element && element.removeEventListener("click", callback);
                };
            }
            default:
                break;
        }
    }, [ref.current]);

    return ref as Ref<T>;
}

export function useMouseTracker<T>(): Ref<T> {
    const [mousePositions, setMousePositions] = useState<
        { x: number; y: number }[]
    >([]);
    const ref = useRef<null | HTMLDivElement>(null);

    const handleMouseMove = (event: MouseEvent) => {
        ESGIAnalytics.handleActiveUser();
        setMousePositions((d) => [
            ...d,
            {
                x: event.clientX,
                y: event.clientY,
                applicationId: ESGIAnalytics.getAppId(),
                timestamp: new Date().getTime(),
                resolution: ESGIAnalytics.getResolutions(),
                sessionId: ESGIAnalytics.getSessionId(),
            },
        ]);
    };

    const throttledPositions = useThrottle(mousePositions, 2000);

    useEffect(() => {
        const element = ref.current;

        if (element) {
            element.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [ref.current]);

    useEffect(() => {
        console.log(mousePositions);
        setMousePositions([]);
    }, [throttledPositions]);

    return ref as Ref<T>;
}

export const useRouterMiddleware = () => {
    const location = useLocation();

    useEffect(() => {
        ESGIAnalytics.handleActiveUser();
        console.log("Current route:", location.pathname);
    }, [location]);
};
