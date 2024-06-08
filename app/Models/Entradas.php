<?php

namespace App\Models;

use App\Models\Tarjetas;
use Illuminate\Database\Eloquent\Model;


class Entradas extends Model
{
    protected $table = 'entradas';

    protected $fillable = [
        'idUsuario',
        'idEvento',
        'cantidad',
        'fechaCompra',
        'idTarjeta'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
    public function evento()
    {
        return $this->belongsTo(Eventos::class, 'idEvento');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }

    public function tarjeta()
    {
        return $this->belongsTo(Tarjetas::class, 'idTarjeta');
    }

    public function getEntradasByUser($idUsuario)
    {
        return $this->where('idUsuario', $idUsuario)->get();
    }
}