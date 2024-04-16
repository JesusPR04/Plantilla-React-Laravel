<?php

namespace App\Models;


use Illuminate\Notifications\Notifiable;

class Peticiones extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "peticiones";

    protected $fillable = [
        'empresa',
        'descripcion',
        'dni',
        'documento',
        'idUsuario'
    ];
    // Sacar el usuario que ha hecho la peticion
    public function usuario()
    {
        return $this->belongsTo(Usuarios::class, 'idUsuario');
    }

}
