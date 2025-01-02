<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Voucher\RedeemRequest;
use App\Models\Transaction;
use App\Models\UserSubscriptions;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VoucherController extends Controller
{

    private function validateVoucher($voucher)
    {

        if (!$voucher) {
            return [
                'type' => 'failed',
                'message' => 'Voucher not found'
            ];
        } else if ($voucher->limit <= $voucher->used) {
            return [
                'type' => 'failed',
                'message' => 'Voucher limit has been reached'
            ];
        } else if (Carbon::now()->greaterThan($voucher->expired_at)) {
            return [
                'type' => 'failed',
                'message' => 'Voucher has been expired'
            ];
        }

        return null;
    }

    public function redeem(RedeemRequest $request)
    {
        $data = $request->validated();

        $voucher = Voucher::where('code', $data['voucher'])->first();

        $validationError = $this->validateVoucher($voucher);
        if ($validationError) {
            return redirect()->back()->with($validationError);
        }

        if ($voucher->type !== 'redeem') {
            return redirect()->back()->with([
                'type' => 'failed',
                'message' => 'Voucher is not redeemable'
            ]);
        }

        $voucher->used += 1;
        $voucher->save();

        $userSubscription = UserSubscriptions::create([
            'user_id' => Auth::id(),
            'subscriptions_plans_id' => $voucher->subscriptions_plans_id,
            'expires_at' => Carbon::now()->addMonths($voucher->subscriptionsPlan->active_period_in_months)
        ]);

        Transaction::create([
            'user_subscriptions_id' => $userSubscription->id,
            'payment_status' => 'redeem',
            'price' => $userSubscription->subscriptionPlan->price,
            'discount' => $userSubscription->subscriptionPlan->price,
            'final_price' => 0,
            'voucher_id' => $voucher->id
        ]);

        return redirect()->route('user.dashboard.index')->with([
            'type' => 'success',
            'message' => 'Voucher redeemed successfully'
        ]);
    }

    public function apply(RedeemRequest $request, Transaction $transaction)
    {
        $data = $request->validated();

        $voucher = Voucher::where('code', $data['voucher'])->first();

        $validationError = $this->validateVoucher($voucher);
        if ($validationError) {
            return redirect()->back()->with($validationError);
        }

        if ($voucher->type !== 'amount' && $voucher->type !== 'percent') {
            return redirect()->back()->with([
                'type' => 'failed',
                'message' => 'Voucher is not applicable'
            ]);
        }

        $voucher->used += 1;
        $voucher->save();

        $discount = 0;
        if ($voucher->type == 'amount') {
            $discount = $voucher->value;
        } else if ($voucher->type == 'percent') {
            $discount = $transaction->price * $voucher->value / 100;
        }

        $transaction->discount = $discount;
        $transaction->final_price = $transaction->price - $discount;
        $transaction->voucher_id = $voucher->id;
        $transaction->save();


        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Voucher applied successfully',
            'transaction' => $transaction->id,
        ]);
    }
}
