<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Eventos;
use App\Models\Entradas;
use App\Models\Tarjetas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EntradaController extends Controller
{
    public function comprar(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'idEvento' => 'required|exists:eventos,id',
            'cantidad' => 'required|integer|min:1',
            'metodoPago' => 'required|in:dinero,puntos', // Validar método de pago
            'idTarjeta' => 'required|exists:tarjetas,id'
        ]);

        $evento = Eventos::where('id', $request->idEvento)->first();
        $user = $request->user();

        $puntosGanados = $evento->precio * $request->cantidad;
        $costoEnPuntos = $puntosGanados * 3;

        if ($request->metodoPago === 'puntos') {
            if ($user->puntos < $costoEnPuntos) {
                return response()->json([
                    'status' => false,
                    'error' => 'No tienes suficientes puntos para completar esta compra.'
                ], 400);
            }
            $user->puntos -= $costoEnPuntos;
        } else {
            $user->puntos += $puntosGanados;
        }

        $tarjeta = Tarjetas::where('id', $request->idTarjeta)->where('idUsuario', $request->user()->id)->first();

        if (!isset($tarjeta)) {
            return response()->json([
                    'status' => false,
                    'error' => 'La tarjeta de crédito usada no está a su nombre.'
                ], 404);
        }

        $entrada = Entradas::create([
            'idUsuario' => $request->user()->id,
            'idEvento' => $request->idEvento,
            'cantidad' => $request->cantidad,
            'idTarjeta' => $tarjeta->id,
        ]);

        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Compra realizada con éxito'
        ], 201);
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
