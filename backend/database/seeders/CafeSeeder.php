<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cafe;

class CafeSeeder extends Seeder
{
    public function run(): void
    {
        Cafe::create([
            'category_id' => 1,
            'name' => 'Kopi Kenangan',
            'address' => 'Jakarta Barat',
            'description' => 'Tempat nongkrong nyaman.',
            'latitude' => -6.2012000,
            'longitude' => 106.7821000,
            'opening_hours' => '08:00 - 22:00',
            'price_range' => '20.000 - 50.000',
            'rating' => 4.8,
            'wifi' => true,
            'parking' => true,
            'photo' => null,
        ]);

        Cafe::create([
            'category_id' => 2,
            'name' => 'Janji Jiwa',
            'address' => 'Jakarta Selatan',
            'description' => 'Cocok untuk belajar.',
            'latitude' => -6.2451000,
            'longitude' => 106.7992000,
            'opening_hours' => '09:00 - 23:00',
            'price_range' => '25.000 - 60.000',
            'rating' => 4.7,
            'wifi' => true,
            'parking' => true,
            'photo' => null,
        ]);
    }
}