'use client';

import  Link  from 'next/link';

export default function Productos(){
    const productos = [
        {id:1,nombre:"clavos",precio:20},
        {id:2,nombre:"Tornillos",precio:20},
        {id:3,nombre:"Martillo",precio:200},
        {id:4,nombre:"Tuerca",precio:20},
        {id:5,nombre:"LLave de paso",precio:25},
        {id:6,nombre:"Hoja de Zinc",precio:30},
    ];
    return (
        <ul>
        {productos.map((producto) =>(
            
           <li key={producto.id}> <Link  href={`/productos/${producto.id}`}>{producto.nombre} </Link></li>
          
))}
        </ul>
    );
}