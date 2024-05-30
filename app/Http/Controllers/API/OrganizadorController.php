<?php

namespace App\Http\Controllers\API;

use App\Mail\eventoMail;
use App\Mail\rechazarMail;
use App\Models\User;
use App\Models\Peticiones;
use Illuminate\Http\Request;
use App\Mail\aceptarOrganizador;
use App\Http\Controllers\Controller;
use App\Mail\aceptarMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class OrganizadorController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user()->id;
        $peticion = Peticiones::where('idUsuario', $user)->first();
        if ($peticion === null) {
            return response()->json([
                'status' => true
            ], 200);
        } else {
            return response()->json([
                'status' => false
            ], 200);
        }
    }

    public function realizarPeticion(Request $request)
    {
        $validarPeticion = Validator::make($request->all(), [
            'empresa' => 'required|max:100',
            'dni' => 'required|regex:/^\d{8}[a-z]$/i',
            'documento' => ['required', File::types(['pdf'])->max(15 * 1024)],
            'comentario' => 'nullable|max:500'
        ]);

        if ($validarPeticion->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error de validacion de la petición',
                'errors' => $validarPeticion->errors()
            ], 401);
        }

        $documento = $request->file('documento');
        $nombreFichero = time() . '_' . $documento->getClientOriginalName();

        // Guarda el documento en el Storage en la carpeta peticiones
        if ($documento->storeAs('peticiones', $nombreFichero)) {

            Peticiones::create([
                'empresa' => $request->empresa,
                'dni' => $request->dni,
                'documento' => 'peticiones/' . $nombreFichero,
                'comentario' => $request->comentario ?? null,
                'idUsuario' => $request->user()->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Petición realizada correctamente'
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Error al mover el archivo'
            ], 401);
        }
    }

    public function comprobarSolicitud(Request $request)
    {
        $user = User::where('id', '=', $request->user()->id)->first();
        if ($user->rol !== "Organizador") {
            if ($request->decision) {
                try {
                    $user->rol = 'Organizador';
                    if ($user->save()) {
                        Mail::to('jpc0016@alu.medac.es')->send(new aceptarMail());
                        return response()->json([
                            'status' => true,
                            'message' => 'Correo enviado correctamente'
                        ], 200);
                    }else{
                        return response()->json([
                            'status' => false,
                            'message' => 'Error en la modificacion del usuario'
                        ], 400);
                    }
                } catch (\Throwable $th) {
                    return response()->json([
                        'status' => false,
                        'message' => $th->getMessage()
                    ], 500);
                }
            } else {
                try {
                    Mail::to('jpc0016@alu.medac.es')->send(new rechazarMail());
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
    }
}
