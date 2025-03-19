import Publicacion from '../models/publicacion.js'

var controller = {
    //Función para guardar ua publicacion 
    save: (req, res) => {
        var params = req.body
        var publicacion = new Publicacion()
        publicacion.from = params.from
        publicacion.fecha = params.fecha
        publicacion.texto = params.texto
        publicacion.imagen = params.imagen
        publicacion.barrio = params.barrio
        publicacion.like = params.like
        console.log(publicacion)
        publicacion.save((error, publicacionStored) =>{
            if(error || !publicacionStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'No ha sido posible guardar el mensaje'
                })
            }
            return res.status(200).send({
                status: 'success',
                publicacionStored
            })

        })
    },
    
    
    //Funcion Like
    updateLikes: async (req, res) => {
        try {
            console.log("🔥 Recibida petición PUT");
            console.log("📩 Body:", req.body);
            console.log("🆔 Params:", req.params);
    
            const publicacionId = req.params.id;
    
            if (!publicacionId) {
                return res.status(400).send({ status: "error", message: "ID no proporcionado" });
            }
    
            const publicacion = await Publicacion.findById(publicacionId);
    
            if (!publicacion) {
                console.log("❌ No se encontró la publicación con ID:", publicacionId);
                return res.status(404).send({ status: "error", message: "Publicación no encontrada" });
            }
    
            publicacion.like += 1;
            await publicacion.save();
    
            console.log("✅ Like actualizado. Nuevo conteo:", publicacion.like);
    
            return res.status(200).send({ status: "success", publicacion });
        } catch (error) {
            console.error("🚨 Error en updateLikes:", error);
            return res.status(500).send({ status: "error", message: "Error al actualizar el like" });
        }
    }
    ,
    
    
    //Función para obtener las publicaciones
    getPublicaciones: (req, res) => {
        var query = Publicacion.find({})

        query.sort('-_id').exec((error, publicaciones) => {
            if(error){
				return res.status(500).send({
					status: "error",
					message: "Error al extraer los datos"
				})
			}

			//Si no existen artículos:
			if(!publicaciones){
				return res.status(404).send({
					status: "error",
					message: "No hay publicaciones para mostrar"
				})
			}

			return res.status(200).send({
				status: "success",
				publicaciones
			})

        })
    }
}

export default controller