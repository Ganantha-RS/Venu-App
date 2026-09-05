<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\User;
use App\Models\UmkmProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'role' => [
                'required',
                Rule::in(['school', 'umkm']),
            ],

            'email' => [
                'required',
                'email',
                'unique:users,email',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
            ],

            // Field School
            'school_name' => [
                'required_if:role,school',
                'nullable',
                'string',
                'max:255',
            ],

            'npsn' => [
                'nullable',
                'string',
                'max:255',
            ],

            'position' => [
                'nullable',
                'string',
                'max:255',
            ],

            'address' => [
                'nullable',
                'string',
            ],

            // Field UMKM
            'business_name' => [
                'required_if:role,umkm',
                'nullable',
                'string',
                'max:255',
            ],

            'category' => [
                'required_if:role,umkm',
                'nullable',
                'string',
                'max:255',
            ],

            'products' => [
                'nullable',
                'string',
                'max:255',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:255',
            ],

            'location' => [
                'nullable',
                'string',
                'max:255',
            ],

            'target_audience' => [
                'nullable',
                'string',
                Rule::in(['pelajar', 'remaja', 'umum', 'keluarga']),
            ],

            'price_min' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'price_max' => [
                'nullable',
                'integer',
                'min:0',
                'gte:price_min',
            ],

            'booth_budget_max' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ]);

        $result = DB::transaction(function () use ($validated) {


            $user = User::create([
                'name' => $validated['role'] === 'school'
                    ? $validated['school_name']
                    : $validated['business_name'],

                'email' => $validated['email'],

                'role' => $validated['role'],

                'password' => Hash::make($validated['password']),
            ]);


            /*
             * 2. Buat profile berdasarkan role
             */
            if ($validated['role'] === 'school') {

                School::create([
                    'user_id' => $user->id,
                    'school_name' => $validated['school_name'],
                    'npsn' => $validated['npsn'] ?? null,
                    'position' => $validated['position'] ?? null,
                    'address' => $validated['address'] ?? null,
                    'phone' => $validated['phone'] ?? null,
                ]);

            } else {

                UmkmProfile::create([
                    'user_id' => $user->id,
                    'business_name' => $validated['business_name'],
                    'category' => $validated['category'],
                    'products' => $validated['products'] ?? null,
                    'phone' => $validated['phone'] ?? null,
                    'location' => $validated['location'] ?? null,
                    'target_audience' => $validated['target_audience'] ?? null,
                    'price_min' => $validated['price_min'] ?? null,
                    'price_max' => $validated['price_max'] ?? null,
                    'booth_budget_max' => $validated['booth_budget_max'] ?? null,
                    'description' => $validated['description'] ?? null,
                ]);
            }


            /*
             * 3. Buat token Sanctum
             */
            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'user' => $user,
                'token' => $token,
            ];
        });


        /*
         * 4. Response ke frontend
         */
        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil.',
            'data' => $result,
        ], 201);
    }


    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
            ],

            'password' => [
                'required',
                'string',
            ],
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau kata sandi salah.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil.',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ]);
    }


    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil.',
        ]);
    }


    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'school') {
            $user->load('school');
        } else {
            $user->load('umkmProfile');
        }

        return response()->json([
            'success' => true,
            'message' => 'Data user.',
            'data' => [
                'user' => $user,
            ],
        ]);
    }
}
