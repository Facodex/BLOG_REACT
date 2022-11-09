import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { useForm } from '../../hooks/useForm';


export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState('no_enviado');

  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {

    const { datos } = await Peticion(Global.url + 'articulo/' + params.id, 'GET');

    if (datos.status === 'succes') {
      setArticulo(datos.articulo);
    }

  }

  const editarArticulo = async (e) => {
    e.preventDefault();

    // recogiendo datos del form 
    let nuevoArticulo = formulario;

    // guardando en la api con peticion ajax 
    const { datos, cargando } = await Peticion(Global.url + 'articulo/' + params.id, 'PUT', nuevoArticulo);

    if (datos.status === 'succes') {
      setResultado('guardado');
    } else {
      setResultado('error');
    }

    // subir imagen 
    const fileInput = document.querySelector('#file');

    if (datos.status === 'succes' && fileInput.files[0]) {

      setResultado('guardado');
      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      const subidas = await Peticion(Global.url + 'subir-imagen/' + datos.articulo._id, 'POST', formData, true);

      if (subidas.datos.status === 'succes') {
        setResultado('guardado');
      } else {
        setResultado('error');
      }

    }
  }


  return (
    <div className='jumbo'>

      <h1>Editar articulo</h1>
      <p>Formulario para editar: {articulo.titulo} </p>
      <strong>{resultado == 'guardado' ? 'GUARDADO CORRECTAMENTE' : ''}</strong>
      <strong>{resultado == 'error' ? 'Los datos que ingresaste no son validos' : ''}</strong>
      {/* Mostrar formulario  */}

      <form className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name="contenido" onChange={cambiado} defaultValue={articulo.contenido} />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
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
          <input type="file" name="file0" id='file' />
        </div>

        <input type="submit" value="Guardar" className='btn btn-succes' />

      </form>

    </div>
  )
}
