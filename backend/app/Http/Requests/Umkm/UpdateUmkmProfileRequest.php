<?php

namespace App\Http\Requests\Umkm;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUmkmProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    // app/Http/Requests/Umkm/UpdateUmkmProfileRequest.php
    public function rules(): array
    {
        return [
    'business_name' => 'required|string|max:255',

    'description' => 'nullable|string',

    'category' => 'required|string|max:100',

    'location' => 'required|string|max:255',

    'price_min' => 'nullable|integer|min:0',

    'price_max' => 'nullable|integer|min:0|gte:price_min',

    'booth_budget_max' => 'nullable|integer|min:0',

    'target_audience' => 'nullable|string|max:255',
];
    }
}
