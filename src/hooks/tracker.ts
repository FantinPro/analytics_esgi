import { LegacyRef } from "react";
import { useEffect, useRef } from "react";

interface TrackerParams {
  tag: string; // to register for backend app
  event: 'click';
}

export function useTracker({ tag, event }: TrackerParams): LegacyRef<HTMLDivElement> {

  const ref = useRef<null | HTMLDivElement>(null);

  switch(event) {
    case 'click': {
      useEffect(() => {
        const element = ref.current;

        const callback = () => {
          console.log(`Event type : ${event}, tag : ${tag}`)
        }
      
        if (element) {
          element.addEventListener('click', callback);
        }

        return () => {
          element && element.removeEventListener('click', callback);
        }
      }, [ref.current]);
    }
    default:
      break;
  }

  return ref;
}