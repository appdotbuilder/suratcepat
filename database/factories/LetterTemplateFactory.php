<?php

namespace Database\Factories;

use App\Models\LetterTemplate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LetterTemplate>
 */
class LetterTemplateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'slug' => $this->faker->slug(),
            'description' => $this->faker->paragraph(),
            'fields' => [
                [
                    'name' => 'sender_name',
                    'label' => 'Nama Pengirim',
                    'type' => 'text',
                    'required' => true,
                ],
                [
                    'name' => 'sender_address',
                    'label' => 'Alamat Pengirim',
                    'type' => 'textarea',
                    'required' => true,
                ],
            ],
            'template_content' => $this->faker->paragraphs(3, true),
            'is_premium' => $this->faker->boolean(30), // 30% chance of being premium
            'is_active' => true,
            'sort_order' => $this->faker->numberBetween(1, 100),
        ];
    }

    /**
     * Indicate that the template is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_premium' => true,
        ]);
    }

    /**
     * Indicate that the template is free.
     */
    public function free(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_premium' => false,
        ]);
    }

    /**
     * Indicate that the template is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}