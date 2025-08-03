<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubscriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'plan' => 'required|in:premium',
            'payment_proof' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'plan.required' => 'Please select a subscription plan.',
            'plan.in' => 'Invalid subscription plan selected.',
            'payment_proof.required' => 'Please upload payment proof.',
            'payment_proof.file' => 'Payment proof must be a file.',
            'payment_proof.mimes' => 'Payment proof must be a JPG, PNG, or PDF file.',
            'payment_proof.max' => 'Payment proof file size cannot exceed 2MB.',
        ];
    }
}