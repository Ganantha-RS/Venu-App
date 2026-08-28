<?php

// app/Http/Controllers/Api/Umkm/MatchController.php
// app/Http/Controllers/Api/Umkm/MatchController.php
namespace App\Http\Controllers\Api\Umkm;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Models\{Event, EventApplication};
use App\Services\EventMatchService;
use Illuminate\Support\Facades\Auth;

class MatchController extends Controller
{
    use ApiResponse;

    public function __construct(private EventMatchService $matchService) {}

    public function index()
    {
        $umkm = Auth::user()->umkmProfile;

        $events = Event::where('status', 'published')->with('school')->get();

        $appliedEventIds = EventApplication::where('umkm_id', $umkm->id)
            ->pluck('status', 'event_id'); // [event_id => status]

        $matches = $events->map(function ($event) use ($umkm, $appliedEventIds) {
            $result = $this->matchService->score($event, $umkm);

            return [
                'event_id' => $event->id,
                'slug' => $event->slug,
                'name' => $event->name,
                'category' => $event->category,
                'event_date' => $event->event_date->format('Y-m-d'),
                'location' => $event->location,
                'booth_capacity' => $event->booth_capacity,
                'booth_price' => $event->booth_price,
                'school_name' => $event->school->school_name,
                'match_score' => $result['score'],
                'match_reason' => $result['reasons'],
                'application_status' => $appliedEventIds[$event->id] ?? null,
            ];
        })->sortByDesc('match_score')->values();

        return $this->success('Rekomendasi event untuk kamu.', $matches);
    }
}
