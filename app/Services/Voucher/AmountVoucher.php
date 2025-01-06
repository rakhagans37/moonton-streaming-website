<?php

namespace App\Services\Voucher;

use App\Models\Transaction;
use App\Services\Interface\VoucherInterface;
use App\Models\Voucher;
use Carbon\Carbon;

class AmountVoucher implements VoucherInterface
{
    public $voucher;

    public function __construct(Voucher $voucher)
    {
        $this->voucher = $voucher;
    }

    public function validateVoucher(): array | null
    {

        if (!$this->voucher) {
            return [
                'type' => 'failed',
                'message' => 'Voucher not found'
            ];
        } else if ($this->voucher->limit <= $this->voucher->used) {
            return [
                'type' => 'failed',
                'message' => 'Voucher limit has been reached'
            ];
        } else if (Carbon::now()->greaterThan($this->voucher->expired_at)) {
            return [
                'type' => 'failed',
                'message' => 'Voucher has been expired'
            ];
        } else if ($this->voucher->type !== 'amount') {
            return [
                'type' => 'failed',
                'message' => 'This voucher is not applicable for this transaction'
            ];
        }

        return null;
    }

    public function applyVoucher(?Transaction $transaction)
    {
        $this->voucher->used += 1;
        $this->voucher->save();
        
        return $this->voucher->value;
    }
}
