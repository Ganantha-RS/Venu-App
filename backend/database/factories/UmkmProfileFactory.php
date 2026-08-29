<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UmkmProfileFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['Makanan', 'Minuman', 'Kerajinan', 'Aksesoris', 'Fashion'];
        $locations = ['Jakarta Timur', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Pusat', 'Jakarta Utara'];
        $audiences = ['Pelajar', 'Umum', 'Keluarga', 'Remaja'];

        $priceMin = fake()->numberBetween(10000, 50000);

        return [
            'user_id' => User::factory()->state(['role' => 'umkm']),
            'business_name' => fake()->unique()->company(),
            'description' => fake()->sentence(10),
            'category' => fake()->randomElement($categories),
            'location' => fake()->randomElement($locations),
            'price_min' => $priceMin,
            'price_max' => $priceMin + fake()->numberBetween(10000, 40000),
            'target_audience' => fake()->randomElement($audiences),
        ];
    }
}
