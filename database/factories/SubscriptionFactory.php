<?php

namespace Database\Factories;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'plan' => 'premium',
            'status' => 'active',
            'amount' => 99000,
            'starts_at' => now(),
            'expires_at' => now()->addMonth(),
            'payment_proof' => null,
            'notes' => null,
        ];
    }

    /**
     * Indicate that the subscription is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'starts_at' => null,
            'expires_at' => null,
        ]);
    }

    /**
     * Indicate that the subscription is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
            'expires_at' => now()->subDays(7),
        ]);
    }

    /**
     * Indicate that the subscription is free.
     */
    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'plan' => 'free',
            'amount' => 0,
            'starts_at' => now(),
            'expires_at' => null,
        ]);
    }
}