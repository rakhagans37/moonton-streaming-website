<?php

use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use App\Http\Controllers\Admin\VoucherController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\BookmarkController;
use App\Http\Controllers\User\SubscriptionController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MidtransController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\User\VoucherController as UserVoucherController;
use Illuminate\Support\Facades\Route;

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
Route::post('/midtrans/notification', [MidtransController::class, 'midtransCallback'])->name('midtrans.notification');

Route::redirect('/', '/login');

Route::middleware('auth', 'role:user')->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/movie/{movie:slug}', [MovieController::class, 'watch'])->name('movie.watch')->middleware('checkUserSubscription:true');

    // Subscription
    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->middleware('checkUserSubscription:false')->name('subscriptions.index');
    Route::get('/subscriptions/redeem', [SubscriptionController::class, 'redeem'])->middleware('checkUserSubscription:false')->name('subscriptions.redeem');
    Route::post('/subscriptions/{subscriptionPlan}/subscribe/', [SubscriptionController::class, 'subscribe'])->middleware('checkUserSubscription:false')->name('subscriptions.userSubscribe');

    // Transaction
    Route::get('/transaction/{transaction}/detail/', [TransactionController::class, 'detail'])
        ->middleware('checkUserTransaction', 'checkUserSubscription:false')
        ->name('transaction.detail');
    Route::post('/transaction/{transaction}/cancel', [MidtransController::class, 'cancel'])->middleware('checkUserTransaction')->name('transaction.cancel');
    Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
    Route::post('/transaction/{transaction}/pay/', [TransactionController::class, 'pay'])->middleware('checkUserSubscription:false')->name('transaction.pay');

    // Voucher
    Route::post('/voucher/redeem', [UserVoucherController::class, 'redeem'])->name('voucher.redeem');
    Route::post('/voucher/{transaction}/apply', [UserVoucherController::class, 'apply'])->name('voucher.apply');

    // Bookmark
    Route::get('/bookmark', [BookmarkController::class, 'index'])->name('bookmark.index');
    Route::post('/bookmark/{movie}', [BookmarkController::class, 'store'])->name('bookmark.store');
    Route::delete('/bookmark/{movie}', [BookmarkController::class, 'destroy'])->name('bookmark.destroy');
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
