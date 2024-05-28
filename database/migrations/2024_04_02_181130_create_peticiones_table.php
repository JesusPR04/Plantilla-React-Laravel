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
        Schema::create('peticiones', function (Blueprint $table) {
            $table->id();
            $table->string('empresa');
            $table->string('dni');
            $table->string('documento');
            $table->string('comentario')->nullable();
            $table->string('estado')->nullable()->default('En revisión');
            $table->unsignedBigInteger('idUsuario');
            $table->timestamps();


            $table->foreign('idUsuario')->references('id')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peticiones');
    }
};
