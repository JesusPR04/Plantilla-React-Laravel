<?php

namespace App\Models;


use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'comentario',
        'idUsuario'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    // Sacar el usuario que ha hecho la peticion
    public function usuario()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }

}
