<?php

namespace App\Models;


use Illuminate\Notifications\Notifiable;

class Tarjetas extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "tarjetas";

    protected $fillable = [
        'numero',
        'caducidad',
        'cvv',
        'idUsuario'
    ];
    
    // Sacar el usuario al cual le pertenece la tarjeta

    public function usuario()
    {
        return $this->belongsTo(Usuarios::class, 'idUsuario');
    }
}
