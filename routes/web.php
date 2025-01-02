<?php

use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use App\Http\Controllers\Admin\VoucherController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\SubscriptionController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\User\VoucherController as UserVoucherController;
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
// Midtrans Route
Route::post('/midtrans/notification', [TransactionController::class, 'midtransCallback'])->name('midtrans.notification');

Route::redirect('/', '/login');

Route::middleware('auth', 'role:user')->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/movie/{movie:slug}', [MovieController::class, 'watch'])->name('movie.watch')->middleware('checkUserSubscription:true');

    // Subscription
    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->middleware('checkUserSubscription:false')->name('subscriptions.index');
    Route::get('/subscriptions/redeem', [SubscriptionController::class, 'redeem'])->middleware('checkUserSubscription:false')->name('subscriptions.redeem');
    Route::post('/subcscriptions/{subscriptionPlan}/user-subscribe/', [SubscriptionController::class, 'subscribe'])->name('subscriptions.userSubscribe');

    // Transaction
    Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
    Route::post('/subscriptions/{transaction}/transaction/', [TransactionController::class, 'pay'])->middleware('checkUserSubscription:false')->name('subscriptions.pay');

    // Voucher
    Route::post('/voucher/redeem', [UserVoucherController::class, 'redeem'])->name('voucher.redeem');
});

Route::middleware('auth', 'role:admin')->prefix('admin')->name('admin.dashboard.')->group(function () {
    Route::put('/movie/{movieId}/restore', [AdminMovieController::class, 'restore'])->name('movie.restore');
    Route::resource('voucher', VoucherController::class);
    Route::resource('movie', AdminMovieController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
