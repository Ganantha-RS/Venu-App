<?php

namespace App\Http\Controllers\Api\Umkm;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Models\Event;
use App\Models\EventApplication;
use App\Services\AiMatchService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MatchController extends Controller
{
    use ApiResponse;

    public function __construct(private AiMatchService $matchService) {}

    public function index(Request $request)
    {
        $umkm = Auth::user()->umkmProfile;
        if (!$umkm) {
            return $this->error('Profil UMKM belum dilengkapi.', [], 422);
        }

        $events = Event::where('status', 'published')
            ->with('school')
            ->when($request->filled('category'), fn($q) => $q->where('category', $request->category))
            ->when($request->filled('location'), fn($q) => $q->where('location', 'like', "%{$request->location}%"))
            ->when($request->filled('max_booth_price'), fn($q) => $q->where('booth_price', '<=', $request->max_booth_price))
            ->get();

        $appliedEventIds = EventApplication::where('umkm_id', $umkm->id)
            ->pluck('status', 'event_id');

        $matches = $events->map(function ($event) use ($umkm, $appliedEventIds) {
            $result = $this->matchService->score($event, $umkm);

            return [
                'event_id'        => $event->id,
                'slug'            => $event->slug,
                'name'            => $event->name,
                'description'     => $event->description,
                'category'        => $event->category,
                'categories'      => $event->categories ?: [$event->category],
                'target_audience' => $event->target_audience,
                'event_date'      => $event->event_date->format('Y-m-d'),
                'location'        => $event->location,
                'booth_capacity'  => $event->booth_capacity,
                'booth_price'     => $event->booth_price,
                'school_name'     => $event->school->school_name,
                'match_score'     => $result['score'],
                'match_reason'    => $result['reasons'],
                'application_status' => $appliedEventIds[$event->id] ?? null,
            ];
        })->sortByDesc('match_score')->values();

        if ($request->filled('min_score')) {
            $matches = $matches->filter(fn($m) => $m['match_score'] >= (int) $request->min_score)->values();
        }
        if ($request->filled('limit')) {
            $matches = $matches->take(min((int) $request->limit, 100))->values();
        }

        return $this->success('Rekomendasi event untuk kamu.', $matches);
    }
}
