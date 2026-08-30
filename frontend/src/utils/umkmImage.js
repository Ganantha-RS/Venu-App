// utils/umkmImage.js — pool foto per kategori, deterministic pick
// Dipakai di AiMatchSchool (Sekolah→UMKM) & AiMatchUmkm (UMKM→Event)

export const UMKM_IMAGE_POOL = {
  Makanan: [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  ],
  Minuman: [
    "https://images.unsplash.com/photo-1544787219-7f47cc556763?w=400&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    "https://images.unsplash.com/photo-1525385133512-3985c1d28d4a?w=400&q=80",
    "https://images.unsplash.com/photo-1510626176961-4b57d4fb594b?w=400&q=80",
  ],
  Kerajinan: [
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80",
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80",
    "https://images.unsplash.com/photo-1493106641515-6b563a1d82fe?w=400&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
  ],
  Aksesoris: [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
  ],
};

export const EVENT_IMAGE_POOL = {
  Makanan: [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
  ],
  Minuman: [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    "https://images.unsplash.com/photo-1544787219-7f47cc556763?w=400&q=80",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&q=80",
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80",
  ],
  Kerajinan: [
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80",
    "https://images.unsplash.com/photo-1493106641515-6b563a1d82fe?w=400&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80",
  ],
  Aksesoris: [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400&q=80",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80",
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
  ],
};

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

// prioritas: logo (upload UMKM) -> pool kategori -> fallback Makanan
export function getUmkmImage(umkm) {
  if (!umkm) return UMKM_IMAGE_POOL.Makanan[0];
  if (umkm.logo) return umkm.logo;
  const pool = UMKM_IMAGE_POOL[umkm.category] || UMKM_IMAGE_POOL.Makanan;
  const key = `${umkm.business_name || ""}#${umkm.umkm_id ?? umkm.id ?? ""}`;
  const idx = hashStr(key) % pool.length;
  return pool[idx];
}

// Event: deterministic pick by category + event_id/slug/name
export function getEventImage(event) {
  if (!event) return EVENT_IMAGE_POOL.Makanan[0];
  // event bisa punya categories array atau category string
  const cat = event.category || (event.categories && event.categories[0]) || "Makanan";
  const pool = EVENT_IMAGE_POOL[cat] || EVENT_IMAGE_POOL.Makanan;
  const key = `${event.name || ""}#${event.event_id ?? event.id ?? event.slug ?? ""}`;
  const idx = hashStr(key) % pool.length;
  return pool[idx];
}
