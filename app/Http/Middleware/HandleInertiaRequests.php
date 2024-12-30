<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    private function activeSubscription()
    {
        $activeSubscription = Auth::user() ? Auth::user()->lastActiveSubscription : null;

        if(!$activeSubscription) {
            return null;
        } else if(Carbon::parse($activeSubscription->expires_at)->isPast()) {
            return null;
        }

        $remainingDays = Carbon::parse($activeSubscription->expires_at)->diffInDays(Carbon::now());
        $lastDays = Carbon::parse($activeSubscription->updated_at)->addMonth($activeSubscription->subscriptionPlan->active_period_in_months);
        $activeDays = Carbon::parse($activeSubscription->updated_at)->diffInDays($lastDays);
        
        return [
            'name' => $activeSubscription->subscriptionPlan->name,
            'remainingDays' => $remainingDays,
            'activeDays' => $activeDays,
        ];
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'activeSubscription' => $this->activeSubscription(),
            ],
        ];
    }
}
