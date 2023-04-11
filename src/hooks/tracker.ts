import { useEffect, useRef, Ref, ReactElement } from "react";

interface TrackerParams {
  tag: string; // to register for backend app
  event: 'click';
}

export function useTracker<T>({ tag, event }: TrackerParams): Ref<T> {

  const ref = useRef<null | Element>(null);

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

  return ref as Ref<T>;
}