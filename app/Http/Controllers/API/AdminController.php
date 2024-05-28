<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function index(){
        $rolUser = Auth::user()->rol;
        
        if($rolUser === "Administrador"){
            return response()->json([
                'status' => true,
                'message' => 'Bienvenido de vuelta'
            ], 200);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'No tiene los permisos necesarios para acceder aqui'
            ], 401);
        }
    }
}
