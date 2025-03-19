import {mongoose} from 'mongoose';

var Schema = mongoose.Schema;

var PublicacionSchema = new Schema({
    from: String,
    fecha: Date,
    texto: String,
    imagen: String,
    barrio: String,
    like: Number,

})

export default mongoose.model('Publicacion', PublicacionSchema)



