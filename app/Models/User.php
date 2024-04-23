<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "usuarios";

    protected $fillable = [
        'nombre',
        'apellidos',
        'email',
        'ciudad',
        'telefono',
        'rol',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Sacar las tarjetas a partir del usuario
    public function tarjetas(){
        return $this->hasMany(Tarjetas::class);
    }
    // Sacar la peticion que ha hecho el usuario
    public function peticion()
    {
        return $this->belongsTo(Peticiones::class);
    }
}
