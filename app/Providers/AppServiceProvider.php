<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Payment Gateway
        $this->app->bind(
            \App\Services\Interface\PaymentGatewayInterface::class,
            \App\Services\MidtransService::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'error' => session('error'),
                ];
            },
        ]);
    }
}
