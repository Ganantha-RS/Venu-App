<?php

// app/Http/Controllers/Api/Auth/AuthController.php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\{RegisterRequest, LoginRequest};
use App\Http\Traits\ApiResponse;
use App\Models\User;
use Illuminate\Support\Facades\{Auth, Hash};

class AuthController extends Controller
{
    use ApiResponse;

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        if ($user->role === 'school') {
            $user->school()->create(['school_name' => $user->name]);
        } else {
            $user->umkmProfile()->create([
                'business_name' => $user->name,
                'category' => 'uncategorized',
                'location' => '-',
            ]);
        }

        $token = $user->createToken('venu-token')->plainTextToken;

        return $this->success('Registrasi berhasil.', [
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->error('Email atau password salah.', [], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('venu-token')->plainTextToken;

        return $this->success('Login berhasil.', [
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();
        return $this->success('Logout berhasil.');
    }

    public function me()
    {
        return $this->success('Data user.', auth()->user());
    }
}
