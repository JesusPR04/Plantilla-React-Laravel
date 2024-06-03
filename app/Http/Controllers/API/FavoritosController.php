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
            $favorito = Favoritos::where('idUsuario', $request->user()->id)->where('idEvento', $request->id)->first();
            if (isset($favorito)) {
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
        $estadoEvento = $this->index($request);

        if($estadoEvento->original['status']){
            $favorito = Favoritos::where('idUsuario', $request->user()->id)->where('idEvento', $request->id)->first();
            $favorito->delete();
            return response()->json([
                'status' => true,
                'message' => 'Favorito eliminado correctamente',
                'estado' => true
            ], 200);
        }else{
            Favoritos::create([
                'idUsuario' => $request->user()->id,
                'idEvento' => $request->id,
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Favorito creado correctamente',
                'estado' => false
            ], 200);
        }
    }

    public function misFavoritos(Request $request){
        $eventos = [];
        $favoritos = Favoritos::where('idUsuario', $request->user()->id)->get();

        foreach ($favoritos as $favorito) {
            $evento = Eventos::where('id', $favorito->idEvento)->first();
            array_push($eventos, $evento);
        }
        return response()->json([
            'status' => true,
            'message' => 'Favoritos recogidos correctamente',
            'favoritos' => $eventos
        ]);
    }
}
