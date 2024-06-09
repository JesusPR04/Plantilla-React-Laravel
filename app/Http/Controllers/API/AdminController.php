<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Mail\aceptarMail;
use App\Mail\rechazarMail;
use App\Models\Peticiones;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function index()
    {
        $rolUser = Auth::user()->rol;

        if ($rolUser === "Administrador") {
            return response()->json([
                'status' => true,
                'message' => 'Bienvenido de vuelta'
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'No tiene los permisos necesarios para acceder aqui'
            ], 401);
        }
    }

    public function peticiones()
    {
        $peticiones = Peticiones::all();
        if (!isset($peticiones) || $peticiones === null) {
            return response()->json([
                'status' => false,
                'message' => "Fallo en la recogida de peticiones"
            ], 400);
        } else {
            return response()->json([
                'status' => true,
                'peticiones' => $peticiones
            ], 200);
        }
    }

    public function descargarArchivo(Request $request)
    {
        if (Storage::disk('local')->exists($request->documento)) {
            return Storage::disk('local')->download($request->documento);
        } else {
            return response()->json([
                'status' => false,
                'error' => 'Archivo no encontrado'
            ], 404);
        }
    }
    public function comprobarSolicitud(Request $request)
    {
        if ($request->user()->rol === "Administrador") {
            $user = User::where('id', $request->idUsuario)->first();
            $peticion = Peticiones::where('idUsuario', $user->id)->where('estado', 'En revision')->first();
            if ($user->rol !== "Organizador") {
                if ($request->decision) {
                    try {
                        $peticion->estado = 'Aceptada';
                        $user->rol = 'Organizador';
                        if ($user->save() && $peticion->save()) {
                            Mail::to('jpr0014@alu.medac.es')->send(new aceptarMail($user->nombre));
                            return response()->json([
                                'status' => true,
                                'message' => 'Correo enviado correctamente'
                            ], 200);
                        } else {
                            return response()->json([
                                'status' => false,
                                'message' => 'Error en la modificacion de los datos'
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
                        $peticion->estado = 'Rechazada';
                        if ($peticion->save()) {
                            Mail::to('jpr0014@alu.medac.es')->send(new rechazarMail());
                            return response()->json([
                                'status' => true,
                                'message' => 'Correo enviado correctamente'
                            ], 200);
                        }else{
                            return response()->json([
                                'status' => false,
                                'message' => 'Error en la modificacion de los datos'
                            ], 400);
                        }
                    } catch (\Throwable $th) {
                        return response()->json([
                            'status' => false,
                            'message' => $th->getMessage()
                        ], 500);
                    }
                }
            }
        }else{
            return response()->json([
                'status' => false,
                'message' => 'No tiene los permisos necesarios'
            ], 400);
        }
    }
}
