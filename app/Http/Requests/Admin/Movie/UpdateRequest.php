<?php

namespace App\Http\Requests\Admin\Movie;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateRequest extends FormRequest
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
            'title' => ['nullable', 'unique:movies,title,' . $this->movie->id],
            'category' => ['nullable', 'array', 'min:1', 'max:3'],
            'category.*' => ['nullable', 'string', 'max:255'],
            'video_url' => ['nullable', 'string', 'max:255'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'is_featured' => ['nullable', 'boolean'],
            'thumbnail' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
}
