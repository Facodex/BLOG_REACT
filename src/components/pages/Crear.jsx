import React from 'react';
import { useState } from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { useForm } from '../../hooks/useForm';


export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState('no_enviado');

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // recogiendo datos del form 
    let nuevoArticulo = formulario;

    // guardando en la api con peticion ajax 
    const { datos, cargando } = await Peticion(Global.url + 'crear', 'POST', nuevoArticulo);

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

      <h1>Crear articulo</h1>
      <p>Formulario para crear articulo</p>
      <strong>{resultado == 'guardado' ? 'GUARDADO CORRECTAMENTE' : ''}</strong>
      <strong>{resultado == 'error' ? 'Los datos que ingresaste no son validos' : ''}</strong>
      {/* Mostrar formulario  */}

      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name="contenido" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id='file' />
        </div>

        <input type="submit" value="Guardar" className='btn btn-succes' />

      </form>

    </div>
  )
}
