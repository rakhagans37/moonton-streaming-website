<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Voucher\RedeemRequest;
use App\Models\Transaction;
use App\Models\UserSubscriptions;
use App\Models\Voucher;
use App\Services\Voucher\RedeemVoucher;
use App\Services\VoucherService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class VoucherController extends Controller
{
    protected $voucherService;

    public function __construct(VoucherService $voucherService)
    {
        $this->voucherService = $voucherService;
    }

    public function redeem(RedeemRequest $request)
    {
        $data = $request->validated();

        $voucher = Voucher::where('code', $data['voucher'])->first();
        $voucher = $this->voucherService->createInstance($voucher);

        $validationError = $voucher->validateVoucher($voucher);
        if ($validationError) {
            return redirect()->back()->with($validationError);
        } else if (!$voucher instanceof RedeemVoucher) {
            return redirect()->back()->with([
                'type' => 'failed',
                'message' => 'Voucher is not redeemable'
            ]);
        }

        $userSubscription = UserSubscriptions::create([
            'user_id' => Auth::id(),
            'subscriptions_plans_id' => $voucher->applyVoucher(null),
            'expires_at' => Carbon::now()->addMonths($voucher->voucher->subscriptionsPlan->active_period_in_months)
        ]);

        Transaction::create([
            'user_subscriptions_id' => $userSubscription->id,
            'payment_status' => 'redeem',
            'price' => $userSubscription->subscriptionPlan->price,
            'discount' => $userSubscription->subscriptionPlan->price,
            'final_price' => 0,
            'voucher_id' => $voucher->voucher->id
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
        $voucher = $this->voucherService->createInstance($voucher);

        $validationError = $voucher->validateVoucher();
        if ($validationError) {
            return redirect()->back()->with($validationError);
        } else if ($voucher instanceof RedeemVoucher) {
            return redirect()->back()->with([
                'type' => 'failed',
                'message' => 'Voucher is not applicable for this transaction'
            ]);
        }

        $discount = $voucher->applyVoucher($transaction);

        $transaction->discount = $discount;
        $transaction->final_price = $transaction->price - $discount;
        $transaction->voucher_id = $voucher->voucher->id;
        $transaction->save();


        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Voucher applied successfully',
            'transaction' => $transaction->id,
        ]);
    }
}
