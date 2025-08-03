<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Models\Subscription;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Display subscription plans and current status.
     */
    public function index()
    {
        $user = auth()->user();
        $currentSubscription = $user->subscription;

        return Inertia::render('subscription/index', [
            'currentSubscription' => $currentSubscription,
            'hasPremium' => $user->hasPremiumSubscription(),
        ]);
    }

    /**
     * Show the form for upgrading to premium.
     */
    public function create()
    {
        return Inertia::render('subscription/upgrade');
    }

    /**
     * Store a new subscription request.
     */
    public function store(StoreSubscriptionRequest $request)
    {
        $user = auth()->user();

        // Store payment proof
        $paymentProofPath = $request->file('payment_proof')->store('payment-proofs', 'public');

        // Create subscription record
        Subscription::create([
            'user_id' => $user->id,
            'plan' => 'premium',
            'status' => 'pending',
            'amount' => 99000, // IDR 99,000
            'payment_proof' => $paymentProofPath,
        ]);

        return redirect()->route('subscription.index')
            ->with('success', 'Payment proof uploaded successfully. Your subscription will be activated after verification.');
    }
}