<?php

namespace App\Http\Controllers\API;

use App\Models\Tarjetas;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class TarjetasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tarjetas = Tarjetas::where('idUsuario', $request->user()->id)->get();
        return response()->json([
            'status' => true,
            'tarjetas' => $tarjetas
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $mensajes = [
            'required' => 'El campo :attribute es obligatorio',
            'regex' => 'El formato del campo :attribute no es correcto'
        ];
        $validator = Validator::make($request->all(), [
            'cvv' => 'required|regex:/^\d{3}$/',
            'caducidad' => 'required|regex:/^\d{2}\/\d{2}$/',
            'numero' => 'required|regex:/^\d{16}$/'
        ], $mensajes);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Rellene correctamente el formulario',
                'errors' => $validator->errors()
            ], 401);
        }

        try {
            Tarjetas::create([
                'numero' => $request->numero,
                'caducidad' => $request->caducidad,
                'cvv' => $request->cvv,
                'idUsuario' => $request->user()->id
            ]);
            return response()->json([
                'status' => true,
                'message' => 'Tarjeta creada correctamente'
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $tarjeta = Tarjetas::where('id', $id)->where('idUsuario', $request->user()->id)->first();

        if (isset($tarjeta)) {
            return response()->json([
                'status' => true,
                'tarjeta' => $tarjeta
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'La tarjeta no existe'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $mensajes = [
            'required' => 'El campo :attribute es obligatorio',
            'regex' => 'El formato del campo :attribute no es correcto'
        ];
        $validator = Validator::make($request->all(), [
            'cvv' => 'required|regex:/^\d{3}$/',
            'caducidad' => 'required|regex:/^\d{2}\/\d{2}$/',
            'numero' => 'required|regex:/^\d{16}$/'
        ], $mensajes);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Rellene correctamente el formulario',
                'errors' => $validator->errors()
            ], 401);
        }
        try {
            $tarjeta = Tarjetas::where('id', $id)->where('idUsuario', $request->user()->id)->first();
            if (isset($tarjeta)) {
                $tarjeta->numero = $request->numero;
                $tarjeta->caducidad = $request->caducidad;
                $tarjeta->cvv = $request->cvv;
                if ($tarjeta->save()) {
                    return response()->json([
                        'status' => true,
                        'message' => 'Tarjeta editada correctamente'
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Error al guardar la tarjeta'
                    ], 401);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'La tarjeta no existe'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $tarjeta = Tarjetas::where('id', $id)->where('idUsuario', $request->user()->id)->first();
        try {
            if (isset($tarjeta)) {
                if ($tarjeta->delete()) {
                    return response()->json([
                        'status' => true,
                        'message' => 'Tarjeta borrada correctamente'
                    ], 200);
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Error al borrar la tarjeta'
                    ], 401);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'La tarjeta no existe'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
