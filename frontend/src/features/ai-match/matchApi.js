import api from "../../services/api";

export function getUmkmMatches() {
  return api.get("/umkm/matches").then((res) => res.data.data);
}

export function getSchoolEvents() {
  return api.get("/school/events").then((res) => res.data.data);
}

export function getSchoolMatches(eventId) {
  return api.get(`/school/events/${eventId}/matches`).then((res) => res.data.data);
}

export function applyToEvent(eventId) {
  return api.post(`/events/${eventId}/applications`).then((res) => res.data);
}