<?php

namespace Database\Seeders;

use App\Models\{Event, School, UmkmProfile, User};
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $schoolUser = User::factory()->create([
            'name' => 'Sekolah Testing',
            'email' => 'school@venu.test',
            'role' => 'school',
        ]);
        $school = School::factory()->create([
            'user_id' => $schoolUser->id,
            'school_name' => 'SMKN 26 Jakarta',
        ]);

        $umkmUser = User::factory()->create([
            'name' => 'UMKM Testing',
            'email' => 'umkm@venu.test',
            'role' => 'umkm',
        ]);
        UmkmProfile::factory()->create([
            'user_id' => $umkmUser->id,
            'business_name' => 'Kreasi Lokal',
            'category' => 'Kerajinan',
            'location' => 'Jakarta Timur',
        ]);

        School::factory(4)->create();
        UmkmProfile::factory(15)->create();
        Event::factory(8)->create();

        Event::factory()->create([
            'school_id' => $school->id,
            'name' => 'Event Draft Contoh',
            'status' => 'draft',
        ]);
    }
}
