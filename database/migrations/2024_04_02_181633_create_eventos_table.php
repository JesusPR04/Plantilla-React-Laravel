<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('hora');
            $table->date('fecha');
            $table->string('localizacion');
            $table->unsignedBigInteger('idOrganizador');
            $table->unsignedBigInteger('idCiudad');
            $table->unsignedBigInteger('aforoTotal');
            $table->unsignedBigInteger('aforoDisponible');
            $table->string('categoria');
            $table->string('descripcion');
            $table->float('precio');
            $table->timestamps();
            // ESTO ES UN COMENTARIO PRUEBA PABLO

            $table->foreign('idOrganizador')->references('id')->on('usuarios');
            $table->foreign('idCiudad')->references('id')->on('ciudades');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};
