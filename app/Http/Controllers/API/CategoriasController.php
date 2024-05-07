<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Categorias;
use App\Models\Ciudades;
use Illuminate\Http\Request;

class CategoriasController extends Controller
{
    public function getCategorias(){
        return response()->json([
            'status' => true,
            'categorias' => Categorias::orderBy('nombre')->get()->toArray()
        ], 200);
    }
}
