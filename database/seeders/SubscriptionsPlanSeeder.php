<?php

namespace Database\Seeders;

use App\Models\SubscriptionsPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriptionsPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subscriptionPlanBasic = new SubscriptionsPlan();
        $subscriptionPlanBasic->name = 'Basic';
        $subscriptionPlanBasic->price = 50000;
        $subscriptionPlanBasic->active_period_in_months = 1;
        $subscriptionPlanBasic->features = json_encode([
            "HD Quality",
            "Unlimited Movies",
            "No Ads",
        ]);
        $subscriptionPlanBasic->save();


        $subscriptionPlanPremium = new SubscriptionsPlan();
        $subscriptionPlanPremium->name = 'Premium';
        $subscriptionPlanPremium->price = 200000;
        $subscriptionPlanPremium->active_period_in_months = 3;
        $subscriptionPlanPremium->features = json_encode([
            "4K Quality",
            "Unlimited Movies",
            "No Ads",
            "Offline Download",
            "Watch on 4 devices"
        ]);
        $subscriptionPlanPremium->save();
    }
}
