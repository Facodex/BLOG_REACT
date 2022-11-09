import React from 'react';
import { useState, useEffect } from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Articulos = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    conseguirArticulos();

  }, []);

  const conseguirArticulos = async () => {

    const {datos, cargando} = await Peticion(Global.url + 'articulos', 'GET');

    if (datos.status === 'succes') {
      setArticulos(datos.articulos);
    }

    setCargando('false');
  }

  return (
    <>
      {
        cargando == true ? (<h1>Cargando...</h1>)
        :
        articulos.length >= 1 ? 
          <Listado articulos={articulos} setArticulos={setArticulos}></Listado>
          :
          (<h1>No hay articulos para mostrar</h1>)
      }
    </>
  )
}
