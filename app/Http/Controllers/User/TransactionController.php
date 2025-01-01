<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionsPlan;
use App\Models\Transaction;
use App\Models\UserSubscriptions;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TransactionController extends Controller
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
        $transcations = Auth::user()->transactions;
        return Inertia::render('User/Dashboard/Transaction', [
            'transactions' => $transcations
        ]);
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

    public function pay(Transaction $transaction)
    {
        $transaction = Transaction::find($transaction->id);
        $params = array(
            'transaction_details' => array(
                'order_id' => $transaction->id . "-" . Str::random(5),
                'gross_amount' => $transaction->final_price,
            )
        );
        $snapToken = \Midtrans\Snap::getSnapToken($params);
        $transaction->snap_token = $snapToken;
        $transaction->save();


        return Inertia::render('User/Dashboard/Subscription/Transaction', [
            'transaction' => $transaction,
            'userSubscription' => $transaction->userSubscription
        ]);
    }

    public function midtransCallback()
    {
        $notif = new \Midtrans\Notification();

        $transactionStatus = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transactionId = explode('-', $notif->order_id)[0];
        $transaction = Transaction::find($transactionId);
        $userSubscription = $transaction->userSubscription;

        // error_log("Order ID $notif->order_id: " . "transaction status = $transaction, fraud staus = $fraud");

        if ($transactionStatus == 'settlement' && $fraud == 'accept') {
            // TODO Set payment status in merchant's database to 'success'
            $transaction->payment_status = 'success';
            $userSubscription->expires_at = Carbon::now()->addMonth($userSubscription->subscriptionPlan->active_period_in_months);
            $userSubscription->save();
            $transaction->save();
        } else if (
            $transactionStatus == 'settlement' && $fraud == 'challenge'
        ) {
            // TODO Set payment status in merchant's database to 'challenge'
            $transaction->payment_status = 'challenge';
        } else if ($transactionStatus == 'settlement' && $fraud == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $transaction->payment_status = 'failure';
        } else if ($transactionStatus == "pending" && $fraud == "accept") {
            // TODO Set payment status in merchant's database to 'pending'
            $transaction->payment_status = 'pending';
        } else {
            // TODO Set payment status in merchant's database to 'failure'
            $transaction->payment_status = 'failure';
        }

        return response()->json(['status' => 'success', 'message' => 'Payment status updated']);
    }
}
