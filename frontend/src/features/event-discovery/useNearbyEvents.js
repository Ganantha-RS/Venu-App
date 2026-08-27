import { useEffect, useState } from "react";
import { getEvents } from "./eventApi";

export function useNearbyEvents(limit = 3) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getEvents({ limit })
      .then((data) => {
        if (!isMounted) return;

        const eventData = data?.data?.data ?? data?.data ?? data;

        setEvents(Array.isArray(eventData) ? eventData : []);
      })
      .catch((err) => {
        console.error("Gagal memuat event terdekat:", err);

        if (isMounted) {
          setEvents([]);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { events, isLoading };
}