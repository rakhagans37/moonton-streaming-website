<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Services\Interface\PaymentGatewayInterface;
use Carbon\Carbon;

class MidtransController extends Controller
{
    protected $paymentGateway;

    public function __construct(PaymentGatewayInterface $paymentGateway)
    {
        $this->paymentGateway  = $paymentGateway;
    }


    public function midtransCallback()
    {
        $notif = $this->paymentGateway->handleNotification();

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

        $userSubscription->save();
        $transaction->save();

        return "OK";
        return response()->json(['status' => 'success', 'message' => 'Payment status updated']);
    }

    public function cancel(Transaction $transaction)
    {   
        $this->paymentGateway->cancelTransaction($transaction->midtrans_order_id);
        return redirect()->route('user.dashboard.transaction.index')->with([
            'message' => 'Transaction canceled',
            'type' => 'Info'
        ]);
    }
}
