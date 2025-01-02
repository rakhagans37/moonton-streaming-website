<?php

namespace App\Http\Middleware;

use App\Models\Transaction;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserTransactionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $transaction = $request->route('transaction'); // Ambil transaksi dari parameter route

        // Pastikan transaksi adalah milik user yang sedang login
        if ($transaction->userSubscription->user_id !== $request->user()->id || $transaction->payment_status !== 'pending') {
            return redirect()->route('user.dashboard.index')->with('error', 'Transaction not found');
        }

        return $next($request);
    }
}
