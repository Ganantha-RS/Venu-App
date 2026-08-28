<?php

// app/Http/Controllers/Api/School/MatchController.php
// app/Http/Controllers/Api/School/MatchController.php
namespace App\Http\Controllers\Api\School;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Models\{Event, EventApplication, UmkmProfile};
use App\Services\EventMatchService;

class MatchController extends Controller
{
    use ApiResponse;

    public function __construct(private EventMatchService $matchService) {}

    public function index(Event $event)
    {
        $this->authorize('manageApplications', $event);

        $umkms = UmkmProfile::all();

        $appliedUmkmIds = EventApplication::where('event_id', $event->id)
            ->pluck('status', 'umkm_id');

        $matches = $umkms->map(function ($umkm) use ($event, $appliedUmkmIds) {
            $result = $this->matchService->score($event, $umkm);

            return [
                'umkm_id' => $umkm->id,
                'business_name' => $umkm->business_name,
                'description' => $umkm->description,
                'category' => $umkm->category,
                'location' => $umkm->location,
                'price_min' => $umkm->price_min,
                'price_max' => $umkm->price_max,
                'target_audience' => $umkm->target_audience,
                'match_score' => $result['score'],
                'match_reason' => $result['reasons'],
                'application_status' => $appliedUmkmIds[$umkm->id] ?? null,
            ];
        })->sortByDesc('match_score')->values();

        return $this->success('Rekomendasi UMKM untuk event ini.', $matches);
    }
}
