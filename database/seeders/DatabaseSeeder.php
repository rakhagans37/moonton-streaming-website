<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleTableSeeder; // Ensure this class exists in the specified namespace
use Database\Seeders\UserTableSeeder;
use Database\Seeders\SubscriptionsPlanSeeder;
use Database\Seeders\MovieTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(RoleTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(SubscriptionsPlanSeeder::class);
        $this->call(MovieTableSeeder::class);
    }
}
