import api from "../../services/api";

// GET /v1/events — dipakai untuk section "Event Terdekat" di Beranda & halaman Event Discovery
export function getEvents(params = {}) {
  return api.get("/events", { params }).then((res) => res.data);
}

// GET /v1/events/{slug} — detail event
export function getEventBySlug(slug) {
  return api.get(`/events/${slug}`).then((res) => res.data);
}
