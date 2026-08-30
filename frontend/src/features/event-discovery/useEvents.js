import { useEffect, useState, useCallback } from "react";
import { getEvents } from "./eventApi";

export function useEvents(initialParams = {}) {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const reload = useCallback(async (nextParams) => {
    const p = nextParams ?? params;
    setIsLoading(true);
    setError(null);
    try {
      const res = await getEvents(p);
      // res = { success, message, data: { data: [...], meta, links } } or array
      const raw = res?.data ?? res;
      const list = Array.isArray(raw) ? raw : raw?.data ?? [];
      setEvents(Array.isArray(list) ? list : []);
      if (raw?.meta) setPagination({ meta: raw.meta, links: raw.links });
      else setPagination(null);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat event.");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => { reload(params); }, [reload, params]);

  return { events, pagination, isLoading, error, params, setParams, reload };
}
