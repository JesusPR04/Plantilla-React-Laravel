<?php

namespace App\Models;


use App\Models\User;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'idTarjeta',
        'idUsuario'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];
    
    // Sacar el usuario al cual le pertenece la tarjeta

    public function usuario()
    {
        return $this->belongsTo(User::class, 'idUsuario');
    }
}
