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

        // Bookmark
        $this->app->bind(
            \App\Services\Interface\BookmarkInterface::class,
            \App\Services\BookmarkService::class
        );

        // Movie
        $this->app->bind(
            \App\Services\Interface\MovieInterface::class,
            \App\Services\MovieService::class
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
