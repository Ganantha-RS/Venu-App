<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UmkmProfile extends Model
{
    protected $fillable = [
        'user_id', 'business_name', 'description', 'category',
        'location', 'price_min', 'price_max', 'target_audience', 'logo',
    ];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function applications(): HasMany { return $this->hasMany(EventApplication::class, 'umkm_id'); }
}
