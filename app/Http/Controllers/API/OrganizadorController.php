<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Peticiones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrganizadorController extends Controller
{
    public function realizarPeticion(Request $request)
    {
        try {
            $validarPeticion = Validator::make($request->all(), [
                'empresa' => 'required|max:100',
                'dni' => 'required|regex:/^\d{8}[a-z]$/i',
                'documento' => 'required',
                'comentario' => 'nullable|max:500',
            ]);

            if ($validarPeticion->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error de validacion de la petición',
                    'errors' => $validarPeticion->errors()
                ], 401);
            }
            Peticiones::create([
                'empresa' => $request->empresa,
                'dni' => $request->dni,
                'documento' => $request->documento,
                'comentario' => $request->comentario,
                'idUsuario' => $request->user()->id
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Petición realizada correctamente'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ]);
        }
    }
}
