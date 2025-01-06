<?php

namespace App\Services;

use App\Models\Voucher;
use App\Services\Voucher\AmountVoucher;
use App\Services\Voucher\PercentVoucher;
use App\Services\Voucher\RedeemVoucher;

class VoucherService
{
    public function createInstance(Voucher $voucher)
    {
        return match ($voucher->type) {
            'amount' => new AmountVoucher($voucher),
            'percent' => new PercentVoucher($voucher),
            'redeem' => new RedeemVoucher($voucher),
            default => throw new \Exception('Unsupported voucher type'),
        };
    }
}