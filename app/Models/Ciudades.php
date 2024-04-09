<?php

namespace App\Models;


use Illuminate\Notifications\Notifiable;

class Ciudades extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = "ciudades";

    protected $fillable = [
        'nombre'
    ];

    // Sacar todos los eventos que haya en la ciudad
    public function eventos(){
        return $this->hasMany(Eventos::class);
    }

}
