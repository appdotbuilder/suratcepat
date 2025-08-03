<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGeneratedLetterRequest extends FormRequest
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
            'letter_template_id' => 'required|exists:letter_templates,id',
            'title' => 'required|string|max:255',
            'form_data' => 'required|array',
            'form_data.*' => 'required|string',
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
            'letter_template_id.required' => 'Please select a letter template.',
            'letter_template_id.exists' => 'The selected template is invalid.',
            'title.required' => 'Letter title is required.',
            'form_data.required' => 'Please fill in all required fields.',
            'form_data.*.required' => 'This field is required.',
        ];
    }
}