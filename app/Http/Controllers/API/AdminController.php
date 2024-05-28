<?php

namespace App\Http\Controllers\API;

use App\Models\Peticiones;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class AdminController extends Controller
{
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
        $ruta = storage_path($request->documento);
        if (file_exists($ruta)) {
            if(Response::download($ruta)){
                return response()->json([
                   'status' => true,
                   'message' => 'Archivo descargado correctamente'
                ], 200);
            }else{
                return response()->json([
                   'status' => false,
                   'message' => 'Error al descargar el archivo'
                ], 500);
            }
        }else{
            return response()->json([
               'status' => false,
               'message' => 'El archivo no existe'
            ], 404);
        }
    }
}
