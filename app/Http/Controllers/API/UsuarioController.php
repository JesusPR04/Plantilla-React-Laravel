<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\eventoMail;
use Illuminate\Support\Facades\Mail;

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
}
