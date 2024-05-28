<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class adminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            'nombre' => 'nombre',
            'apellidos' => 'apellidos',
            'email' => 'admin@admin.com',
            'password' => '$2y$12$DIGLoxyXtMr301I0YduEouAhTtXHIe6t4z.4D72FJS4y4dLBeyA7.',
            'telefono' => '123456789',
            'ciudad' => 'Córdoba',
            'rol' => 'Administrador'
        ]);
    }
}
