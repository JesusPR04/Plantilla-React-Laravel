<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class organizadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            'nombre' => 'Antonio',
            'apellidos' => 'Reyes',
            'email' => 'org@gmail.com',
            'password' => '$2y$12$DIGLoxyXtMr301I0YduEouAhTtXHIe6t4z.4D72FJS4y4dLBeyA7.',
            'telefono' => '123456789',
            'ciudad' => 'Córdoba',
            'rol' => 'Organizador'
        ]);
    }
}
