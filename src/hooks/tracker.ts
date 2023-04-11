import { LegacyRef, useState } from "react";
import { useEffect, useRef, Ref } from "react";

interface TrackerParams {
    tag: string; // to register for backend app
    event: "click";
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

export function useMouseTracker<T>(): Ref<T> {

    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;

        function handleMouseMove(event: any) {
            // call backend
        }

        if (element) {
            element.addEventListener("mousemove", handleMouseMove);
        }
        // Ajouter un écouteur d'événement pour suivre la souris

        // Retirer l'écouteur d'événement lorsque le composant est démonté
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [ref.current]);

  return ref as Ref<T>;
}
