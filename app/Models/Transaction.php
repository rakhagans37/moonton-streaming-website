<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

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

    // Get transaction by user
    public function user() : HasOneThrough
    {
        return $this->hasOneThrough(User::class, UserSubscriptions::class, 'id', 'id', 'user_subscriptions_id', 'user_id');
    }
}