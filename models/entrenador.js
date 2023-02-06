const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const entrenadorSchema=new Schema({
    nombre: String,
    apellidos: String,
    edad: String
})

//crear modelo
const Entrenador=mongoose.model('entrenador', entrenadorSchema, 'entrenador')

module.exports= Entrenador;