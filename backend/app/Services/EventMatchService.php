<?php

namespace App\Services;

use App\Models\{Event, UmkmProfile};

class EventMatchService
{
    public function score(Event $event, UmkmProfile $umkm): array
    {
        $reasons = [];
        $total = 0;

        // 1. Kategori — 30%
        if (strtolower($event->category) === strtolower($umkm->category)) {
            $total += 30;
            $reasons[] = 'Kategori produk sesuai';
        }

        // 2. Target Audience — 30%
        $audienceScore = $this->audienceOverlap($umkm->target_audience, $event->description . ' ' . $event->category);
        $total += $audienceScore;
        if ($audienceScore >= 15) {
            $reasons[] = 'Target audiens sesuai';
        }

        // 3. Lokasi — 20%
        if ($this->locationMatch($umkm->location, $event->location)) {
            $total += 20;
            $reasons[] = 'Lokasi sesuai';
        }

        // 4. Harga — 20%
        if ($this->priceInRange($event->booth_price, $umkm->price_min, $umkm->price_max)) {
            $total += 20;
            $reasons[] = 'Harga sesuai dengan budget booth';
        }

        return [
            'score' => min(100, (int) round($total)),
            'reasons' => $reasons,
        ];
    }

    private function audienceOverlap(?string $umkmAudience, string $eventText): int
    {
        if (!$umkmAudience) return 0;

        $keywords = array_filter(array_map('trim', explode(',', strtolower($umkmAudience))));
        if (empty($keywords)) return 0;

        $eventText = strtolower($eventText);
        $hits = 0;
        foreach ($keywords as $kw) {
            if ($kw !== '' && str_contains($eventText, $kw)) {
                $hits++;
            }
        }

        return (int) round(($hits / count($keywords)) * 30);
    }

    private function locationMatch(string $umkmLocation, string $eventLocation): bool
    {
        return str_contains(strtolower($eventLocation), strtolower($umkmLocation))
            || str_contains(strtolower($umkmLocation), strtolower($eventLocation));
    }

    private function priceInRange(int $boothPrice, ?int $min, ?int $max): bool
    {
        if ($min === null || $max === null) return false;
        return $boothPrice >= $min && $boothPrice <= $max;
    }
}
