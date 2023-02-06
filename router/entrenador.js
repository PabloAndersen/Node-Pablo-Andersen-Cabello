const express=require('express');
const router=express.Router();

const Entrenador=require('../models/Entrenador')
router.get('/crearEntrenador', (req, res) => {
    res.render('crearEntrenador'); //nueva vista que llamaremos Crear
})
router.get('/', async (req, res) => {
        try {
            //Le pondremos arrayEntrenadorDB para diferenciar
            //los datos que vienen de la base de datos
            //con respecto al arrayEntrenador que tenemos EN LA VISTA
            const arrayEntrenadorDB = await Entrenador.find();
            res.render("Entrenador", { 
                arrayEntrenador: arrayEntrenadorDB
            })
        } catch (error) {
            console.error(error)
        }
    })
    
    
    
     
     router.post('/', async (req, res) => {
         const body = req.body //Gracias al body parser, de esta forma
         //podremos recuperar todo lo que viene del body
         console.log(body) //Para comprobarlo por pantalla
         try {
             const EntrenadorDB = new Entrenador(body) //Creamos un nuevo Entrenador, gracias al modelo
             await EntrenadorDB.save() //Lo guardamos con .save(), gracias a Mongoose
             res.redirect('/entrenador') //Volvemos al listado
         } catch (error) {
             console.log('error', error)
         }
    })
    router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
        const id = req.params.id //Recordemos que en la plantilla "Entrenador.ejs" le pusimos
        //a este campo Entrenador.id, por eso lo llamados con params.id
        try {
            const EntrenadorDB = await Entrenador.findOne({ _id: id }) //_id porque así lo indica Mongo
                                //Esta variable “Entrenador” está definida arriba con el “require”
            //Buscamos con Mongoose un único documento que coincida con el id indicado
            console.log(EntrenadorDB) //Para probarlo por consola
            res.render('detalleEntrenador', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
                Entrenador: EntrenadorDB,
                error: false
            })
        } catch (error) { //Si el id indicado no se encuentra
            console.log('Se ha producido un error', error)
            res.render('detalleEntrenador', { //Mostraremos el error en la vista "detalle"
                error: true,
                mensaje: 'Entrenador no encontrado!'
            })
        }
    })
    router.delete('/:id', async (req, res) => {
        const id = req.params.id;
        console.log('id desde backend', id)
        try {
            //En la documentación de Mongoose podremos encontrar la
            //siguiente función para eliminar
            const EntrenadorDB = await Entrenador.findByIdAndDelete({ _id: id });
            console.log(EntrenadorDB)
            // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
            // res.redirect('/Entrenador') //Esto daría un error, tal y como podemos ver arriba
            if (!EntrenadorDB) {
                res.json({ 
                    estado: false,
                    mensaje: 'No se puede eliminar el Entrenador.'
                })
            } else {
                res.json({
                    estado: true,
                    mensaje: 'Entrenador eliminado.'
                })
            } 
        } catch (error) {
            console.log(error)
        }
    })
    router.put('/:id', async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        console.log(id)
        console.log('body', body)
        try {
            const EntrenadorDB = await Entrenador.findByIdAndUpdate(
                id, body, { useFindAndModify: false }
            )
            console.log(EntrenadorDB)
            res.json({
                estado: true,
                mensaje: 'Entrenador editado'
            })
        } catch (error) {
            console.log(error)
            res.json({
                estado: false,
                mensaje: 'Problema al editar el Entrenador'
            })
        }
    })
module.exports=router;