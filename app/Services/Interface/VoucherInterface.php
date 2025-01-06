<?php

namespace App\Services\Interface;

use App\Models\Transaction;

interface VoucherInterface
{
    public function validateVoucher() : array | null;
    public function applyVoucher(?Transaction $transaction);
}