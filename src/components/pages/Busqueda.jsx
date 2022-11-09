import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Busqueda = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  let params = useParams();

  useEffect(() => {

    conseguirArticulos();

  }, []);

  useEffect(() => {

    conseguirArticulos();

  }, [params]);

  const conseguirArticulos = async () => {

    const {datos, cargando} = await Peticion(Global.url + 'buscar/' + params.busqueda, 'GET');

    if (datos.status === 'succes') {
      setArticulos(datos.articulos);
    }else{
      setArticulos([]);
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
