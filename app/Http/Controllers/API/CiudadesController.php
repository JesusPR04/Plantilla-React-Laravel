<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ciudades;
use Illuminate\Http\Request;

class CiudadesController extends Controller
{
    public function getCiudades(){
        return response()->json([
            'status' => true,
            'ciudades' => Ciudades::orderBy('nombre')->get()->toArray()
        ], 200);
    }
}
