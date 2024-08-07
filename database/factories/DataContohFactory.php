<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DataContohFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nama' => $this->faker->name(),
            'npm' => $this->faker->unique()->regexify('[A-Za-z0-9]{8}'),
            'fakultas' => $this->faker->sentence(6),
            'semester' => $this->faker->numberBetween(1, 8),
        ];
    }
}
