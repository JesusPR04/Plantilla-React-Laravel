<?php

namespace App\Http\Controllers\API;

use App\Models\Eventos;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Favoritos;

class FavoritosController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user() === null) {//Compruebo si está logueado
            return response()->json([
                'status' => false
            ], 200);
        } else {
            $evento = Favoritos::where('idUsuario', $request->user()->id)->where('idEvento', $request->id)->first();
            if (isset($evento)) {
                return response()->json([
                    'status' => true
                ], 200);
            } else {
                return response()->json([
                    'status' => false
                ], 200);
            }
        }
    }
    public function marcarFavorito(Request $request)
    {
    }
}
