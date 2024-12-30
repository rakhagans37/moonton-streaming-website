<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionsPlan;
use App\Models\UserSubscriptions;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptionsPlan = SubscriptionsPlan::all();

        return Inertia::render('User/Dashboard/Subscription', [
            'subscriptionsPlan' => $subscriptionsPlan
        ]);
    }

    public function subscribe(Request $request, SubscriptionsPlan $subscriptionPlan)
    {  
        $userSubscription = new UserSubscriptions();
        $userSubscription->user_id = $request->user()->id;
        $userSubscription->subscriptions_plans_id = $subscriptionPlan->id;
        $userSubscription->price = $subscriptionPlan->price;
        $userSubscription->expires_at = Carbon::now()->addMonth($subscriptionPlan->active_period_in_months);
        $userSubscription->payment_status = 'success';
        $userSubscription->save();
        
        return redirect(route('user.dashboard.index'));
    }
}
