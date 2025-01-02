<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Voucher\RedeemRequest;
use App\Models\Transaction;
use App\Models\UserSubscriptions;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
        } else if ($voucher->type !== 'redeem') {
            return [
                'type' => 'failed',
                'message' => 'Voucher is not redeemable'
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
}
