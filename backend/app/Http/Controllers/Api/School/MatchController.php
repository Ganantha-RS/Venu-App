<?php

// app/Http/Controllers/Api/School/MatchController.php
namespace App\Http\Controllers\Api\School;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Models\{Event, UmkmProfile};
use App\Services\EventMatchService;

class MatchController extends Controller
{
    use ApiResponse;

    public function __construct(private EventMatchService $matchService) {}

    public function index(Event $event)
    {
        $this->authorize('manageApplications', $event); // reuse policy yg sama (ownership)

        $umkms = UmkmProfile::all();

        $matches = $umkms->map(function ($umkm) use ($event) {
            $result = $this->matchService->score($event, $umkm);
            return [
                'umkm_id' => $umkm->id,
                'business_name' => $umkm->business_name,
                'match_score' => $result['score'],
                'match_reason' => $result['reasons'],
            ];
        })->sortByDesc('match_score')->values();

        return $this->success('Rekomendasi UMKM untuk event ini.', $matches);
    }
}
