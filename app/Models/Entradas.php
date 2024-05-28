<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Entradas extends Model
{
    protected $table = 'entradas';

    protected $fillable = [
        'idUsuario',
        'idEvento',
        'cantidad',
        'fechaCompra'
    ];

    public function evento()
    {
        return $this->belongsTo(Eventos::class, 'idEvento');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }

    public function getEntradasByUser($idUsuario)
    {
        return $this->where('idUsuario', $idUsuario)->get();
    }
}