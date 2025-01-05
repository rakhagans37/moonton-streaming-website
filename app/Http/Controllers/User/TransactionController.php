<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionsPlan;
use App\Models\Transaction;
use App\Services\Interface\PaymentGatewayInterface;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    protected $paymentGateway;

    public function __construct(PaymentGatewayInterface $paymentGateway)
    {
        $this->paymentGateway  = $paymentGateway;
    }
    
    public function index()
    {
        $transcations = Auth::user()->transactions;
        return Inertia::render('User/Dashboard/Transaction', [
            'transactions' => $transcations
        ]);
    }

    public function detail(Transaction $transaction)
    {
        return Inertia::render('User/Dashboard/Subscription/Transaction', [
            'transaction' => $transaction,
            'subscriptionPlan' => SubscriptionsPlan::find($transaction->userSubscription->subscriptions_plans_id)
        ]);
    }

    public function pay(Transaction $transaction)
    {
        $transaction = Transaction::find($transaction->id);
        $order_id = $transaction->id . "-" . Str::random(5);
        $gross_amount = $transaction->final_price;

        $snapToken = $this->paymentGateway->createSnapToken($order_id, $gross_amount);
        $transaction->midtrans_order_id = $order_id;
        $transaction->snap_token = $snapToken;
        $transaction->save();


        return Inertia::render('User/Dashboard/Subscription/Transaction', [
            'transaction' => $transaction,
            'userSubscription' => $transaction->userSubscription
        ]);
    }
}
