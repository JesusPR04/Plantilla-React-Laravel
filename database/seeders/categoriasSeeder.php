<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class categoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generos = [
            "Música", "Vida nocturna", "Artes escénicas y visuales",
            "Vacaciones", "Salud", "Aficiones", "Negocios", "Gastronomía"
        ];
        for ($i=0; $i < count($generos); $i++) { 
            DB::table('categorias')->insert([
                'nombre' => $generos[$i]
            ]);
        }
    }
}
