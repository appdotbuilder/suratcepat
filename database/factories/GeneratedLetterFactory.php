<?php

namespace Database\Factories;

use App\Models\GeneratedLetter;
use App\Models\LetterTemplate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GeneratedLetter>
 */
class GeneratedLetterFactory extends Factory
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
            'letter_template_id' => LetterTemplate::factory(),
            'title' => $this->faker->sentence(4),
            'form_data' => [
                'sender_name' => $this->faker->name(),
                'sender_address' => $this->faker->address(),
                'recipient_name' => $this->faker->name(),
                'date' => $this->faker->date(),
            ],
            'generated_content' => $this->faker->paragraphs(5, true),
            'pdf_path' => null,
        ];
    }
}