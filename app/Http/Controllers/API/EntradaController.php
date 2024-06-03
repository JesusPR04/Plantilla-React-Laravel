<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Entradas;
use App\Models\User;
use App\Models\Eventos;

class EntradaController extends Controller
{
    public function comprar(Request $request)
    {
        $validated = $request->validate([
            'idUsuario' => 'required|exists:usuarios,id',
            'idEvento' => 'required|exists:eventos,id',
            'cantidad' => 'required|integer|min:1',
            'metodoPago' => 'required|in:dinero,puntos', // Validar método de pago
        ]);

        $evento = Eventos::findOrFail($validated['idEvento']);
        $user = $request->user();

        $puntosGanados = $evento->precio * $validated['cantidad'];
        $costoEnPuntos = $puntosGanados * 3;

        if ($validated['metodoPago'] === 'puntos') {
            if ($user->puntos < $costoEnPuntos) {
                return response()->json(['error' => 'No tienes suficientes puntos para completar esta compra.'], 400);
            }
            $user->puntos -= $costoEnPuntos;
        } else {
            $user->puntos += $puntosGanados;
        }

        $entrada = Entradas::create([
            'idUsuario' => $validated['idUsuario'],
            'idEvento' => $validated['idEvento'],
            'cantidad' => $validated['cantidad'],
        ]);

        $user->save();

        return response()->json($entrada, 201);
    }

    public function cancelarEntrada(Request $request, $id){
        $evento = Entradas::where('idEvento', $id)->where('idUsuario', $request->user()->id)->first();
        if(isset($evento)){
            $evento->delete();
            return response()->json([
                'status' => true,
                'message' => 'Entrada eliminada correctamente'
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'No se pudo encontrar la entrada'
            ], 400);
        }
    }
}
