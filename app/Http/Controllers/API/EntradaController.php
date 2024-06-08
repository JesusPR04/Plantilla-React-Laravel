<?php

namespace App\Http\Controllers\API;

use App\Models\Tarjetas;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Mail\eventoMail;
use Illuminate\Http\Request;
use App\Models\Entradas;
use App\Models\User;
use App\Models\Eventos;
use App\Models\Peticiones;
use BaconQrCode\Encoder\QrCode;
use Illuminate\Support\Facades\Mail;

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

        if ($entrada) {
            self::emailEntrada($entrada->idEvento,$entrada->idUsuario,$evento->organizador->id, $entrada->cantidad);
        }

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

    public function emailEntrada($evento_id, $user_id, $organizador_id, $entrada_id)
    {
        $evento=Eventos::find($evento_id);
        $user=User::find($user_id);
        $organizador=User::find($organizador_id);
        $entrada=Entradas::find($entrada_id);
        $empresa=Peticiones::where('idUsuario',$organizador->id)->first()->empresa;

        if(!$empresa){
            $empresa=$organizador->nombre.' '.$organizador->apellidos;
        }

        try {
            Mail::to('prf0005@alu.medac.es')->send(new eventoMail($empresa,$organizador->nombre, $organizador->apellidos, $user->nombre, $user->apellidos, $evento->nombre, $evento->fecha, $evento->hora, $evento->direccion, $evento->precio, $evento->ciudad->nombre, $organizador->nombre, $entrada->cantidad));

            return response()->json([
                'status' => true, 
                'message' => 'Correo enviado correctamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
