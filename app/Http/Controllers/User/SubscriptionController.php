<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionsPlan;
use App\Models\Transaction;
use App\Models\UserSubscriptions;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptionsPlan = SubscriptionsPlan::all();

        return Inertia::render('User/Dashboard/Subscription', [
            'subscriptionsPlan' => $subscriptionsPlan,
            'userSubscription' => null
        ]);
    }

    public function redeem()
    {
        return Inertia::render('User/Dashboard/SubscriptionRedeem');
    }

    public function subscribe(Request $request, SubscriptionsPlan $subscriptionPlan)
    {
        $userSubscription = new UserSubscriptions();
        $userSubscription->user_id = $request->user()->id;
        $userSubscription->subscriptions_plans_id = $subscriptionPlan->id;
        $userSubscription->save();

        $transaction = new Transaction();
        $transaction->user_subscriptions_id = $userSubscription->id;
        $transaction->price = $subscriptionPlan->price;
        $transaction->final_price = $subscriptionPlan->price;
        $transaction->discount = 0;
        // $transaction->expires_at = Carbon::now()->addMonth($subscriptionPlan->active_period_in_months);
        $transaction->payment_status = 'pending';
        $transaction->save();

        return Inertia::render('User/Dashboard/Subscription/Transaction', [
            'transaction' => $transaction,
            'subscriptionPlan' => SubscriptionsPlan::find($userSubscription->subscriptions_plans_id)
        ]);
    }

    
}
