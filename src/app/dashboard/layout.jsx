'use client';
import { useRouter } from "next/navigation";
import { Button } from "../auth/button";
import React, { useContext } from "react";


   const BebidaContext = React.createContext({nombre:'agua',valor:30});
export function SalaDeEstar(){
    return (<VasoDeRefresco />);
}
export default function DashboardLayout({children}){
    const router = useRouter();
    const texto= "Home";
   const   volver = ()=>router.back();

 let bebida ={nombre:'agua',valor:30} ;

    return (
    <div className={"flexbox"}>
        <Header />
        {children}
    </div>
)
}
function VasoDeRefresco(){
    const bebida = useContext(BebidaContext);
    return (
        <>
        <h2>Mi vaso tiene {bebida.nombre}</h2>
        </>
    )
}
function OtroVasoDeRefresco(){
    const bebida = useContext(BebidaContext);
    return (
        <>
        <h2>Mi vaso tiene {bebida.nombre}</h2>
        </>
    )
}