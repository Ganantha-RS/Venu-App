<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    protected $fillable = ['user_id', 'school_name', 'description', 'address', 'phone', 'logo'];

    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function events(): HasMany { return $this->hasMany(Event::class); }
}
