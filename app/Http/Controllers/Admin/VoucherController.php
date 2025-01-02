<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Voucher\StoreRequest;
use App\Models\SubscriptionsPlan;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Voucher/Create', [
            'subscriptionPlans' => SubscriptionsPlan::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $voucher = new Voucher();
        $voucher->name = $data['name'];

        if($data['type'] === 'redeem') {
            $voucher->code = Str::upper(Str::random(12));
            $voucher->limit = 1;
        } else {
            $voucher->code = $data['code'];
            $voucher->limit = $data['limit'];
        }
        $voucher->type = $data['type'];
        $voucher->value = $data['value'];
        
        $voucher->expired_at = $data['expired_at'];
        $voucher->subscriptions_plans_id = $data['subscriptions_plans_id'];
        $voucher->save();

        return redirect()->route('admin.dashboard.movie.index')->with([
            'type' => 'success',
            'message' => 'Voucher created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Voucher $voucher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voucher $voucher)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voucher $voucher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voucher $voucher)
    {
        //
    }
}
