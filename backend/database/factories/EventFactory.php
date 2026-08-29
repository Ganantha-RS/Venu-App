<?php

// database/factories/EventFactory.php
namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EventFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['Makanan', 'Minuman', 'Kerajinan', 'Aksesoris', 'Fashion'];
        $locations = ['Jakarta Timur', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Pusat', 'Jakarta Utara'];
        $name = fake()->randomElement([
            'Festival Budaya', 'Market Day', 'Expo Karya Siswa', 'School Entrepreneurship Expo', 'Bazar Ramadhan',
        ]) . ' ' . fake()->year();

        return [
            'school_id' => School::factory(),
            'name' => $name,
            'slug' => Str::slug($name) . '-' . fake()->unique()->numberBetween(1, 9999),
            'description' => fake()->sentence(15),
            'category' => fake()->randomElement($categories),
            'event_date' => fake()->dateTimeBetween('+1 week', '+2 months'),
            'location' => fake()->randomElement($locations),
            'target_visitors' => fake()->numberBetween(200, 1000),
            'booth_capacity' => fake()->numberBetween(4, 12),
            'booth_price' => fake()->randomElement([50000, 100000, 150000, 200000]),
            'status' => 'published', // sengaja default published biar langsung muncul di discovery
        ];
    }
}
