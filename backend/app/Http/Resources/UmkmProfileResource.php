<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UmkmProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'business_name' => $this->business_name,
            'products' => $this->products,
            'description' => $this->description,
            'category' => $this->category,
            'location' => $this->location,
            'price_min' => $this->price_min,
            'price_max' => $this->price_max,
            'target_audience' => $this->target_audience,
            'logo' => $this->logo,
        ];
    }
}