export const Peticion = async (url, metodo, datosGuardar = '', archivos = false) => {

    let cargando = true;

    let opciones = {
        method: 'GET'
    };

    if (metodo == 'GET' || metodo == 'DELETE') {
        opciones = {
            method: metodo,
        };
    }

    if (metodo == 'POST' || metodo == 'PUT') {

        if(archivos){
            opciones = {
                method: metodo,
                body: datosGuardar,
            };
        }else{
            opciones = {
                method: metodo,
                body: JSON.stringify(datosGuardar),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
 
    }

    const peticion = await fetch(url, opciones);
    const datos = await peticion.json();

    cargando = false;

    return {
        datos,
        cargando
    }
};

/*Este es un metodo para hacer peticiones ajax a nuestra API, le tendremos que pasar los parametros:
url: ruta http valida donde estan nuestros datos
metodo: GET; POST; PUT; DELETE; UPDATE
datosGuardar: Los datos que queremos guardar en la API, son opcionales
*/