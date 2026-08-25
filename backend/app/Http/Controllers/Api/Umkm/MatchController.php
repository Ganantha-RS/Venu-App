<?php

// app/Http/Controllers/Api/Umkm/MatchController.php
namespace App\Http\Controllers\Api\Umkm;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Models\Event;
use App\Services\EventMatchService;
use Illuminate\Support\Facades\Auth;

class MatchController extends Controller
{
    use ApiResponse;

    public function __construct(private EventMatchService $matchService) {}

    public function index()
    {
        $umkm = Auth::user()->umkmProfile; // pastikan relasi ini ada di User model

        $events = Event::where('status', 'published')->get();

        $matches = $events->map(function ($event) use ($umkm) {
            $result = $this->matchService->score($event, $umkm);
            return [
                'event_id' => $event->id,
                'event_name' => $event->name,
                'match_score' => $result['score'],
                'match_reason' => $result['reasons'],
            ];
        })->sortByDesc('match_score')->values();

        return $this->success('Rekomendasi event untuk kamu.', $matches);
    }
}
