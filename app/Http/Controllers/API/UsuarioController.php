<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\eventoMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    public function correoPrueba(){
        try {
            Mail::to('jpc0016@alu.medac.es')->send(new eventoMail(12,12,12,12));
            dd('enviado');
        } catch (\Throwable $th) {
            dd('No enviado');
        }
        
    }

    public function updateUserData(Request $request)
    {
        $user = $request->user();

        // Validación de los datos recibidos del formulario
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'ciudad' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        // Actualización de los datos del usuario
        $user->nombre = $request->nombre;
        $user->apellidos = $request->apellidos;
        $user->email = $request->email;
        $user->ciudad = $request->ciudad;
        $user->telefono = $request->telefono;
        $user->save();

        // Respuesta JSON con los datos actualizados del usuario
        return response()->json([
            'status' => true,
            'message' => 'Datos actualizados correctamente',
            'user' => $user
        ], 200);
    }
}
