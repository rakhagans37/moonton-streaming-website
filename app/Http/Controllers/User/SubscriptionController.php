<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionsPlan;
use App\Models\UserSubscriptions;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SubscriptionController extends Controller
{
    public function __construct()
    {
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = env('MIDTRANS_IS_3DS');
    }

    public function index()
    {
        $subscriptionsPlan = SubscriptionsPlan::all();

        return Inertia::render('User/Dashboard/Subscription', [
            'subscriptionsPlan' => $subscriptionsPlan,
            'userSubscription' => null
        ]);
    }

    public function subscribe(Request $request, SubscriptionsPlan $subscriptionPlan)
    {
        $userSubscription = new UserSubscriptions();
        $userSubscription->user_id = $request->user()->id;
        $userSubscription->subscriptions_plans_id = $subscriptionPlan->id;
        $userSubscription->price = $subscriptionPlan->price;
        // $userSubscription->expires_at = Carbon::now()->addMonth($subscriptionPlan->active_period_in_months);
        $userSubscription->payment_status = 'pending';
        $userSubscription->save();

        $params = array(
            'transaction_details' => array(
                'order_id' => $userSubscription->id . Str::random(5),
                'gross_amount' => $userSubscription->price,
            )
        );

        $snapToken = \Midtrans\Snap::getSnapToken($params);
        $userSubscription->snap_token = $snapToken;
        $userSubscription->save();

        return Inertia::render('User/Dashboard/Subscription', [
            'userSubscription' => $userSubscription
        ]);
    }

    public function midtransCallback()
    {
        $notif = new \Midtrans\Notification();

        $transaction = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transactionId = explode('-', $notif->order_id)[0];
        $userSubscription = UserSubscriptions::find($transactionId);

        error_log("Order ID $notif->order_id: " . "transaction status = $transaction, fraud staus = $fraud");

        if ($transaction == 'settlement' && $fraud == 'accept') {
            // TODO Set payment status in merchant's database to 'success'
            $userSubscription->payment_status = 'success';
            $userSubscription->expires_at = Carbon::now()->addMonth($userSubscription->subscriptionPlan->active_period_in_months);
        } else if (
            $transaction == 'settlement' && $fraud == 'challenge'
        ) {
            // TODO Set payment status in merchant's database to 'challenge'
            $userSubscription->payment_status = 'challenge';
        } else if ($transaction == 'settlement' && $fraud == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failure';
        } else if ($transaction == "pending" && $fraud == "accept") {
            // TODO Set payment status in merchant's database to 'pending'
            $userSubscription->payment_status = 'pending';
        } else {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failure';
        }

        $userSubscription->save();
        return response()->json(['status' => 'success', 'message' => 'Payment status updated']);
    }
}
