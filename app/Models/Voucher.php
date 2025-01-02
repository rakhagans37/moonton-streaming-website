<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'subscriptions_plans_id',
        'code',
        'type',
        'value',
        'limit',
        'used',
    ];

    public function subscriptionsPlan()
    {
        return $this->belongsTo(SubscriptionsPlan::class, 'subscriptions_plans_id', 'id');
    }

    public function transactions() : HasMany
    {
        return $this->hasMany(Transaction::class, 'voucher_id', 'id');
    }
}
