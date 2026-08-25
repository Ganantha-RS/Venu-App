<?php
// app/Services/AnalyticsService.php
namespace App\Services;

use App\Models\Event;

class AnalyticsService
{
    public function forEvent(Event $event): array
    {
        $applications = $event->applications();

        $total = (clone $applications)->count();
        $approved = (clone $applications)->where('status', 'approved')->count();
        $rejected = (clone $applications)->where('status', 'rejected')->count();
        $pending = (clone $applications)->where('status', 'pending')->count();

        $boothsFilled = $event->booths()->where('status', 'occupied')->count();
        $boothCapacity = $event->booth_capacity;

        $occupancyRate = $boothCapacity > 0
            ? round(($boothsFilled / $boothCapacity) * 100, 2)
            : 0;

        $acceptanceRate = $total > 0
            ? round(($approved / $total) * 100, 2)
            : 0;

        $avgMatchScore = (clone $applications)->whereNotNull('match_score')->avg('match_score');

        return [
            'total_applications' => $total,
            'approved_applications' => $approved,
            'rejected_applications' => $rejected,
            'pending_applications' => $pending,
            'booths_filled' => $boothsFilled,
            'booth_capacity' => $boothCapacity,
            'occupancy_rate' => $occupancyRate,
            'acceptance_rate' => $acceptanceRate,
            'average_match_score' => $avgMatchScore !== null ? round($avgMatchScore, 2) : null,
        ];
    }
}
