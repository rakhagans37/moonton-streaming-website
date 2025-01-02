<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubscriptionsPlan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'price',
        'active_period_in_months',
        'features',
    ];

    public function subscriptions()
    {
        return $this->hasMany(UserSubscriptions::class, 'subscriptions_plans_id', 'id');
    }

    public function vouchers()
    {
        return $this->hasMany(Voucher::class, 'subscriptions_plans_id', 'id');
    }

    public function userSubscriptions()
    {
        return $this->hasMany(UserSubscriptions::class, 'subscriptions_plans_id', 'id');
    }
}
