<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_subscriptions_id',
        'discount',
        'price',
        'final_price',
        'snap_token',
        'payment_status',
    ];

    public function userSubscription()
    {
        return $this->belongsTo(UserSubscriptions::class, 'user_subscriptions_id', 'id');
    }
}
