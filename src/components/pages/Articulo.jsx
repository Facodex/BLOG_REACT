import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Articulo = () => {

  const [articulo, setArticulo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {

    conseguirArticulos();

  }, []);

  const conseguirArticulos = async () => {

    const { datos, cargando } = await Peticion(Global.url + 'articulo/' + params.id, 'GET');

    if (datos.status === 'succes') {
      setArticulo(datos.articulo);
    }

    setCargando('false');
  }

  return (
    <>
      {
        cargando == true ? (<h1>Cargando...</h1>)
          :
          (
            <div className='jumbo'>
              <div className='mask-single'>
                {
                  articulo.imagen == 'default.png' &&
                  <img src="https://www.itnewsafrica.com/wp-content/uploads/2022/07/Software-Devs.jpg" />
                }
                {
                  articulo.imagen != 'default.png' &&
                  <img src={Global.url + 'imagen/' + articulo.imagen} />
                }

              </div>
              <h1>{articulo.titulo}</h1>
              <p>{articulo.contenido}</p>

            </div>
          )
      }
    </>
  )
}