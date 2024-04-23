<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ciudadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $ciudades = [
            "Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla", 
            "Huesca", "Teruel", "Zaragoza", "Oviedo", "Palma", "Las Palmas de Gran Canaria",
            "Santa Cruz de Tenerife", "Santander", "Albacete", "Ciudad Real", "Cuenca", "Guadalajara",
            "Toledo", "Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid",
            "Zamora","Barcelona", "Gerona", "Lérida", "Tarragona", "Alicante", "Castellón", "Valencia", 
            "Badajoz", "Cáceres","La Coruña", "Lugo", "Orense", "Pontevedra", "Logroño", "Madrid", "Murcia",
            "Pamplona","Vitoria", "Bilbao", "San Sebastián", "Logroño", "Ceuta", "Melilla"
        ];
        for ($i=0; $i < count($ciudades); $i++) { 
            DB::table('ciudades')->insert([
                'nombre' => $ciudades[$i]
            ]);
        }
        
    }
}
