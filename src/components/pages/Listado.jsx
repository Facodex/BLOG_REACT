import React from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';


export const Listado = ({articulos, setArticulos}) => {

  const eliminar = async (id) => {
    let {datos} = await Peticion(Global.url + 'articulo/' + id, 'DELETE');
    
    if(datos.status === 'succes'){
      let articulos_actualizados = articulos.filter( item =>  item._id !== id );
      setArticulos(articulos_actualizados);
    }
  }

  return (
    articulos.map(articulo => {
        return (
          <article className="articulo-item" key={articulo._id}>
            <div className='mask'>
              {
                articulo.imagen == 'default.png' && 
                <img src="https://www.itnewsafrica.com/wp-content/uploads/2022/07/Software-Devs.jpg" />
              }
              {
                articulo.imagen != 'default.png' && 
                <img src={Global.url + 'imagen/'+ articulo.imagen} />
              }
              
            </div>
            <div className="datos">
              <h3 className="title"><Link to={'/articulo/' + articulo._id}> {articulo.titulo} </Link></h3>
              <p className="description">{articulo.contenido}</p>

              <Link to={'/editar/' + articulo._id}><button className="edit">Editar</button></Link>
              <button className="delete" onClick={ () => { eliminar(articulo._id) } }>Borrar</button>
            </div>
          </article>
        )
    })
  )
}
