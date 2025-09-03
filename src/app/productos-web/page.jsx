'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';


export default function ProductWebList() {
    // Estado para almacenar los productos 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // Efecto que se ejecuta al montar el componente 
    useEffect(() => {
        // Función para obtener productos de la API 
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                setLoading(false);
            });
    }, []);
    // Array vacío = se ejecuta solo una vez 
    if (loading) { return <div>Cargando productos...</div>; }
    return (
    <div> <h2>Lista de Productos</h2>
        {products.map(product => (
            <>
           <li key={product.id} className={"flex py-6 mb-4"}>
                    
                    <div className={"ml-4 flex flex-1 flex-col"}>
                      <div>
                        <div className={"flex justify-between text-base font-medium text-gray-900"}>
                          <h3>
                            <Link href={`/productos-web/${product.id}`}>{product.title}</Link>
                          </h3>
                          <p className={"ml-4"}>$ {product.price}</p>
                        </div>
                        <p className={"mt-1 text-sm text-gray-500"}>{product.description}</p>
                      </div>
                     
                    </div>
                  </li>
           
             </>
        
    
    ))} </div>);


}

