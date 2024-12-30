<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\SubscriptionController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/login');

Route::prefix('prototype')->name('prototype.')->group(function () {
    Route::get('/signin', function () {
        return Inertia::render('Prototype/Signin');
    })->name('signin');

    Route::get('/signup', function () {
        return Inertia::render('Prototype/Signup');
    })->name('signup');

    Route::get('/dashboard', function () {
        return Inertia::render('Prototype/Dashboard');
    })->name('dashboard');

    Route::get('/subscriptions', function () {
        return Inertia::render('Prototype/Subscriptions');
    })->name('subscriptions');

    Route::get('/movie/{slug}', function () {
        return Inertia::render('Prototype/Movie/Watch');
    })->name('movie.watch');
});

Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'role:user')->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/movie/{movie:slug}', [MovieController::class, 'watch'])->name('movie.watch');
    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::post('/subcscriptions/{subscriptionPlan}/user-subscribe/', [SubscriptionController::class, 'subscribe'])->name('subscriptions.userSubscribe');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
