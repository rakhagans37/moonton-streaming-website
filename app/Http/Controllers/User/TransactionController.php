<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserSubscriptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transcations = UserSubscriptions::where('user_id', Auth::user()->id)->get();
        return Inertia::render('User/Dashboard/Transaction', [
            'transactions' => $transcations
        ]);
    }
}
