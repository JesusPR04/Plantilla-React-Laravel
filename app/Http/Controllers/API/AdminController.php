<?php

namespace App\Http\Controllers\API;

use App\Models\Peticiones;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

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
}
