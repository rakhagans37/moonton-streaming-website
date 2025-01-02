<?php

namespace App\Http\Requests\Admin\Voucher;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'type' => 'required|in:percent,redeem,amount',
            'value' => 'nullable|required_unless:type,redeem|integer',
            'limit' => 'nullable|integer',
            'expired_at' => 'required|date',
            'subscriptions_plans_id' => 'nullable|required_if:type,redeem|exists:subscriptions_plans,id',
            'code' => 'unique:vouchers,code|nullable|string|min:6|max:30|required_unless:type,redeem'
        ];
    }
}
