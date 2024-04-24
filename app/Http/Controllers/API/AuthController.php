<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User
     */
    public function createUser(Request $request)
    {
        try {
            $mensajes = [
                'required' => 'El campo :attribute es obligatorio',
                'unique' => 'El :attribute ya está en uso',
                'telefono.regex' => 'El :attribute debe tener 9 dígitos numéricos'
            ];
            //Validator de los datos del usuario
            $validateUser = Validator::make($request->all(),
            [
                'nombre' => 'required',
                'apellidos' => 'required',
                'email' => 'required|email|unique:usuarios,email',
                'password' => 'required',
                'telefono' => 'required|regex:/^[0-9]{9}$/',
                'ciudad' => 'required',
            ], $mensajes);
            //Fallo en la validacion del usuario
            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => $request->all(),
                    'errors' => $validateUser->errors()
                ], 401);
            }
            //Creacion del usuario
            $user = User::create([
                'nombre' => $request->nombre,
                'apellidos' => $request->apellidos,
                'email' => $request->email,
                'ciudad' => $request->ciudad,
                'telefono' => $request->telefono,
                'rol' => 'Usuario',
                'password' => Hash::make($request->password),
            ]);
            //Respuesta ejecutado correctamente
            return response()->json([
                'status' => true,
                'message' => 'Usuario Creado Correctamente.',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
            //Respuesta catch
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'El Email y Contraseña introducidos son incorrectos o no concuerdan.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'Usuario logueado correctamente.',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}