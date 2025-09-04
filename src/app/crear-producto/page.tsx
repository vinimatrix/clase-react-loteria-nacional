'use client';

import React, { useState } from 'react';

export default function ContactForm() {
    // Estado para los campos del formulario 
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const [loading, setLoading] = useState(false);

    // Función para manejar el envío del formulario 
    const handleSubmit = async (e) => {
        // Prevenir recarga de página 
        e.preventDefault();
        //mostrar estado de carga
        setLoading(true);

        try {

            // Enviar datos a la API (simulado con fetch a una URL ficticia)
            const response = await fetch('https://fakestoreapi.com/products',
                {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({title: nombre, description: mensaje }) //{ nombre: nombre, mensaje: mensaje}
                });
            if (response.ok) {
                alert('Mensaje enviado exitosamente!');
                console.log(await response.json());
                setNombre(''); setMensaje('');
            }
            else {
                 alert('Error al enviar el mensaje');
                 }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
       finally { 
        setLoading(false);
     }
    };

    //retorna el formulario
    return (
        <form onSubmit={handleSubmit}>
            <div> <label>Titulo:</label>
                <input className={'min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div> <div className={'mt-5'}> <label>Descripcion:</label>
                <textarea className={'min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'} value={mensaje} onChange={(e) => setMensaje(e.target.value)} required ></textarea>
            </div>
            <button className={'flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'} type="submit" disabled={loading}> {loading ? 'Enviando...' : 'Enviar Mensaje'} </button>
        </form>
        );
}