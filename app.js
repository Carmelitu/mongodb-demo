const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/test')
    .then( () => console.log('Conectado a MongoDB'))
    .catch( error => console.log(error));

const cursoSchema =  new Schema({
    nombre: String,
    autor: String,
    etiquetas: [String],
    fecha: {type: Date, default: Date.now},
    publicado: Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

async function crearCurso(){
    const curso = new Curso({
        nombre: 'Node.JS',
        autor: 'Seiji',
        etiquetas: ['js', 'frontend'],
        publicado: true
    });
    
    const resultado = await curso.save();
    console.log(resultado);
}

crearCurso();
