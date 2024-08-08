<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'alpha:ascii'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    // ->letters()
                    // ->symbols()
                    // ->numbers()
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama wajib diisi !',
            'name.alpha' => 'Masukkan nama yang valid !',
            'email.required' => 'Email wajib diisi !',
            'email.unique' => 'Email sudah terdaftar !',
            'password.required' => 'Masukkan password yang valid !',
            'password.confirmed' => 'Password yang anda masukkan tidak sama !',
        ];
    }
}