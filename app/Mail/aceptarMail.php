<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Address;

use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class aceptarMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nombre;
    
    /**
     * Create a new message instance.
     */
    public function __construct($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('eventia.eventos.spain@gmail.com', 'Eventia'),
            subject: 'Petición aceptada',
        );
    }
    public function build()
    {
        return $this->view('email.aceptar');
    }
}
